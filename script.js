const url = "person.json";
let ul = document.querySelector("ul");
let p = document.getElementById("error");

const getData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.person;
};

const displayData = async () => {
  const payload = await getData();
  displayList = payload
    .map((object) => {
      const { firstName, lastName } = object;
      return `<li>${firstName} ${lastName}</li>`;
    })
    .join("");
  ul.innerHTML = displayList;
};

displayData();

filterPersonData = async () => {
  let input = document.getElementById("filterbyPerson");
  if (input.value.length < 3) {
    if (input.value.length === 0) {
      p.style.display = "none";
      ul.style.display = "block";
      displayData();
    }
    return;
  }

  const list = await getData();
  let value = list
    .filter((li) => li.firstName.toUpperCase() === input.value.toUpperCase())
    .map((object) => {
      const { firstName, lastName } = object;
      return `<li>${firstName} ${lastName}</li>`;
    })
    .join("");

  if (value) {
    p.style.display = "none";
    ul.innerHTML = value;
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
    p.innerHTML = "Oops! No data present with this name";
    p.style.display = "block";
  }
};
