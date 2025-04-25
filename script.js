let cookie = document.getElementById("cookie");
let cookieCountDisplay = document.getElementById("cookie-counter");
let cookieCount = 0;
let cookiePerClick = 1;
let cookiePerSecond = 0;
let cookiePerClickCost = 10;
let cookiePerSecondCost = 100;
let cookiePerClickCount = 0;
let cookiePerSecondCount = 0;
let cookiePerClickDisplay = document.getElementById("cookies-per-click");
let cookiePerSecondDisplay = document.getElementById("cookies-per-second");
let cookiePerClickCostDisplay = document.getElementById("cookie-per-click-cost");
let cookiePerSecondCostDisplay = document.getElementById("cookie-per-second-cost");
let cookiePerClickCountDisplay = document.getElementById("cookie-per-click-count");
let cookiePerSecondCountDisplay = document.getElementById("cookie-per-second-count");
let cookiePerClickUpgradeButton = document.getElementById("cookie-per-click-upgrade-button");
let cookiePerSecondUpgradeButton = document.getElementById("cookie-per-second-upgrade-button");

function updateCookieCountDisplay() {
    cookieCountDisplay.innerText = Math.floor(cookieCount);
}

function updateCookiePerClickDisplay() {
    cookiePerClickDisplay.innerText = `MACHINES PER CLICK: ${cookiePerClick}`;
    cookiePerClickCostDisplay.innerText = `COST: ${Math.floor(cookiePerClickCost)}`;
    cookiePerClickCountDisplay.innerText = `UPGRADES: ${cookiePerClickCount}`;
}

function updateCookiePerSecondDisplay() {
    cookiePerSecondDisplay.innerText = `MACHINES PER SECOND: ${cookiePerSecond}`;
    cookiePerSecondCostDisplay.innerText = `COST: ${Math.floor(cookiePerSecondCost)}`;
    cookiePerSecondCountDisplay.innerText = `UPGRADES: ${cookiePerSecondCount}`;
}

let saveTimeout;

function click() {
    cookieCount += cookiePerClick;
    updateCookieCountDisplay();
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveGame, 500);
}

function buyCookiePerClick() {
    if (cookieCount >= cookiePerClickCost) {
        cookieCount -= cookiePerClickCost;
        cookiePerClick += 1;
        cookiePerClickCost = Math.floor(cookiePerClickCost * 1.4);
        cookiePerClickCount += 1;
        updateCookieCountDisplay();
        updateCookiePerClickDisplay();
        saveGame();
    }
}

function buyCookiePerSecond() {
    if (cookieCount >= cookiePerSecondCost) {
        cookieCount -= cookiePerSecondCost;
        cookiePerSecond += 0.5;
        cookiePerSecondCost = Math.floor(cookiePerSecondCost * 1.1);
        cookiePerSecondCount += 1;
        updateCookieCountDisplay();
        updateCookiePerSecondDisplay();
        saveGame();
    }
}

function update() {
    cookieCount += cookiePerSecond / 5;
    updateCookieCountDisplay();
    saveGame();
}

function resetGame() {
    if (confirm('Delete all cookies and upgrades? This cannot be undone!')) {
        cookieCount = 0;
        cookiePerClick = 1;
        cookiePerSecond = 0;
        cookiePerClickCost = 10;
        cookiePerSecondCost = 100;
        cookiePerClickCount = 0;
        cookiePerSecondCount = 0;
        
        localStorage.removeItem('cookieGameDycel');
        updateAllDisplays();
    }
}

function updateAllDisplays() {
    updateCookieCountDisplay();
    updateCookiePerClickDisplay();
    updateCookiePerSecondDisplay();
}

function loadGame() {
    const saved = localStorage.getItem('cookieGameDycel');
    if (saved) {
        const data = JSON.parse(saved);
        cookieCount = data.cookieCount || 0;
        cookiePerClick = data.cookiePerClick || 1;
        cookiePerSecond = data.cookiePerSecond || 0;
        cookiePerClickCount = data.cookiePerClickCount || 0;
        cookiePerSecondCount = data.cookiePerSecondCount || 0;
        cookiePerClickCost = data.cookiePerClickCost || 10;
        cookiePerSecondCost = data.cookiePerSecondCost || 100;
    }
}

function startGame() {
    loadGame();
    setInterval(update, 100);
    cookie.addEventListener("click", click);
    cookiePerClickUpgradeButton.addEventListener("click", buyCookiePerClick);
    cookiePerSecondUpgradeButton.addEventListener("click", buyCookiePerSecond);
    document.getElementById('reset-game').addEventListener('click', resetGame);
    updateAllDisplays();
}

function saveGame() {
    const data = {
        cookieCount,
        cookiePerClick,
        cookiePerSecond,
        cookiePerClickCount,
        cookiePerSecondCount,
        cookiePerClickCost,
        cookiePerSecondCost
    };
    localStorage.setItem('cookieGameDycel', JSON.stringify(data));
}

function fixAudio(){
    /*if (audio.paused) {
        audio.play();
    }
    if (audio.muted) {
        audio.muted = false;
    }*/
}

const audio = document.getElementById("bgAudio");

document.body.addEventListener("click", fixAudio);

function startPage(){
    setTimeout(fixAudio, 1000);
    startGame();
}

window.onload = startPage;