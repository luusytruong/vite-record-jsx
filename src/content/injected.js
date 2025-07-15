(() => {
  const isLMS =
    location.hostname === "lms.ictu.edu.vn" || location.href.startsWith("file");
  if (!isLMS) return;

  const scripts = ["dist/content/index.js"];
  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(src);
    script.type = "module";
    script.onload = () => script.remove();
    document.head.appendChild(script);
  });

  window.addEventListener("contextmenu", (e) => e.stopPropagation(), true);

  document.addEventListener("keydown", ({ ctrlKey, key }) => {
    if (ctrlKey && key === "c") {
      const text = getSelection()?.toString();
      if (text) navigator.clipboard.writeText(text).catch(console.error);
    }
  });

  const test = [];

  window.addEventListener("message", async ({ source, data }) => {
    if (source !== window) return;
    if (data?.source === "page-script") {
      const question = data.payload[0];
      test[question.no - 1] = question;
      console.log(test);
      await setStorage("test", test);
    }
  });

  async function setStorage(key, data) {
    if (!chrome?.storage?.local) return false;
    try {
      await new Promise((res, rej) =>
        chrome.storage.local.set({ [key]: data }, (err) =>
          err ? rej(err) : res()
        )
      );
      return true;
    } catch {
      return false;
    }
  }
})();
