/*----- constants -----*/
const colors = [
    'green', 'red', 'yellow', 'blue'
];


/*----- app's state (variables) -----*/
let gamePattern = [];
let playerPattern = [];
let turn = 1; //1 is game, -1 is player.
let round = 1;
let isPlaying = false;

/*----- cached element references -----*/
const buttonEls = document.querySelectorAll('#board > div');
const startButton = document.getElementById('start'); // start button
const scoreboard = document.getElementById('score'); // current score (equals the current round)

/*----- event listeners -----*/
startButton.addEventListener('click', (event) => {
    gameTurn()
}); // start game
// player input click

/*----- functions -----*/

console.log(buttonEls);

function gameTurn() {
    console.log("clicked");
    let playerPattern = [];

    gamePattern.push(Math.floor(Math.random() * 4));
    
    renderGamePattern();
    // console.log(gamePattern);
};

function changeTurn() {
    turn = turn * -1;
};

function render() {

};

function renderGamePattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        let litIdx = gamePattern[i]
        setTimeout(function() {
            buttonEls[litIdx].style.opacity = .5;
        }, 1000);
        
    }
};