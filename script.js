// Create Variables
function create(name) {
  // avoid repeating whole sentence
  return document.createElement(name);
}

const body = document.body;
const container = create("div");
body.append(container);
container.setAttribute("class", "container");

const squaresWrapper = create("div");
squaresWrapper.setAttribute("class", "wrapper");
container.append(squaresWrapper);

// fn to create squares for filling our container
function createSquares(num) {
  const root = document.querySelector(":root");
  root.style.setProperty("--squares", num);

  const totalSquares = num * num;

  for (let i = 0; i < totalSquares; i++) {
    const square = create("div");
    squaresWrapper.append(square);
    square.classList.add("square");

    square.addEventListener("mousemove", () => {
      const color = document.querySelector('input[type="color"]').value;
      square.style.backgroundColor = color;
    });
  }
}

const btnWrapper = create("div");
btnWrapper.setAttribute("class", "btnWrapper");
container.append(btnWrapper);

// Start button
const start = create("button");
start.textContent = "Start";
start.classList.add("btn");

// Erase button
const eraser = create("button");
eraser.textContent = "Erase";
eraser.classList.add("btn");

// Choose color input
const colorPicker = create("div");

const colorLabel = create("label");
colorLabel.setAttribute("for", "color");
colorLabel.textContent = "Choose color:";

const choice = create("input");
choice.setAttribute("type", "color");
choice.setAttribute("value", "#494646");
choice.setAttribute("id", "color");

colorPicker.append(colorLabel, choice);
colorPicker.setAttribute("class", "color-picker");

// ******* */ Create range, number of squares to put in our wrapper
const rangeDiv = create("div");

const rangeLabel = create("label");
rangeLabel.setAttribute("for", "range");
rangeLabel.textContent = "Pixels:";

const range = create("input");

const random = () => Math.floor(Math.random() * 100 + 1);

// ****** Creating Object to assign range, to because it has many attribute
const attributes = {
  type: "range",
  id: "range",
  min: 16,
  max: 100,
  name: "range",
  value: random(),
};

function setAttr(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}
setAttr(range, attributes);

rangeDiv.append(rangeLabel, range);
rangeDiv.setAttribute("class", "color-picker");

// ******* Append all the buttons on UI
btnWrapper.append(start, eraser, colorPicker, rangeDiv);
createSquares(+range.value);

// **** Adding events to buttons and range
start.onclick = () => {
  removeSquares();
  drawAgain()
};

range.onchange = () => {
  removeSquares();
};

function removeSquares() {
  document.querySelectorAll(".square").forEach((sqr) => sqr.remove());
  createSquares(+range.value);
}

// ****** Alternate between erasing and drawing again with same color
let currentColor;
let eraserClicked = false;

const erase = () => {
  currentColor = document.querySelector('input[type="color"]').value;
  document.querySelector('input[type="color"]').value = "#ffffff";
  eraser.innerText = "Draw";
  eraserClicked = true;
};

function drawAgain(){
  document.querySelector('input[type="color"]').value = currentColor;
  eraser.innerText = "Erase";
  eraserClicked = false;
};

eraser.onclick = () => {
  eraserClicked === false ? erase() : drawAgain();
};
