export const winner = (player, card, points) => {
  let score = 0;
  if (player == card) {
    score += points;
  }
  return score;
};
