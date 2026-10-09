import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const courseUrl = process.env.PDF_URL ?? "http://127.0.0.1:4321/customer-questions-guide";
const outputPath = path.resolve(
  process.cwd(),
  "public/downloads/payjustnow-customer-questions-guide.pdf",
);

await fs.mkdir(path.dirname(outputPath), { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();

  await page.goto(courseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => {
    if (!("fonts" in document)) {
      return true;
    }

    return document.fonts.status === "loaded";
  });

  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      right: "12mm",
      bottom: "16mm",
      left: "12mm",
    },
  });

  console.log(`Generated PDF at ${outputPath}`);
} finally {
  await browser.close();
}
