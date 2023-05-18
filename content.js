chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'getSelection') {
    const selection = await getSelection();
    sendResponse(selection);
  }
});

async function getSelection() {
  const result = await new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: () => {
            return window.getSelection().toString();
          }
        },
        result => {
          resolve(result[0].result);
        }
      );
    });
  });
  return result.trim();
}
