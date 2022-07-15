import { generateArray } from "./generateArrayRandomNumbers";
import { fetchCardInfo } from "./fetchCardInfoAPI";

export const generateRandomCards = async () => {
  const allCardsArray = await fetchCardInfo();
  const filteredArray = [];
  filteredArray.push(
    allCardsArray.filter((obj) => {
      return (obj.type === "Minion" && Object.keys(obj).includes("img"));
    })
  );
  const arrayOfIndexes = generateArray(filteredArray[0].length, 5);
  const randomCardsArray = [];
  arrayOfIndexes.map((x) => randomCardsArray.push(filteredArray[0][x]));
  console.log(randomCardsArray);
  return randomCardsArray;
};
