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
let scoreboard = 
let 

/*----- event listeners -----*/


/*----- functions -----*/

function gameTurn() {
    let playerPattern = [];

    gamePattern.push(Math.floor(Math.random * 4));
};

function changeTurn() {
    turn = turn * -1;
}

function render() {

};
