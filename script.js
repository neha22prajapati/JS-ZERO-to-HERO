const url = "person.json";
let ul = document.querySelector("ul");
let input = document.getElementById("filterbyPerson");
input.onchange = function () {
  filterbyPerson(e);
};

const getData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.person;
};

const displayData = async () => {
  const payload = await getData();
  console.log(payload);
  displayList = payload
    .map((object) => {
      const { firstName, lastName } = object;
      return `<li>${firstName} ${lastName}</li>`;
    })
    .join("");
  ul.innerHTML = displayList;
};

displayData();

filterbyPerson = async (e) => {
  const list = await getData();
  console.log(list);
  console.log(e);
};
