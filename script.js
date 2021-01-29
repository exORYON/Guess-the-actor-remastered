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
let points = 0;
let streak = 0;

let musicEnabled = true;
let soundsEnabled = true;
let notificationsEnabled = false;

const startScreenContainer = document.querySelector(".start-screen");
const nicknameInputContainer = document.querySelector(".nickname-input");
const mainMenuContainer = document.querySelector(".main-menu");
const gameContainer = document.querySelector(".game");
const settingsContainer = document.querySelector(".settings");
const ratingsContainer = document.querySelector(".ratings");

const submitNicknameButton = document.querySelector("#submit-nickname");
const answerButtons = Array.from(document.querySelectorAll(".answers-list__item"));

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
    gameContainer.style.display = "flex";
    mainMenuContainer.style.display = "none";

    const answersList = document.querySelector(".answers-list");
    answersList.addEventListener("click", el => replaceContent(el.target));

    replaceContent();
}

function openSettings() {
    settingsContainer.style.display = "flex";
    mainMenuContainer.style.display = "none";
}

function openRating() {
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

const actorsImg = document.querySelector("#need-to-guess");

const usedActorIndex = [];
const actorsCount = actors.length; // 10
let currentAnswerIndex = null;
let answsersPrepared = false;

function replaceContent(target) {
    if (answsersPrepared) {
        let isButton = target.classList.contains("answers-list__item");
        if (!isButton) {
            return;
        }

        checkAnswer(target);
    } else {
        let actorsLeft = actorsCount - usedActorIndex.length;

        if (actorsLeft < 4) {
            alert(`CONGRATS!
            🎉🎊🎊🎊🎉 ${nickname}, YOU WON 🎉🎊🎊🎊🎉
            Points: ${points}
            Streak: ${streak}`);
            location.reload();
            return;
        }
    
        let actorIndex = generateIndex(actorsCount - 1);
            while (usedActorIndex.includes(actorIndex)) {
                actorIndex = generateIndex(actorsCount - 1);
            }
        
        usedActorIndex.push(actorIndex);
        actorsImg.src = actors[actorIndex].src;
    
        currentAnswerIndex = generateIndex(3);
    
        answerButtons[currentAnswerIndex].innerHTML = `${actors[actorIndex].firstName} ${actors[actorIndex].lastName}`
        let usedFalseAnswIndexes = [actorIndex];
    
        answerButtons.map((el, i) => {
            if (i === currentAnswerIndex) {
                return;
            }
    
            let randomIndex = generateIndex(actorsLeft - 1);
            while (usedFalseAnswIndexes.includes(randomIndex)) {
                randomIndex = generateIndex(actorsLeft);
            }
            usedFalseAnswIndexes.push(randomIndex);
            
            el.innerHTML = `${actors[randomIndex].firstName} ${actors[randomIndex].lastName}`;
        });

        answsersPrepared = true;
    }
}

function checkAnswer(btn) {
    if (btn.id == currentAnswerIndex) {
        btn.classList.add("answers-list__item_correct");
        points += 5;
        streak++;
        nextRound(true, btn);
    } else {
        btn.classList.add("answers-list__item_incorrect");
        points -= 5;
        streak = 0;
        nextRound(false, btn);
    }
}

function nextRound(answerWas, btn) {
    if (answerWas) {
        setTimeout(function() {
            btn.classList.remove("answers-list__item_correct");
            answsersPrepared = false;
            replaceContent();
        }, 1800);
    } else {
        setTimeout(function() {
            btn.classList.remove("answers-list__item_incorrect");
            answsersPrepared = false;
            replaceContent();
        }, 1800);
    }
}

let generateIndex = (limit) => Math.round(Math.random() * limit);