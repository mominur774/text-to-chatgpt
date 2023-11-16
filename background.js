let prompt = ''; 

function setPrompt(newPrompt) {
  prompt = newPrompt;
}

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create({
        id: "copyToChatGPT",
        title: "Copy to ChatGPT",
        contexts:["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copyToChatGPT") {
        const selectedText = info.selectionText;
        
        setPrompt(selectedText);
        
        chrome.tabs.create({ url: "https://chat.openai.com/?ref=text-to-chatgpt" }, function(newTab) {
            setTimeout(() => {
                chrome.tabs.sendMessage(newTab.id, { message: "updatePrompt", prompt: selectedText });
            }, 500);
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "getPrompt") {
        sendResponse({ prompt: prompt });
    }
});