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
    }
];

const litTime = 750
const gapTime = 250


/*----- app's state (variables) -----*/
let gamePattern = [];
let playerPattern = [];
let turn = 1; //1 is game, -1 is player.
let round = 1;
let isPlaying = false;

/*----- cached element references -----*/
const buttonEls = Array.from(document.querySelectorAll('#board > div'));
const startButton = document.getElementById('start'); // start button
const scoreboard = document.getElementById('score'); // current score (equals the current round)

/*----- event listeners -----*/
startButton.addEventListener('click', (event) => {
    gameTurn()
}); // start game
document.getElementById("board").addEventListener('click', event => {
    const button = event.target;
    const buttonIdx = buttonEls.indexOf(button);
    playerPattern.push(buttonIdx);
    console.log(playerPattern);
} // player input click
);

/*----- functions -----*/

console.log(buttonEls);

function gameTurn() {
    console.log("clicked");
    let playerPattern = [];

    gamePattern.push(Math.floor(Math.random() * 4));
    
    renderGamePattern();
    changeTurn ();
};

function playerTurn () {
    console.log("player turn");
    changeTurn();
};

function changeTurn() {
    turn = turn * -1;
    if ( turn === -1) {
        playerTurn ();
    } else gameTurn ();
};

function render() {

};

function renderGamePattern() {
    isPlaying = true;
    let idx = 0;
    const timerId = setInterval(function() {
        for (let i = 0; i < gamePattern.length; i++) {
            let litIdx = gamePattern[i];
            buttonEls[litIdx].style.backgroundColor = colors[litIdx].lit;
        }
    setTimeout(function() {
        for (let i = 0; i < gamePattern.length; i++) {
            let litIdx = gamePattern[i];
            buttonEls[litIdx].style.backgroundColor = colors[litIdx].default;
        }
    }, litTime);
    idx++;
    if (idx === gamePattern.length) {
      clearInterval(timerId);
      isPlaying = false;
      setTimeout(litTime);
    }
  }, litTime + gapTime);


    // const timerID = setInterval(function(){
    //     let litIdx = gamePattern[i];

    // })
    // for (let i = 0; i < gamePattern.length; i++) {
    //     let litIdx = gamePattern[i]
    //     setTimeout(function() {
    //         buttonEls[litIdx].style.backgroundColor = colors[litIdx].lit;
    //         buttonEls[litIdx].style.backgroundColor = colors[litIdx].default;
    //     }, 500);
// 
    // }
};