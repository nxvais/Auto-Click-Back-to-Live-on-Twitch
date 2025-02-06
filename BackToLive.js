// ==UserScript==
// @name         Auto Click "Voltar à Live"
// @namespace    http://tampermonkey.net/
// @homepageURL   https://github.com/nxvais/Auto-Click-Back-to-Live-on-Twitch
// @version      1.2
// @description  Clica automaticamente no botão "Voltar à live" assim que ele aparece.
// @author       9ais
// @icon         https://i.imgur.com/3PkHag9.png
// @match        *://www.twitch.tv/*
// @grant        none
// ==/UserScript==

function createNotification(message, delay, topOffset) {
    var notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = topOffset + 'px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#333';
    notification.style.color = '#fff';
    notification.style.padding = '15px';
    notification.style.borderRadius = '15px';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.fontSize = '14px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, delay + 3000);
}

function clicarBotao() {
    const botao = document.querySelector('button[aria-label="Voltar à live"]');
    if (botao) {
        createNotification("Voltando para Live", 0, 10);
        botao.click();
    }
}


const observer = new MutationObserver(() => clicarBotao());

observer.observe(document.body, { childList: true, subtree: true });

