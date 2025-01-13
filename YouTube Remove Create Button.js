// ==UserScript==
// @name         YouTube Remove Create Button
// @namespace
// @version      1.0
// @description  Removes the Create button from YouTube's interface
// @author       https://github.com/or1n
// @license      MIT
// @homepage
// @supportURL
// @updateURL
// @downloadURL
// @match        *://*.youtube.com/*
// @match        http://*.youtube.com/*
// @match        http://youtube.com/*
// @match        https://*.youtube.com/*
// @match        https://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove the create button
    function removeCreateButton() {
        // Try multiple selectors to find and remove the button
        const selectors = [
            '.yt-spec-button-shape-next--tonal yt-touch-feedback-shape .yt-spec-touch-feedback-shape--overlay-touch-response',
            '.yt-spec-button-shape-next--icon-leading.yt-spec-button-shape-next--tonal yt-touch-feedback-shape',
            'button[aria-label="Create"]'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                // Navigate up to the button container and remove it
                const buttonContainer = element.closest('.yt-spec-button-shape-next--tonal') ||
                                     element.closest('button') ||
                                     element.parentElement?.parentElement;
                if (buttonContainer) {
                    buttonContainer.remove();
                    console.log('YouTube Create button removed');
                    break;
                }
            }
        }
    }

    // Initial removal attempt
    removeCreateButton();

    // Create a MutationObserver to handle dynamic loading
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                removeCreateButton();
            }
        }
    });

    // Start observing with a delay to ensure the DOM is loaded
    setTimeout(() => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 1000);

    // Also try removing on page load
    window.addEventListener('load', removeCreateButton);
})();