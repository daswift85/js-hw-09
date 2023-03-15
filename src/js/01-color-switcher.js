const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');

let intervalId;

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
startBtn.disabled = true;
stopBtn.disabled = false;

intervalId = setInterval(() => {
document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
}

function stopChangeColor() {
startBtn.disabled = false;
stopBtn.disabled = true;

clearInterval(intervalId);
}

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);
