export const getNumberOfCardsInSet = (set) => {
  let numberOfCardsInSet;
  switch (set) {
    case "legacy":
      numberOfCardsInSet = 239;
      break;
  }
  return numberOfCardsInSet;
};
