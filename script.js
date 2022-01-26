const current = document.getElementById("current");
const previous = document.getElementById("previous");
const buttons = document.querySelectorAll(".btn");
const operators = document.querySelectorAll(".operator");
const equalSign = document.getElementById("equal-sign");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const plusminus = document.getElementById("plusminus");

let currentValue = "";
let prevValue = "";
let action = undefined;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleButton(e, "textContext");
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    handleOperator(e, "textContext");
  });
});

equalSign.addEventListener("click", () => {
  handleEqual();
});

backspace.addEventListener("click", (e) => {
  if (current.textContent.length) {
    deleteOne();
    currentValue = parseFloat(current.textContent);
  }
});

clear.addEventListener("click", () => {
  clearDisplay();
});

plusminus.addEventListener("click", (e) => {
  if (current.textContent.length) {
    current.textContent = -current.textContent;
    currentValue = parseFloat(current.textContent);
  }
});

//keyboard support
const handleKeyboardInput = (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
    handleButton(e);
  }

  if (e.key == "=" || e.key == "Enter") {
    handleEqual();
  }

  if (e.key == "Backspace") deleteOne();

  if (e.key == "Escape") clearDisplay();

  if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    handleOperator(e);
  }
};

window.addEventListener("keydown", handleKeyboardInput);

const operation = (number, action, number2) => {
  switch (action) {
    case "+":
      return number + number2;
    case "-":
      return number - number2;
    case "*":
      return number * number2;
    case "/":
      if (number2 == 0) return (current.textContent = "Can't divide by 0!");
      else return number / number2;
    default:
      return "";
  }
};

const clearDisplay = () => {
  current.textContent = "";
  previous.textContent = "";
  currentValue = "";
  prevValue = "";
  action = undefined;
};

const deleteOne = () => {
  current.textContent = current.textContent.slice(0, -1);
};

const handleButton = (e, propertyName) => {
  let property;

  if (propertyName == "textContext") {
    property = e.target.textContent;
  } else {
    property = e.key;
  }

  if (current.textContent.includes("C")) clearDisplay();

  if (property == "." && current.textContent.includes(".")) return;

  if (
    property == "0" &&
    current.textContent.charAt(0) == "0" &&
    current.textContent.charAt(1) != "."
  )
    return;

  if (current.textContent == "0" && property != ".")
    current.textContent = property;
  else current.textContent += property;

  currentValue = parseFloat(current.textContent);
};

const handleOperator = (e, propertyName) => {
  let property;
  if (propertyName == "textContext") {
    property = e.target.textContent;
  } else {
    property = e.key;
  }

  if (current.textContent == "" && previous.textContent != "") {
    previous.textContent = `${previous.textContent.slice(0, -1)} ${property}`;
    action = property;
  }

  if (current.textContent == "") return;

  if (previous.textContent == "") {
    prevValue = parseFloat(current.textContent);
    action = property;
    previous.textContent = `${current.textContent} ${property}`;
  } else {
    prevValue = parseFloat(previous.textContent.slice(0, -1));
    previous.textContent = `${operation(
      prevValue,
      action,
      currentValue
    )} ${property}`;
    action = e.target.textContent;
  }

  current.textContent = "";
};

const handleEqual = () => {
  if (previous.textContent == "" || current.textContent == "") return;
  prevValue = parseFloat(previous.textContent.slice(0, -1));
  currentValue = parseFloat(current.textContent);
  previous.textContent = "";
  current.textContent = `${operation(prevValue, action, currentValue)}`;
};
