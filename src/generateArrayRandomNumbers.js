export const generateArray = (numberOfCardsInSet, numberOfCardsToGenerate) => {
  const arr = Array.from(
    {
      length: numberOfCardsInSet,
    },
    (_, i) => i
  );

  const randomNumberArr = [];

  for (let i = 0; i < numberOfCardsToGenerate; i++) {
    const index = Math.floor(Math.random() * arr.length);
    randomNumberArr.push(arr[index]);
    arr.splice(index, 1);
  }

  return randomNumberArr;
};
