import { createTable } from "./updateLeaderboard";

const getDifficultyArray = (difficulty) => {
  let array = [];
  switch (difficulty) {
    case "easy":
      array = "valueEasy";
      break;
    case "medium":
      array = "valueMedium";
      break;
    case "hard":
      array = "valueHard";
      break;
  }
  return array;
};

export const updateDatabase = (username, score, difficulty) => {
  const valueArray = getDifficultyArray(difficulty);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "api-key",
    "0G69rg8K92WdEkothR9aIJ7CYYS01M2nuqYn4nBJjCB1AJBpX8scJBkmVTBtENKZ"
  );

  const obj = {
    collection: "Highscores",
    database: "Hearthstone",
    dataSource: "Cluster0",
    filter: { _id: { $oid: "62c7f77c2e005ae745331566" } },
    update: {
      $push: {},
    },
  };

  obj.update.$push[valueArray] = { username: username, score: score };

  const raw = JSON.stringify(obj);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://myhearthstoneproxy.herokuapp.com/https://data.mongodb-api.com/app/data-yfusd/endpoint/data/v1/action/updateOne",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => findDocumentInDatabase(difficulty))
    .catch((error) => console.log("error", error));
};

export const findDocumentInDatabase = (difficulty, func) => {
  const valueArray = getDifficultyArray(difficulty);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "api-key",
    "0G69rg8K92WdEkothR9aIJ7CYYS01M2nuqYn4nBJjCB1AJBpX8scJBkmVTBtENKZ"
  );

  const raw = JSON.stringify({
    collection: "Highscores",
    database: "Hearthstone",
    dataSource: "Cluster0",
    filter: { _id: { $oid: "62c7f77c2e005ae745331566" } },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://myhearthstoneproxy.herokuapp.com/https://data.mongodb-api.com/app/data-yfusd/endpoint/data/v1/action/findOne",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("valueEasy", JSON.stringify(result.document.valueEasy));
      localStorage.setItem("valueMedium", JSON.stringify(result.document.valueMedium));
      localStorage.setItem("valueHard", JSON.stringify(result.document.valueHard));
      createTable(result.document[valueArray],"#leaderboard-body")
    })
    .catch((error) => console.log("error", error));
};

export const appendLeaderboardArrays = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "api-key",
    "0G69rg8K92WdEkothR9aIJ7CYYS01M2nuqYn4nBJjCB1AJBpX8scJBkmVTBtENKZ"
  );

  const raw = JSON.stringify({
    collection: "Highscores",
    database: "Hearthstone",
    dataSource: "Cluster0",
    filter: { _id: { $oid: "62c7f77c2e005ae745331566" } },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://myhearthstoneproxy.herokuapp.com/https://data.mongodb-api.com/app/data-yfusd/endpoint/data/v1/action/findOne",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("valueEasy", JSON.stringify(result.document.valueEasy));
      localStorage.setItem("valueMedium", JSON.stringify(result.document.valueMedium));
      localStorage.setItem("valueHard", JSON.stringify(result.document.valueHard));
    })
    .catch((error) => console.log("error", error));
};

