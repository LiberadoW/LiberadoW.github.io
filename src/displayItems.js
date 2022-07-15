import { appendImg } from "./appendImage";
import { pickRandomElementFromArray } from "./pickRandomElementFromArray";

export const displayCard = (card) => {
  appendImg(
    card.img,
    "card-image-container",
    "random-card",
    "random-card"
  );
};

export const displayCoverup = (array) => {
  array.forEach((item) => {
    appendImg(item[0], "card-image-container", item[1], item[1], "coverup");
  });
};

export const coverupClassesArray = [
  ".name-coverup",
  ".card-art-coverup",
  ".mana-cost-coverup",
  ".attack-value-coverup",
  ".health-value-coverup",
];

export const showHideCoverups = (action, difficulty) => {
  const arrayOfClasses = [];
  switch (difficulty) {
    case "easy":
      arrayOfClasses.push(coverupClassesArray[0]);
      break;
    case "medium":
      arrayOfClasses.push(coverupClassesArray[0], coverupClassesArray[1]);
      break;
    case "hard":
      arrayOfClasses.push(
        coverupClassesArray[0],
        coverupClassesArray[1],
        pickRandomElementFromArray(coverupClassesArray.slice(2))
      );
      break;
    case "all":
      arrayOfClasses.push(...coverupClassesArray);
      break;
  }

  Array.from(document.querySelectorAll(arrayOfClasses)).forEach(function (val) {
    val.style.display = action;
  });
};
