const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const intervalInput = document.getElementById("interval");

document.addEventListener("DOMContentLoaded", () => {
  chrome.alarms.get("drinkWaterReminder", (alarm) => {
    if (alarm) {
      // Alarm is active
      startBtn.textContent = "Edit";
      startBtn.classList.add("edit-mode");
      stopBtn.disabled = false;

      chrome.storage.local.get(["interval"], (result) => {
        intervalInput.value = result.interval || 30;
      });
    } else {
      // No alarm
      startBtn.textContent = "Start";
      startBtn.classList.remove("edit-mode");
      stopBtn.disabled = true;
      intervalInput.value = 30;
    }
  });
});

startBtn.addEventListener("click", () => {
  const interval = parseInt(intervalInput.value, 10);
  chrome.runtime.sendMessage({ action: "start", interval }, () => {
    chrome.storage.local.set({ interval });

    startBtn.textContent = "Edit";
    startBtn.classList.add("edit-mode");
    stopBtn.disabled = false;
  });
});

stopBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" }, () => {
    chrome.storage.local.remove("interval");

    startBtn.textContent = "Start";
    startBtn.classList.remove("edit-mode");
    stopBtn.disabled = true;
    intervalInput.value = 30;
  });
});
