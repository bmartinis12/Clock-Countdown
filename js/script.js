// Connect HTMl elements 

let hourHand = document.querySelector('.hours');
let minHand = document.querySelector('.minutes');
let secHand = document.querySelector('.seconds');
let countdownDays = document.querySelector(".countdown-days");
let countdownHours = document.querySelector(".countdown-hours");
let countdownMinutes = document.querySelector(".countdown-minutes");
let countdownSeconds = document.querySelector(".countdown-seconds");
let settingButton = document.querySelector('.popup-menu');
let setting = document.querySelector('.settings');
let back = document.querySelector('.back');
let userInput = document.querySelector('#user-input-date');


// Global Variables 

let finalDate = new Date('Jan 01, 2024 00:00:00');
let sec = 1000;
let min = sec * 60;
let hr = min * 60;
let day = hr * 24;

/* Call update clockhands function and countdown function every second */

let startClock = () => {
    updateTime();
    updateCountdown();
    setInterval(() => {
        updateTime();
        updateCountdown();
    }, 1000);
}

/* Update clockhands function */

let updateTime = () => {
    let now = new Date();
    let hours = now.getHours() % 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();


    hourHand.style.transform = `rotate(${(360 / 12) * hours}deg)`;
    minHand.style.transform = `rotate(${(360 / 60) * minutes}deg)`;
    secHand.style.transform = `rotate(${(360 / 60) * seconds}deg)`;
}

/* Update countdown function */

let updateCountdown = () => {
    let now = new Date();
    let diff = finalDate - now;
    let diffObj = convertMilliseconds(diff);

    countdownDays.textContent = diffObj.days >= 10 ? diffObj.days : '0' + diffObj.days;
    countdownHours.textContent = diffObj.hours >= 10 ? diffObj.hours : '0' + diffObj.hours;
    countdownMinutes.textContent = diffObj.minutes >= 10 ? diffObj.minutes : '0' + diffObj.minutes;
    countdownSeconds.textContent = diffObj.seconds >= 10 ? diffObj.seconds : '0' + diffObj.seconds;
}

/* convert milliseconds to days, hours, mins, and seconds */

let convertMilliseconds = (milli) => {
    let days = Math.floor(milli / day);
    let hours = Math.floor(milli % day / hr);
    let minutes = Math.floor(milli % hr / min);
    let seconds = Math.floor(milli % min / sec);
    return { days, hours, minutes, seconds };
}

/* Open coutndown settings screen */

settingButton.addEventListener('click', function () {
    setting.style.display = 'flex'
});

/* Close coutndown settings screen */

back.addEventListener('click', function () {
    setting.style.display = 'none'
    if (userInput.value == '') {
        console.log('No input');
    } else {
        finalDate = new Date(userInput.value);
    }
});

startClock()