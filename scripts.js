chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, (user) => {
    console.log(user);
    if (user.email) {
        document.querySelector('h2').textContent = `Welcome ${user.email}`;
    }
})

document.getElementById('btn-google').onclick = async () => {

    // For more options - https://developer.chrome.com/docs/extensions/reference/api/identity#type-TokenDetails
    const options = {
        interactive: true, // show popup if necessary

        // by default it uses the ones declared in manifest.json
        // scopes: []

        /*The account ID whose token should be returned. 
          If not specified, the function will use an account 
          from the Chrome profile: the Sync account if there 
          is one, or otherwise the first Google web account.
         */

        // account: {
        //     id: ""
        // }
    }
    chrome.identity.getAuthToken(options, (accessToken) => {
        console.log(accessToken);

        chrome.action.setPopup({ popup: "main.html" });
        window.location.href = "main.html";

    });
}

document.getElementById('btn-facebook').onclick = () => {

    const clientId = '**********';
    const redirectUrl = chrome.identity.getRedirectURL('callback');
    const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?` +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectUrl}` +
        `&state=randomState`

    // https://developer.chrome.com/docs/extensions/reference/api/identity#method-launchWebAuthFlow
    const options = {
        // The URL that initiates the auth flow.
        url: authUrl,
        interactive: true,
        abortOnLoadForNonInteractive: true,
        timeoutMsForNonInteractive: 60000,
    }

    // Start web view
    chrome.identity.launchWebAuthFlow(options, (responseUrl) => {
        console.log(responseUrl)
        if (responseUrl) {
            // Get tokens,code or othe values from url
            const containsCode = responseUrl.indexOf("code") != -1;

            if (containsCode) {
                chrome.action.setPopup({ popup: "main.html" });
                window.location.href = "main.html";
            }

        }
    });
}