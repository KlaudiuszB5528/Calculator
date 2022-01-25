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
    if (current.textContent.includes("C")) clearDisplay();
    if (e.target.textContent == "." && current.textContent.includes("."))
      return;
    if (
      e.target.textContent == "0" &&
      current.textContent.charAt(0) == "0" &&
      current.textContent.charAt(1) != "."
    )
      return;
    if (current.textContent == "0" && e.target.textContent != ".")
      current.textContent = e.target.textContent;
    else current.textContent += e.target.textContent;
    currentValue = parseFloat(current.textContent);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (current.textContent == "" && previous.textContent != "") {
      previous.textContent = `${previous.textContent.slice(0, -1)} ${
        e.target.textContent
      }`;
      action = e.target.textContent;
    }

    if (current.textContent == "") return;

    if (previous.textContent == "") {
      prevValue = parseFloat(current.textContent);
      action = e.target.textContent;
      previous.textContent = `${current.textContent} ${e.target.textContent}`;
    } else {
      prevValue = parseFloat(previous.textContent.slice(0, -1));
      previous.textContent = `${operation(prevValue, action, currentValue)} ${
        e.target.textContent
      }`;
      action = e.target.textContent;
    }
    current.textContent = "";
  });
});

equalSign.addEventListener("click", (e) => {
  if (previous.textContent == "" || current.textContent == "") return;
  previous.textContent = "";
  current.textContent = `${operation(prevValue, action, currentValue)}`;
  prevValue = parseFloat(current.textContent);
});

backspace.addEventListener("click", (e) => {
  deleteOne();
  if (current.textContent.length == 0) currentValue = "";
  currentValue = parseFloat(current.textContent);
});

clear.addEventListener("click", () => {
  clearDisplay();
});

plusminus.addEventListener("click", (e) => {
  if (current.textContent == "") return;
  current.textContent = ~parseFloat(current.textContent) + 1;
  currentValue = parseFloat(current.textContent);
});

//keyboard support
const handleKeyboardInput = (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    if (current.textContent.includes("C")) clearDisplay();
    if (e.key == "." && current.textContent.includes(".")) return;
    if (
      e.key == "0" &&
      current.textContent.charAt(0) == "0" &&
      current.textContent.charAt(1) != "."
    )
      return;
    if (current.textContent == "0" && e.key != ".") current.textContent = e.key;
    else current.textContent += e.key;
    currentValue = parseFloat(current.textContent);
  }
  if (e.key === "=" || e.key === "Enter") {
    if (previous.textContent == "" || current.textContent == "") return;
    previous.textContent = "";
    current.textContent = `${operation(prevValue, action, currentValue)}`;
    prevValue = parseFloat(current.textContent);
  }
  if (e.key === "Backspace") deleteOne();
  if (e.key === "Escape") clearDisplay();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    if (current.textContent == "" && previous.textContent != "") {
      previous.textContent = `${previous.textContent.slice(0, -1)} ${e.key}`;
      action = e.key;
    }
    if (current.textContent == "") return;
    if (previous.textContent == "") {
      prevValue = parseFloat(current.textContent);
      action = e.key;
      previous.textContent = `${current.textContent} ${e.key}`;
    } else {
      prevValue = parseFloat(previous.textContent.slice(0, -1));
      previous.textContent = `${operation(prevValue, action, currentValue)} ${
        e.key
      }`;
      action = e.key;
    }
    current.textContent = "";
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
