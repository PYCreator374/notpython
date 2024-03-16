/**
 * @name NoCallKickAlone
 * @author Alex
 * @description Prevents Discord calls from being kicked when alone for more than 2 minutes
 * @version 1.0
 * @source https://github.com/PYCreator374/notpython/tree/main
 * @updateUrl https://raw.githubusercontent.com/PYCreator374/notpython/main/NoCallKickAlone.plugin.js
 */

module.exports = class NoCallKickAlone {
  constructor(meta) {
    // Do initialization tasks here
    this.meta = meta;
    this.checkCallInterval = null;
  }

  start() {
    // Do tasks when the plugin is enabled
    const checkCallInterval = 10000; // Check call status every 10 seconds
    const maxAloneTime = 120000; // 2 minutes in milliseconds

    let inCall = false;
    let lastActivityTime = Date.now();

    const checkCall = () => {
        const callBanner = document.querySelector('[class^="callBanner"]');
        if (callBanner) {
            inCall = true;
            lastActivityTime = Date.now();
        } else {
            if (inCall && Date.now() - lastActivityTime > maxAloneTime) {
                // Leave and rejoin the call
                const leaveButton = document.querySelector('[aria-label^="Leave call"]');
                if (leaveButton) {
                    leaveButton.click();
                    setTimeout(() => {
                        const callButton = document.querySelector('[aria-label^="Call"]');
                        if (callButton) {
                            callButton.click();
                        }
                    }, 2); // Wait 2 milliseconds before rejoining
                }
            }
            inCall = false;
        }
    };

    this.checkCallInterval = setInterval(checkCall, checkCallInterval);
  }

  stop() {
    // Clean up tasks when the plugin is disabled
    clearInterval(this.checkCallInterval);
  }
};
