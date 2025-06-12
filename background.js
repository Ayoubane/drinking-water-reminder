chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Time to Drink Water",
    message: "Stay hydrated! Take a sip now.",
    priority: 2
  });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "start") {
    chrome.alarms.create("drinkWaterReminder", { periodInMinutes: msg.interval });
    sendResponse({ success: true });
  } else if (msg.action === "stop") {
    chrome.alarms.clear("drinkWaterReminder", (wasCleared) => {
      sendResponse({ success: wasCleared });
    });
    return true;
  }
});

