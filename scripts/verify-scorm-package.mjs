import assert from "node:assert/strict";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const packageDirectory = path.resolve(process.argv[2] || "dist");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".xsd": "application/xml; charset=utf-8",
};

const server = http.createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const filePath = path.resolve(packageDirectory, relativePath);

    if (!filePath.startsWith(`${packageDirectory}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const body = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true });

const installMockApi = async (page, initialStatus = "not attempted") => {
  await page.addInitScript((status) => {
    const values = {
      "cmi.core.lesson_status": status,
      "cmi.suspend_data": "",
    };
    window.__scormLog = [];
    window.API = {
      LMSInitialize(value) {
        window.__scormLog.push(["initialize", value]);
        return "true";
      },
      LMSGetValue(element) {
        window.__scormLog.push(["get", element]);
        return values[element] || "";
      },
      LMSSetValue(element, value) {
        window.__scormLog.push(["set", element, value]);
        values[element] = value;
        return "true";
      },
      LMSCommit(value) {
        window.__scormLog.push(["commit", value]);
        return "true";
      },
      LMSFinish(value) {
        window.__scormLog.push(["finish", value]);
        return "true";
      },
    };
  }, initialStatus);
};

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await installMockApi(page);
  await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });

  const launchLog = await page.evaluate(() => window.__scormLog);
  assert.deepEqual(launchLog.slice(0, 3), [
    ["initialize", ""],
    ["set", "cmi.core.lesson_status", "completed"],
    ["commit", ""],
  ]);
  assert.equal(await page.title(), "Content");
  assert.equal(await page.locator("h1").first().textContent(), "PayJustNow on oneX");
  assert.equal(await page.locator(".course-footer-text").textContent(), "Return to People Connect to continue");
  assert.equal(await page.locator(".course-footer-text").evaluate((node) => node.tagName), "P");
  assert.equal(await page.locator('a[href="#customer-questions"]').count(), 1);
  assert.equal(await page.locator('a[download][href="./downloads/payjustnow-customer-questions-guide.pdf"]').count(), 1);
  assert.equal(
    await page.evaluate(async () => {
      const results = await Promise.all(
        [...document.images].map(async (image) => (await fetch(image.currentSrc || image.src)).ok),
      );
      return results.every(Boolean);
    }),
    true,
  );
  assert.equal(await page.evaluate(() => [...document.styleSheets].every((sheet) => Boolean(sheet.href || sheet.ownerNode))), true);
  assert.equal(await page.evaluate(async () => (await fetch("./downloads/payjustnow-customer-questions-guide.pdf")).ok), true);

  await page.evaluate(() => {
    window.dispatchEvent(new PageTransitionEvent("pagehide"));
    window.dispatchEvent(new Event("beforeunload"));
  });
  const closeLog = await page.evaluate(() => window.__scormLog);
  const finishIndexes = closeLog.flatMap((entry, index) => (entry[0] === "finish" ? [index] : []));
  const commitIndexes = closeLog.flatMap((entry, index) => (entry[0] === "commit" ? [index] : []));
  assert.equal(finishIndexes.length, 1);
  assert.ok(commitIndexes.some((index) => index < finishIndexes[0]));

  const completedPage = await browser.newPage();
  await installMockApi(completedPage, "completed");
  await completedPage.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
  const completedLog = await completedPage.evaluate(() => window.__scormLog);
  const statusWrites = completedLog.filter((entry) => entry[0] === "set" && entry[1] === "cmi.core.lesson_status");
  assert.deepEqual(statusWrites, [["set", "cmi.core.lesson_status", "completed"]]);

  const standalonePage = await browser.newPage();
  const pageErrors = [];
  standalonePage.on("pageerror", (error) => pageErrors.push(error.message));
  await standalonePage.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
  assert.deepEqual(pageErrors, []);
  assert.equal(await standalonePage.title(), "Content");

  const guidePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const failedResponses = [];
  guidePage.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });
  await guidePage.goto(`${baseUrl}/customer-questions-guide.html`, { waitUntil: "networkidle" });
  assert.equal(await guidePage.title(), "Content");
  assert.equal(await guidePage.locator(".guide-footer").textContent().then((text) => text.trim()), "Return to People Connect to continue");
  assert.equal(await guidePage.locator(".guide-header img").evaluate((image) => image.complete && image.naturalWidth > 0), true);
  assert.deepEqual(failedResponses, []);

  console.log("Mock SCORM launch: completed write and immediate commit passed.");
  console.log("Completed reopen: completed status preserved with no downgrade passed.");
  console.log("Closure: commit before one guarded finish across overlapping events passed.");
  console.log("Standalone: missing API produced no runtime errors.");
  console.log("Packaged browser smoke: main and guide pages, images, CSS and PDF link passed.");
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
