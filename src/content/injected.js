(() => {
  const isLMS =
    location.hostname === "lms.ictu.edu.vn" || location.href.startsWith("file");
  if (!isLMS) return;

  const scripts = ["src/content/index.js"];
  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(src);
    script.type = "module";
    script.onload = () => {
      script.remove();
      restored();
      setInterval(restored, 2000);
    };
    document.head.appendChild(script);
  });

  const restored = async () => {
    const restore = await getStorage("restore");
    if (restore) sendData(restore);
  };

  window.addEventListener("contextmenu", (e) => e.stopPropagation(), true);

  document.addEventListener("keydown", ({ ctrlKey, key }) => {
    if (ctrlKey && key === "c") {
      const text = getSelection()?.toString();
      if (text) navigator.clipboard.writeText(text).catch(console.error);
    }
  });

  const log = (...args) =>
    true &&
    console.log(
      "%cR%cE%cC%cO%cR%cD",
      "color: #03FFFF; font-weight: bold;",
      "color: #56FFAA; font-weight: bold;",
      "color: #AAFF55; font-weight: bold;",
      "color: #FFFF00; font-weight: bold;",
      "color: #FF8080; font-weight: bold;",
      "color: #FF00FF; font-weight: bold;",
      ...args
    );

  const test = [];

  window.addEventListener("message", async ({ source, data }) => {
    if (source !== window) return;
    if (data?.source === "page-script") {
      const question = data.payload[0];
      test[question.no - 1] = question;
      log(test);
      await setStorage("test", test);
    }
  });

  function sendData(...args) {
    window.postMessage(
      {
        source: "content-script",
        payload: args,
      },
      "*"
    );
  }

  async function setStorage(key, data) {
    if (!chrome?.storage?.local) return false;
    try {
      await chrome.storage.local.set({ [key]: data });
      return true;
    } catch {
      return false;
    }
  }
  async function getStorage(key) {
    if (!chrome?.storage?.local) return;
    try {
      const result = await chrome.storage.local.get(key);
      return result[key];
    } catch {
      return null;
    }
  }
})();
