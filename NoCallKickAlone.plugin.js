/**
 * @name NoCallKickAlone
 * @author Alex
 * @description Prevents Discord calls from being kicked when alone for more than 3 minutes
 * @version 1.0
 * @source https://github.com/YOUR_USERNAME/YOUR_REPOSITORY
 * @updateUrl https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPOSITORY/main/NoCallKickAlone.plugin.js
 */

module.exports = class NoCallKickAlone {
  constructor(meta) {
    // Do initialization tasks here
    this.meta = meta;
  }

  start() {
    // Do tasks when the plugin is enabled
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
  }

  stop() {
    // Clean up tasks when the plugin is disabled
    clearInterval(this.checkCallInterval);
  }
};
