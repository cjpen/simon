/*----- constants -----*/
const colors = [
    {
        color: 'green',
        default: '#009900',
        lit: '#1fff1f'
    },
    {
        color: 'red',
        default: '#990000',
        lit: '#ff1f1f'
    },
    {
        color: 'yellow',
        default: '#999900',
        lit: '#ffff1f'
    },
    {
        color: 'red',
        default: '#000099',
        lit: '#1f1fff'
    },
];

const litTime = 750;
const gapTime = 450;


/*----- app's state (variables) -----*/
let gamePattern;
let playerPattern;
let ignoreClicks;
let gameActive;

/*----- cached element references -----*/
const buttonEls = Array.from(document.querySelectorAll('#board > div'));
const startButton = document.getElementById('start'); // start button
const levelEl = document.getElementById('level'); // current level (equals the current round)

/*----- event listeners -----*/
startButton.addEventListener('click', handleStart); // start game
document.getElementById("board").addEventListener('click', handlePlayerClick);

/*----- functions -----*/
init();

function init() {
    gamePattern = [];
    ignoreClicks = true;
    gameActive = false;
    render();
}

function render() {
    startButton.style.visibility = gameActive ? 'hidden' : 'visible';
    levelEl.innerHTML = gamePattern.length;
}

function handleStart() {
    gameActive = true;
    gameTurn();
    render();
}

function handlePlayerClick(evt) {
    const button = evt.target;
    const buttonIdx = buttonEls.indexOf(button);
    if (buttonIdx === -1 || ignoreClicks || !gameActive) return;
    playerPattern.push(buttonIdx);
    button.style.backgroundColor = colors[buttonIdx].lit;
    console.log('clicked');
    setTimeout(function () {
        button.style.backgroundColor = colors[buttonIdx].default;
    }, 250);
    if (correctPattern()) {
        gameTurn();
    }
    render();
}

function correctPattern() {
    return JSON.stringify(playerPattern) === JSON.stringify(gamePattern);
}

function gameTurn() {
    playerPattern = [];
    gamePattern.push(Math.floor(Math.random() * 4));
    renderGamePattern();
}

function renderGamePattern() {
    ignoreClicks = true;
    let idx = 0;
    const timerId = setInterval(function () {
        const colorIdx = gamePattern[idx];
        const button = buttonEls[colorIdx];
        button.style.backgroundColor = colors[colorIdx].lit;
        console.log(gamePattern, idx, colorIdx, button);
        setTimeout(function () {
            button.style.backgroundColor = colors[colorIdx].default;
        }, litTime);
        idx++;
        if (idx === gamePattern.length) {
            clearInterval(timerId);
            setTimeout(function() {
                ignoreClicks = false;
            }, litTime);
        }
    }, litTime + gapTime);
}