'use strict';
//Selecting elements
const Player0El = document.querySelector(`.player--0`);
const Player1El = document.querySelector(`.player--1`);


const Score0EL = document.querySelector(`#score--0`);
const Score1EL = document.getElementById(`score--1`);
const Current0El = document.getElementById(`current--0`)
const Current1El = document.getElementById(`current--1`)




const SwitchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    Player0El.classList.toggle(`player--active`);
    Player1El.classList.toggle(`player--active`);
}


const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

//starting conditions


let Scores, currentScore, activePlayer, playing;
const init = () => {

    Scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    Score0EL.textContent = 0;
    Score1EL.textContent = 0;
    Current0El.textContent = 0;
    Current1El.textContent = 0;
    diceEl.classList.add(`hidden`);
    Player0El.classList.remove(`player--winner`)
    Player1El.classList.remove(`player--winner`)

    Player0El.classList.add(`player--active`)
    Player1El.classList.remove(`player--active`)

}
init();

//rolling dice functionality

btnRoll.addEventListener(`click`, () => {
    //1.Generating a random dice roll
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.Display dice
        diceEl.classList.remove(`hidden`);
        diceEl.src = `dice-${dice}.png`;

        //3.check if equal to 1,

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //if true switch to the other player
            SwitchPlayer();
        }
    }
})

btnHold.addEventListener(`click`, () => {
    //1.Add current score to the players active score

    if (playing) {

        Scores[activePlayer] += currentScore;
        //Scores[1]=Scores[1] +current score


        document.getElementById(`score--${activePlayer}`).textContent = Scores[activePlayer]


        //2.Check if the players score is <=100
        if (Scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add(`hidden`);
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`)
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`)
        }
        else {

            SwitchPlayer();
        }
    }
    //finish the game 
    //Switch to the next player
})

btnNew.addEventListener(`click`, init)