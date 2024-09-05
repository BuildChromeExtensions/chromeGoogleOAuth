document.querySelector('button').onclick = () => {
    // Logged 
    chrome.identity.clearAllCachedAuthTokens(() => {
        chrome.action.setPopup({ popup: "index.html" });
        window.location.href = "index.html";
    });
}