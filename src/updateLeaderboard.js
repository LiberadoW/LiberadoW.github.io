const sortArray = (array) => {
  const sortedArray = array.sort(
    (a, b) => parseFloat(b.score) - parseFloat(a.score)
  );
  return sortedArray;
};

const drawTable = (array, tableBodyId) => {
  const tableBody = document.querySelector(tableBodyId);
  tableBody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = array[i].index;
    td2.textContent = array[i].username;
    td3.textContent = array[i].score;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tableBody.appendChild(tr);
  }
};

export const createTable = (array, id) => {
  console.log(array);
  const lastAddedElement = array[array.length - 1];
  console.log(lastAddedElement);
  const sortedArray = sortArray(array);

  sortedArray.forEach((item) => {
    item.index = sortedArray.indexOf(item) + 1;
  });

  const topScores = sortedArray.slice(0, 5);

  const indexOfLastAddedElementAfterSort =
    sortedArray.indexOf(lastAddedElement);

  let finalArray;

  if (indexOfLastAddedElementAfterSort <= 8) {
    finalArray = sortedArray.slice(0, indexOfLastAddedElementAfterSort + 4);
  } else {
    finalArray = topScores.concat(
      sortedArray.slice(
        indexOfLastAddedElementAfterSort - 3,
        indexOfLastAddedElementAfterSort + 4
      )
    );
  }

  const rowToHighlight = finalArray.indexOf(lastAddedElement) + 1;

  drawTable(finalArray, id);
  const row = document.querySelector("#leaderboard-table").rows[rowToHighlight];
  row.classList.add("highlighted-class");

  if (topScores.every((item) => finalArray.includes(item))) {
    document
      .querySelector("#leaderboard-table")
      .rows[5].classList.add("black-bottom-border");
  }
};

export const createTableModal = (array, id) => {
  const sortedArray = sortArray(array);
  console.log(sortedArray);
  sortedArray.forEach((item) => {
    item.index = sortedArray.indexOf(item) + 1;
  });

  drawTable(sortedArray, id);

  const table = document.querySelector("#modal-leaderboard-table")

  if (table.rows[1]) {
    table.rows[1].classList.add("first-place")
  }
  if (table.rows[2]) {
    table.rows[2].classList.add("second-place")
  }
  if (table.rows[3]) {
    table.rows[3].classList.add("third-place")
  }
};


