const actors = [{
        firstName: "Том",
        lastName: "Харди",
        src: "images/hardy.jpg"
    },
    {
        firstName: "Джейк",
        lastName: "Джилленхол",
        src: "images/jill.png"
    },
    {
        firstName: "Джон",
        lastName: "Траволта",
        src: "images/travolta.jpg"
    },
    {
        firstName: "Том",
        lastName: "Круз",
        src: "images/cruise.jpg"
    },
    {
        firstName: "Киану",
        lastName: "Ривз",
        src: "images/reeves.jpg"
    },
    {
        firstName: "Брэд",
        lastName: "Питт",
        src: "images/pitt.jpg"
    },
    {
        firstName: "Леонардо",
        lastName: "Дикаприо",
        src: "images/dicaprio.jpg"
    },
    {
        firstName: "Кристиан",
        lastName: "Бэйл",
        src: "images/bale.jpg"
    },
    {
        firstName: "Джонни",
        lastName: "Депп",
        src: "images/depp.jpg"
    },
    {
        firstName: "Брюс",
        lastName: "Уиллис",
        src: "images/willis.jpg"
    }
];

let nickname = null;

let musicEnabled = true;
let soundsEnabled = true;
let notificationsEnabled = false;

const startScreenContainer = document.querySelector(".start-screen");
const nicknameInputContainer = document.querySelector(".nickname-input");
const mainMenuContainer = document.querySelector(".main-menu");
const settingsContainer = document.querySelector(".settings");
const ratingsContainer = document.querySelector(".ratings");

const submitNicknameButton = document.querySelector("#submit-nickname");

startScreenContainer.onclick = function() {
    startScreenContainer.style.display = "none";
    nicknameInputContainer.style.display = "flex";
}

submitNicknameButton.onclick = function() {
    if (nickname === null) {
        nickname = "Guest";
    }

    acceptNickname();
}

const nicknameInput = document.querySelector("#player-nickname-input");
nicknameInput.oninput = () => checkNickname();

function checkNickname() {
    let currentUserInput = nicknameInput.value;
    let regex = /\w\w[\w ]+/;

    if (regex.test(currentUserInput)) {
        nickname = currentUserInput;
        showStartGameButton();
    } else {
        nickname = "Guest";
        let acceptButton = document.querySelector("#acceptNicknameButton");
        
        if (acceptButton !== null) {
            acceptButton.remove();
            submitNicknameButton.innerHTML = `<span id="submit-nickname">Play as a guest</span>`
        }
    }
}

function showStartGameButton() {
    submitNicknameButton.innerHTML = `<button id="acceptNicknameButton" class="button">Accept</button>`;
}

let startGameBtnClickHandler = function() {
    startGame();
}

let settingsBtnClickHandler = function() {
    openSettings();
}

let ratingBtnClickHandler = function() {
    openRating();
}

function acceptNickname() {
    nicknameInputContainer.style.display = "none";
    document.querySelector(".main-menu__greeting").innerHTML = `Hello, ${nickname}`;
    mainMenuContainer.classList.remove("blured");

    let startGameBtn = document.querySelector("#play-button");
    let settingsBtn = document.querySelector("#settings-button");
    let ratingBtn = document.querySelector("#rating-button");

    startGameBtn.addEventListener("click", startGameBtnClickHandler);
    settingsBtn.addEventListener("click", settingsBtnClickHandler);
    ratingBtn.addEventListener("click", ratingBtnClickHandler);
}

function startGame() {
    console.log("STARTED");
    mainMenuContainer.style.display = "none";
}

function openSettings() {
    console.log("SETTINGS");
    settingsContainer.style.display = "flex";
    mainMenuContainer.style.display = "none";
}

function openRating() {
    console.log("RATING");
    ratingsContainer.style.display = "flex";
    mainMenuContainer.style.display = "none";
}

let toggle = document.querySelectorAll(".toggle__button");
let toggleClickHandler = function (el) {
    switchToggle(el);
}

for (const each of toggle) {
    each.addEventListener("click", toggleClickHandler);
}

function switchToggle(element) {
    let toggleId = element.target.id;
    let state = null;
    
    switch (toggleId) {
        case "sounds-toggle":
            musicEnabled = musicEnabled ? false : true;
            state = musicEnabled;
        break;
        case "music-toggle":
            soundsEnabled = soundsEnabled ? false : true;
            state = soundsEnabled;
        break;
        case "notifications-toggle":
            notificationsEnabled = notificationsEnabled ? false : true;
            state = notificationsEnabled;
        break;
        
        default: break;
    }

    if (state) {
        element.target.innerHTML = "ON";
        element.target.style.left = "47%";
        element.target.style.marginLeft = "0px";
        element.target.style.backgroundColor = "#d4080ee7";
    } else {
        element.target.innerHTML = "OFF"
        element.target.style.left = "0%";
        element.target.style.marginLeft = "-1px";
        element.target.style.backgroundColor = "#841B37";
    }
}

const getBackArrow = document.querySelectorAll(".get-back");
for (const each of getBackArrow) {
    each.addEventListener("click", function() {
        mainMenuContainer.style.display="flex"; 
        settingsContainer.style.display = "none";
        ratingsContainer.style.display = "none";
    });
}
