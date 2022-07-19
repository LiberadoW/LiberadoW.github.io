import { updateDatabase } from "./updateDatabase";
import { interval } from "./scoreCounter";

const targetNode = document.querySelector("#leaderboard");
const config = { attributes: true, childList: true, subtree: true };
const callback = function (mutationList, observer) {
	for (const mutation of mutationList) {
		if (mutation.type === 'childList') {
			document.querySelector("#play-area-wrapper").style.display = "none";
			document.querySelector(".game-over-wrapper").style.display = "flex";
		}
	}
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);


export const gameOver =  (score) => {
	const difficulty = document.querySelector("#choose-game-mode").value;
	updateDatabase(localStorage.getItem("username"), score,difficulty);
	document.querySelector("#final-score").innerHTML = `<b> ${score} </b>`;
	clearInterval(interval.refreshId);
	document.querySelector("#test-mode-answer").textContent = "";
	document.querySelector("#test-mode-answer-container").style.visibility = "hidden";
}