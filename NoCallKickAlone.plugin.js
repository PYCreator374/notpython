/**
 * @name NoCallKickAlone
 * @author Alex
 * @version 1.0
 * @description Prevents Discord calls from being kicked when alone for more than 3 minutes
 * @source https://github.com/PYCreator374/notpython/new/main
 * @updateUrl https://raw.githubusercontent.com/PYCreator374/notpython/main/NoCallKickAlone.plugin.js
 */

const main = () => {
    const checkCallInterval = 10000; // Check call status every 10 seconds
    const maxAloneTime = 180000; // 3 minutes in milliseconds

    let inCall = false;
    let lastActivityTime = Date.now();

    const checkCall = () => {
        const callBanner = document.querySelector('[class^="callBanner"]');
        if (callBanner) {
            inCall = true;
            lastActivityTime = Date.now();
        } else {
            if (inCall && Date.now() - lastActivityTime > maxAloneTime) {
                // Prevent kick by refreshing the call
                const callButton = document.querySelector('[aria-label^="Call"]');
                if (callButton) {
                    callButton.click();
                }
            }
            inCall = false;
        }
    };

    setInterval(checkCall, checkCallInterval);
};

document.addEventListener('DOMContentLoaded', main);
