chrome.runtime.sendMessage({ action: "getMediaList" }, function(response) {
  let mediaList = document.getElementById("media-list");
  response.forEach(media => {
    let a = document.createElement("a");
    a.textContent = media.fileName;
    a.href = media.url;
    a.download = media.fileName;
    let div = document.createElement("div");
    div.appendChild(a);
    mediaList.appendChild(div);
  });
});

let button = document.getElementById("clear");
button.addEventListener("click", () =>{
  document.getElementById("media-list").innerHTML = "";
  chrome.storage.local.set({ mediaList: [] });
});