"use strict";

// chat gpt
if (window.location.hostname === "chat.openai.com") {
    setTimeout(() => {
        let textarea = document.getElementsByTagName("textarea")[0];
        let sendButton = document.querySelector('[data-testid="send-button"]');

        if (textarea) {
            textarea.focus();

            if (window.location.search === "?ref=text-to-chatgpt") {
                chrome.runtime.sendMessage({ message: "getPrompt" }, (response) => {
                    setTimeout(() => {
                        textarea.value = response.prompt;
                        
                        let event = new Event('input', { bubbles: true });
                        textarea.dispatchEvent(event);
                        textarea.focus();

                        if (sendButton) {
                            sendButton.click();
                        }
                        
                    }, 1000);
                });
            }
            
        }

    }, 1000);
}