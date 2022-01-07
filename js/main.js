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
        color: 'blue',
        default: '#000099',
        lit: '#1f1fff'
    },
];

const sounds = [
    new Audio ('./simon_sounds/green.m4a'),
    new Audio ('./simon_sounds/red.m4a'),
    new Audio ('./simon_sounds/yellow.m4a'),
    new Audio ('./simon_sounds/blue.m4a'),
    new Audio ('./simon_sounds/end.m4a'),
];

const litTime = 500;
const gapTime = 250;


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
    ignoreClicks = true;
    gameActive = false;
    gamePattern = [];
    render();
}

function render() {
    startButton.style.visibility = gameActive ? 'hidden' : 'visible';
    levelEl.innerHTML = gamePattern.length;
}

function handleStart() {
    gamePattern = [];
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
    sounds[buttonIdx].play();
    setTimeout(function () {
        button.style.backgroundColor = colors[buttonIdx].default;
    }, 250);
    if (correctPattern()) {
        gameTurn();
    } else if (patternError()) {
        sounds[4].play();
        gameActive = false;
        ignoreClicks = true;
    }
    render();
}

function patternError() {
    const copyPattern = gamePattern.slice(0, playerPattern.length);
    return JSON.stringify(copyPattern) !== JSON.stringify(playerPattern);
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
        sounds[colorIdx].play();
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