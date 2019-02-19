
// wyszukiwarka:

// data:
const date = document.querySelector("h3.date");
const newDate = new Date();
const year = newDate.getFullYear();
const month =
  newDate.getMonth() + 1 < 10
    ? `0${newDate.getMonth() + 1}`
    : `${newDate.getMonth() + 1}`;
const day =
  newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;

date.textContent = `${year}.${month}.${day}`;

// zegar:
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

setInterval(() => {
  const newDate = new Date();
  const newHour =
    newDate.getHours() < 10
      ? `0${newDate.getHours()}`
      : `${newDate.getHours()}`;
  const newMinute =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : `${newDate.getMinutes()}`;
  const newSecond =
    newDate.getSeconds() < 10
      ? `0${newDate.getSeconds()}`
      : `${newDate.getSeconds()}`;
  hour.textContent = `${newHour}:`;
  minute.textContent = `${newMinute}:`;
  second.textContent = newSecond;
}, 1000);

// Powiększenie diva z zadaniami:
const toDoDivs = document.querySelectorAll("div .to-do");

function growDiv() {
  toDoDivs.forEach(toDoDiv => toDoDiv.classList.remove("grow"));
  this.classList.add("grow");
}
toDoDivs.forEach(toDoDiv => toDoDiv.addEventListener("click", growDiv));

const removeGrow = () => {
  toDoDivs.forEach(toDoDiv => toDoDiv.classList.remove("grow"));
};
const h1 = document.querySelector("h1").addEventListener("click", removeGrow);
const inputSearch = document
  .querySelector(".search-i")
  .addEventListener("click", removeGrow);

// dodawanie zadań :
// zadania na dzisiaj:
const inputFOne = document.querySelector(".f-one input");
const ulOne = document.querySelector("ul.one");
const formOne = document.querySelector("form.f-one");
const liOne = document.getElementsByClassName("liOne");
const toDoListOne = [];

const removeOne = e => {
  e.target.parentNode.remove();
  const number = e.target.parentNode.dataset.key;
  toDoListOne.splice(number, 1);
  renderListOne();
};

const addTaskOne = e => {
  e.preventDefault();
  let index = inputFOne.value;
  if (index === "") return;
  const addTextOne = document.createElement("li");
  addTextOne.className = "liOne";
  addTextOne.innerHTML = `${index}(dodano ${year}.${month}.${day}) <button>-</button>`;
  toDoListOne.push(addTextOne);
  renderListOne();
  ulOne.appendChild(addTextOne);
  inputFOne.value = "";
  addTextOne.querySelector("button").addEventListener("click", removeOne);
};

const renderListOne = () => {
  ulOne.textContent = "";
  toDoListOne.forEach((element, key) => {
    element.dataset.key = key;
    ulOne.appendChild(element);
  });
};

formOne.addEventListener("submit", addTaskOne);

// zadania na jutro:

const inputFTwo = document.querySelector(".f-two input");
const ulTwo = document.querySelector("ul.two");
const formTwo = document.querySelector("form.f-two");
const liTwo = document.getElementsByClassName("liTwo");
const toDoListTwo = [];

const removeTwo = e => {
  e.target.parentNode.remove();
  const number = e.target.parentNode.dataset.key;
  toDoListTwo.splice(number, 1);
  renderListTwo();
};

const addTaskTwo = e => {
  e.preventDefault();
  let index = inputFTwo.value;
  if (index === "") return;
  const addTextTwo = document.createElement("li");
  addTextTwo.className = "liTwo";
  addTextTwo.innerHTML = `${index}(dodano ${year}.${month}.${day}) <button>-</button>`;
  toDoListTwo.push(addTextTwo);
  renderListTwo();

  ulTwo.appendChild(addTextTwo);
  inputFTwo.value = "";
  addTextTwo.querySelector("button").addEventListener("click", removeTwo);
};

const renderListTwo = () => {
  ulTwo.textContent = "";
  toDoListTwo.forEach((element, key) => {
    element.dataset.key = key;
    ulTwo.appendChild(element);
  });
};

formTwo.addEventListener("submit", addTaskTwo);

// zadania czas nieokreślony:

const inputFThree = document.querySelector(".f-three input");
const ulThree = document.querySelector("ul.three");
const formThree = document.querySelector("form.f-three");
const liThree = document.getElementsByClassName("liThree");
const toDoListThree = [];

const removeThree = e => {
  e.target.parentNode.remove();
  const number = e.target.parentNode.dataset.key;
  toDoListThree.splice(number, 1);
  renderListThree();
};

const addTaskThree = e => {
  e.preventDefault();
  const index = inputFThree.value;
  if (index === "") return;
  const addTextThree = document.createElement("li");
  addTextThree.className = "liThree";
  addTextThree.innerHTML = `${index}(dodano ${year}.${month}.${day}) <button>-</button>`;
  toDoListThree.push(addTextThree);
  renderListThree();
  ulThree.appendChild(addTextThree);
  inputFThree.value = "";
  addTextThree.querySelector("button").addEventListener("click", removeThree);
};

const renderListThree = () => {
  ulThree.textContent = "";
  toDoListThree.forEach((element, key) => {
    element.dataset.key = key;
    ulThree.appendChild(element);
  });
};

formThree.addEventListener("submit", addTaskThree);

// wyszukiwarka:

const inputS = document.querySelector(".search-i");
const ulS = document.querySelector(".ul-search");

const searchText = e => {
  const searchTasks = e.target.value.toLowerCase();
  let taskSearch = toDoListOne.concat(toDoListTwo, toDoListThree);
  taskSearch.forEach(element => (element.style.boxShadow = ""));
  taskSearch = taskSearch.filter(element =>
    element.textContent.toLowerCase().includes(searchTasks)
  );
  for (let i = 0; i < taskSearch.length; i++) {
    taskSearch.forEach(
      element => (element.style.boxShadow = "0 0  6px 3px white")
    );
    taskSearch.forEach(element => (ulS.textContent = element.textContent));
  }
};

inputS.addEventListener("input", searchText);

const changeColor = () => {
  let taskSearch = toDoListOne.concat(toDoListTwo, toDoListThree);
  if (inputS.value.length <= 0) {
    taskSearch = taskSearch.forEach(element => (element.style.boxShadow = ""));
    ulS.textContent = "";
  }
};
inputS.addEventListener("input", changeColor);

// animacja move/stop

const btnAnime = document.querySelector(".stop");

const animeStop = () => {
  document.body.classList.toggle("no-anime");
  if (document.body.classList.contains("no-anime")) {
    btnAnime.textContent = "Uruchom animację";
  } else {
    btnAnime.textContent = "Zatrzymaj animację";
  }
};
btnAnime.addEventListener("click", animeStop);
