chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'emailTemplateGenerator',
    title: 'Generate Email Template',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'emailTemplateGenerator') {
    const message = info.selectionText.trim();
    const template = await generateTemplate(message);
    copyToClipboard(template);
    showNotification('Email template generated and copied to clipboard.');
  }
});

async function generateTemplate(message) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUr_API_KEY
  const template = data.choices[0].text.trim();
  if (template === '') {
    throw new Error('Sorry, could not generate email template.');
  }
  return template;
}

function copyToClipboard(template) {
  const textarea = document.createElement('textarea');
  textarea.value = template;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function showNotification(template) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Email Template Generator',
    message: template
  });
}
