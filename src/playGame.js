import { displayCard, showHideCoverups } from "./displayItems";
import { startCounter, counter } from "./scoreCounter";
import { gameOver } from "./gameOver";
import { interval } from "./scoreCounter";

export const gameGuessMana = async (array) => {

  const testModeAnswer = document.querySelector("#test-mode-answer");

  const displayCardName = () => {
    if (document.querySelector("#test-mode").checked === true) {
      testModeAnswer.textContent = randomCard["name"];
    }
  };

  const playerAnswer = document.querySelector("#answer-input");
  const skipButton = document.querySelector("#skip-card-button");
  playerAnswer.readOnly = false;
  playerAnswer.value = "";
  skipButton.disabled = false;
  counter.value = 1000;

  let playerScore = 0;
  document.querySelector("#player-score").innerHTML = 0;

  let moves = 0;
  document.querySelector("#card-count").innerHTML = `${moves + 1}/5`;

  let randomCard = array[moves];

  displayCard(randomCard);
  showHideCoverups("block", document.querySelector("#choose-game-mode").value);
  displayCardName();

  const reload = () => {
    document.querySelector("#card-count").innerHTML = `${moves + 1}/5`;
    showHideCoverups(
      "block",
      document.querySelector("#choose-game-mode").value
    );
    playerAnswer.value = "";
    randomCard = array[moves];
    document.querySelector("#random-card").src = randomCard.img;
    counter.value = 1000;
    startCounter();
    displayCardName();
  };

  const checkGameOver = () => {
      gameOver(playerScore);
      skipButton.removeEventListener("click", skipButton.skip);
      playerAnswer.removeEventListener("input", playerAnswer.typeAnswer);
  };

  const reloadAfterAnswer = () => {
    clearInterval(interval.refreshId);
    showHideCoverups("none", "all");
    moves++;
  };

  const playGame = () => {
    skipButton.addEventListener(
      "click",
      (skipButton.skip = function skip() {
        reloadAfterAnswer();

        skipButton.disabled = true;

        if (moves==5) {
          checkGameOver();
          return
        }

        setTimeout(function () {
          reload();
          skipButton.disabled = false;
        }, 1000);
      })
    );

    playerAnswer.addEventListener(
      "input",
      (playerAnswer.typeAnswer = function typeAnswer() {
        if (
          playerAnswer.value.localeCompare(randomCard["name"], undefined, {
            sensitivity: "base",
          }) === 0
        ) {
          playerAnswer.readOnly = true;

          reloadAfterAnswer();

          playerScore += counter.value;
          document.querySelector(
            "#player-score"
          ).innerHTML = `<b> ${playerScore} </b>`;

          if (moves==5) {
            checkGameOver();
            return
          }
  

          setTimeout(function () {
            reload();
            playerAnswer.readOnly = false;
          }, 1000);
        }
      })
    );
  };
  playGame();
};
