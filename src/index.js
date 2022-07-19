import { generateRandomCards } from "./generateRandomCards";
import { showAverageScores } from "./getAverageScore"
import { gameGuessMana } from "./playGame";
import { startCounter } from "./scoreCounter";

document.getElementById("start-game").addEventListener("click", async () => {
  if (document.querySelector("#choose-game-mode").value === "nothing") {
    alert("Please choose difficulty.");
  } else if (localStorage.getItem("username") === null) {
    alert("Please choose your username.");
  } else {
    document.querySelector("#start-game").disabled = true;
    document.querySelector("#home-wrapper").style.display = "none";
    const randomCardsArray = await generateRandomCards();
    gameGuessMana(randomCardsArray);
    window.setTimeout(() => {
      document.querySelector(".play-area-wrapper").style.display = "flex";
      startCounter();
      if (document.querySelector("#test-mode").checked == true) {
        document.querySelector("#test-mode-answer-container").style.visibility = "visible";
      }
    }, 500);
  }
});

document
  .querySelector("#username-input-button")
  .addEventListener("click", () => {
    const username = document.querySelector("#username-input").value
    if (username === "") {
      alert("Please choose your username.");
    } else if (/^[a-zA-Z0-9]{3,24}$/.test(username)) {
      localStorage.setItem(
        "username",
        username
      );
      document.querySelector("#username-modal-container").classList.remove("show");
      document.querySelector("#username-button").textContent = username;
    }else {
      alert("Username may only contain letters and numbers and must be at least 3 and up to 24 characters long.")
    }
  });

document.querySelector("#show-instructions").addEventListener("click", () => {
  document.querySelector("#instructions-modal-container").classList.add("show");
});

document
  .querySelector("#close-modal-instructions")
  .addEventListener("click", () => {
    document.querySelector("#instructions-modal-container").classList.remove("show");
  });

document.querySelector("#show-leaderboard").addEventListener("click", () => {
  document.querySelector("#leaderboard-modal-container").classList.add("show");
  showAverageScores("Easy");
  document.querySelector("#leaderboard-easy").checked = true;

});

document.querySelector("#play-again-button").addEventListener("click", () => {
  document.querySelector("#random-card").remove();
  document.querySelector("#home-wrapper").style.display = "flex";
  document.querySelector("#game-over-wrapper").style.display = "none";
  document.querySelector("#start-game").disabled = false;
});

document.querySelectorAll('input[name="difficulty"]').forEach((elem) => {
  elem.addEventListener("change", function(event) {
    const difficulty = event.target.value;
    showAverageScores(difficulty)
  });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == document.querySelector("#leaderboard-modal-container")) {
    document.querySelector("#leaderboard-modal-container").classList.remove("show");
  } else if (event.target == document.querySelector("#instructions-modal-container")){
    document.querySelector("#instructions-modal-container").classList.remove("show");
  }

};

window.onload = () => {
  if (!localStorage.hasOwnProperty("username")) {
    document.querySelector("#username-modal-container").classList.add("show");
  }
  document.querySelector("#username-button").textContent = localStorage.getItem("username");
};
