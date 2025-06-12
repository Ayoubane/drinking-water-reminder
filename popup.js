document.getElementById("start").addEventListener("click", () => {
  const interval = parseInt(document.getElementById("interval").value, 10);
  chrome.runtime.sendMessage({ action: "start", interval });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" });
});
