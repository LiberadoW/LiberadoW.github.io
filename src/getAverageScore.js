import { createTableModal } from "./updateLeaderboard";
import { appendLeaderboardArrays } from "./updateDatabase";

export const averageScore = (array) => {
  const unique = [...new Set(array.map((item) => item.username))];

  const object = {};
  const string = [];

  unique.forEach((item) => {
    object[item] = [];
  });

  unique.forEach((name) => {
    array.forEach((item) => {
      if (item.username === name) {
        object[name].push(item.score);
      }
    });

    const topScore = Math.max(...object[name]);

    object[name] = Math.round(
      object[name].reduce((a, b) => a + b, 0) / object[name].length
    );

    string.push({ username: name, averageScore: object[name], score: topScore });
  });

  console.log(string);
  return string;
};


export const showAverageScores = (difficulty) => {
  if (
    localStorage.hasOwnProperty("valueEasy") &&
    localStorage.hasOwnProperty("valueMedium") &&
    localStorage.hasOwnProperty("valueHard")
  ) {
    createTableModal(
      averageScore(JSON.parse(localStorage.getItem(`value${difficulty}`))),
      "#modal-leaderboard-body"
    );
  } else {
    appendLeaderboardArrays();
    function check() {
      if (localStorage.hasOwnProperty("valueHard")) {
        createTableModal(
          averageScore(JSON.parse(localStorage.getItem(`value${difficulty}`))),
          "#modal-leaderboard-body"
        );
      } else {
        setTimeout(check, 0);
      }
    }
    setTimeout(check, 0);
  }
};