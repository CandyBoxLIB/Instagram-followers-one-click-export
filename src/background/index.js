import {loginAndSaveSession} from "../api";

(() => {
    console.log('Background script loaded!');



    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('background-scripts======')

    })
})();