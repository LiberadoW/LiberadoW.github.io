export const appendImg = (url, id, imgId, imgClass1, imgClass2) => {
  const img = document.createElement("img");
  img.src = url;
  img.id = imgId;
  img.className = `${imgClass1} ${imgClass2}`;
  document.getElementById(id).appendChild(img);
};
