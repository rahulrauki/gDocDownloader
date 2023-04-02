chrome.runtime.onInstalled.addListener(() => {
  chrome.webRequest.onCompleted.addListener(
    function(details) {
      if (details.type === "media" || details.url.includes("videoplayback")) {
        chrome.storage.local.get("mediaList", function(result) {
          let mediaList = result.mediaList || [];
          let media = {
            url: details.url,
            fileName: details.url.split("?")[0].split("/").pop()
          };
          mediaList.push(media);
          chrome.storage.local.set({ mediaList: mediaList });
        });
      }
    },
    { urls: ["<all_urls>"], types: ["media"] }
  );
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getMediaList") {
    chrome.storage.local.get("mediaList", function(result) {
      sendResponse(result.mediaList || []);
    });
    return true;
  }
});