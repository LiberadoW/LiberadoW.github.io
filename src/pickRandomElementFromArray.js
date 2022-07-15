export const pickRandomElementFromArray = (array) => {
   const item = array[Math.floor(Math.random()*array.length)];
   return item
}