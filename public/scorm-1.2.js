(function (window) {
  "use strict";

  var api = null;
  var connected = false;
  var finished = false;

  function findApi(startWindow) {
    var current = startWindow;
    var attempts = 0;

    while (current && attempts < 50) {
      try {
        if (current.API) return current.API;
        if (current.parent === current) break;
        current = current.parent;
      } catch (_) {
        break;
      }
      attempts += 1;
    }

    return null;
  }

  function locateApi() {
    api = findApi(window);
    if (api) return api;

    try {
      if (window.opener && !window.opener.closed) api = findApi(window.opener);
    } catch (_) {
      api = null;
    }

    return api;
  }

  function call(method, value) {
    if (!api || typeof api[method] !== "function") return "false";
    try {
      return api[method](value);
    } catch (_) {
      return "false";
    }
  }

  window.Scorm12 = {
    initialize: function () {
      if (connected) return true;
      if (!locateApi()) return false;
      connected = String(call("LMSInitialize", "")).toLowerCase() === "true";
      return connected;
    },

    isConnected: function () {
      return connected;
    },

    getValue: function (element) {
      if (!connected || !api || typeof api.LMSGetValue !== "function") return "";
      try {
        return api.LMSGetValue(element) || "";
      } catch (_) {
        return "";
      }
    },

    setValue: function (element, value) {
      if (!connected || !api || typeof api.LMSSetValue !== "function") return false;
      try {
        return String(api.LMSSetValue(element, String(value))).toLowerCase() === "true";
      } catch (_) {
        return false;
      }
    },

    commit: function () {
      if (!connected) return false;
      return String(call("LMSCommit", "")).toLowerCase() === "true";
    },

    finish: function () {
      if (!connected || finished) return false;
      finished = true;
      call("LMSCommit", "");
      var result = String(call("LMSFinish", "")).toLowerCase() === "true";
      connected = false;
      return result;
    },
  };
})(window);
