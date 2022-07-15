export const createLeaderboard = () => {
  if (localStorage.getItem("leaderboard") === null) {
    const leadboardScoreArray = [];
    localStorage.setItem("leaderboard", JSON.stringify(leadboardScoreArray));
  }
};
