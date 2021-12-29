document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#squares div");
  const displayResult = document.querySelector("#result");
  const startBtn = document.querySelector("#start");
  const loseDisplay = document.querySelector(".grid #gameOver");
  const width = 4;
  let score = 0;
  let random2;
  let isMoved;
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let random3;

  function start() {
    loseDisplay.style.opacity = "0";
    squares.forEach((index) => {
      index.classList.remove("block");
      index.classList.remove("noAdd");
      index.textContent = "";
    });
    undrawColor();
    let random1 = Math.floor(Math.random() * squares.length);
    squares[random1].classList.add("block");
    squares[random1].textContent = "2";
    createNewBlock();
    drawColor();
    score = 0;
    displayResult.textContent = score;
    document.addEventListener("keyup", control);
  }
  startBtn.addEventListener("click", start);

  function createNewBlock() {
    do {
      random2 = Math.floor(Math.random() * squares.length);
    } while (squares[random2].classList.contains("block"));
    squares[random2].classList.add("block");
    random3 = Math.floor(Math.random() * 10);
    if (random3 === 1 || random3 === 2 || random3 === 3)
      squares[random2].textContent = "4";
    else squares[random2].textContent = "2";
  }

  function control(event) {
    isMoved = false;
    if (event.keyCode === 40) {
      squares.forEach((index) => index.classList.remove("noAdd"));
      undrawColor();
      moveDown();
      moveDown();
      moveDown();
      moveDown();
      if (isMoved) createNewBlock();
      drawColor();
      gameOver();
      win();
    } else if (event.keyCode === 38) {
      squares.forEach((index) => index.classList.remove("noAdd"));
      undrawColor();
      moveUp();
      moveUp();
      moveUp();
      moveUp();
      if (isMoved) createNewBlock();
      drawColor();
      gameOver();
      win();
    } else if (event.keyCode === 39) {
      squares.forEach((index) => index.classList.remove("noAdd"));
      undrawColor();
      moveRight();
      moveRight();
      moveRight();
      moveRight();
      if (isMoved) createNewBlock();
      drawColor();
      gameOver();
      win();
    } else if (event.keyCode === 37) {
      squares.forEach((index) => index.classList.remove("noAdd"));
      undrawColor();
      moveLeft();
      moveLeft();
      moveLeft();
      moveLeft();
      if (isMoved) createNewBlock();
      drawColor();
      gameOver();
      win();
    }
  }

  function moveDown() {
    for (let i = squares.length - 1 - width; i >= 0; i--) {
      if (
        squares[i].classList.contains("block") &&
        !squares[i + width].classList.contains("block")
      ) {
        squares[i].classList.remove("block");
        let text = squares[i].textContent;
        squares[i].textContent = "";
        squares[i + width].classList.add("block");
        squares[i + width].textContent = text;
        isMoved = true;
      } else if (
        squares[i].classList.contains("block") &&
        squares[i + width].classList.contains("block") &&
        squares[i].textContent === squares[i + width].textContent &&
        !squares[i].classList.contains("noAdd") &&
        !squares[i + width].classList.contains("noAdd")
      ) {
        let number1 = parseInt(squares[i].textContent);
        let number2 = parseInt(squares[i + width].textContent);
        number2 += number1;
        score += number2;
        displayResult.textContent = score;
        squares[i].classList.remove("block");
        squares[i].textContent = "";
        squares[i + width].textContent = number2;
        squares[i + width].classList.add("noAdd");
        isMoved = true;
      }
    }
  }
  function moveUp() {
    for (let i = width; i <= squares.length - 1; i++) {
      if (
        squares[i].classList.contains("block") &&
        !squares[i - width].classList.contains("block")
      ) {
        squares[i].classList.remove("block");
        let text = squares[i].textContent;
        squares[i].textContent = "";
        squares[i - width].classList.add("block");
        squares[i - width].textContent = text;
        isMoved = true;
      } else if (
        squares[i].classList.contains("block") &&
        squares[i - width].classList.contains("block") &&
        squares[i].textContent === squares[i - width].textContent &&
        !squares[i - width].classList.contains("noAdd") &&
        !squares[i].classList.contains("noAdd")
      ) {
        let number1 = parseInt(squares[i].textContent);
        let number2 = parseInt(squares[i - width].textContent);
        number2 += number1;
        score += number2;
        displayResult.textContent = score;
        squares[i].classList.remove("block");
        squares[i].textContent = "";
        squares[i - width].textContent = number2;
        squares[i - width].classList.add("noAdd");
        isMoved = true;
      }
    }
  }
  function moveRight() {
    for (let i = squares.length - 1; i >= 0; i--) {
      if (i % width !== 0)
        if (
          squares[i].classList.contains("block") &&
          squares[i - 1].classList.contains("block") &&
          squares[i].textContent === squares[i - 1].textContent &&
          !squares[i].classList.contains("noAdd") &&
          !squares[i - 1].classList.contains("noAdd")
        ) {
          let number1 = parseInt(squares[i - 1].textContent);
          let number2 = parseInt(squares[i].textContent);
          number2 += number1;
          score += number2;
          displayResult.textContent = score;
          squares[i - 1].classList.remove("block");
          squares[i - 1].textContent = "";
          squares[i].textContent = number2;
          squares[i].classList.add("noAdd");
          isMoved = true;
        }
    }
    for (let i = squares.length - 1; i >= 0; i--) {
      if (i % width !== width - 1)
        if (
          squares[i].classList.contains("block") &&
          !squares[i + 1].classList.contains("block")
        ) {
          squares[i].classList.remove("block");
          let text = squares[i].textContent;
          squares[i].textContent = "";
          squares[i + 1].classList.add("block");
          squares[i + 1].textContent = text;
          if (squares[i].classList.contains("noAdd")) {
            squares[i].classList.remove("noAdd");
            squares[i + 1].classList.add("noAdd");
          }
          isMoved = true;
        }
    }
  }
  function moveLeft() {
    for (let i = 0; i <= squares.length - 1; i++) {
      if (i % width !== 3)
        if (
          squares[i].classList.contains("block") &&
          squares[i + 1].classList.contains("block") &&
          squares[i].textContent === squares[i + 1].textContent &&
          !squares[i].classList.contains("noAdd") &&
          !squares[i + 1].classList.contains("noAdd")
        ) {
          let number1 = parseInt(squares[i + 1].textContent);
          let number2 = parseInt(squares[i].textContent);
          number2 += number1;
          score += number2;
          displayResult.textContent = score;
          squares[i + 1].classList.remove("block");
          squares[i + 1].textContent = "";
          squares[i].textContent = number2;
          squares[i].classList.add("noAdd");
          isMoved = true;
        }
    }
    for (let i = 0; i <= squares.length - 1; i++) {
      if (i % width !== 0)
        if (
          squares[i].classList.contains("block") &&
          !squares[i - 1].classList.contains("block")
        ) {
          squares[i].classList.remove("block");
          let text = squares[i].textContent;
          squares[i].textContent = "";
          squares[i - 1].classList.add("block");
          squares[i - 1].textContent = text;
          if (squares[i].classList.contains("noAdd")) {
            squares[i].classList.remove("noAdd");
            squares[i - 1].classList.add("noAdd");
          }
          isMoved = true;
        }
    }
  }

  function gameOver() {
    if (array.every((index) => squares[index].classList.contains("block"))) {
      const bool1 = array.some((index) => {
        if (index % width !== width - 1)
          if (squares[index].textContent === squares[index + 1].textContent)
            return true;
          else return false;
      });
      const bool2 = array.some((index) => {
        if (index < 12)
          if (squares[index].textContent === squares[index + width].textContent)
            return true;
          else return false;
      });
      if (bool1 === false && bool2 === false) {
        loseDisplay.style.opacity = "1";
        document.removeEventListener("keyup", control);
      }
    }
  }

  function win() {
    if (array.some((index) => squares[index].textContent === "2048")) {
      loseDisplay.querySelector("h1").textContent = "You Win";
      loseDisplay.style.opacity = "1";
      document.removeEventListener("keyup", control);
    }
  }

  function undrawColor() {
    squares.forEach((i) => {
      i.style.removeProperty("background-color");
      i.style.removeProperty("color");
      if (i.style.fontSize) i.style.removeProperty("font-size");
      if (i.style.paddingTop) i.style.removeProperty("padding-top");
    });
  }
  function drawColor() {
    squares.forEach((i) => {
      if (i.classList.contains("block") && i.textContent === "2") {
        i.style.setProperty("background-color", "rgb(214, 214, 214)");
        i.style.setProperty("color", "rgb(45, 45, 45)");
      } else if (i.classList.contains("block") && i.textContent === "8") {
        i.style.setProperty("background-color", "rgb(255, 189, 67)");
        i.style.setProperty("color", "white");
      } else if (i.classList.contains("block") && i.textContent === "4") {
        i.style.setProperty("background-color", "rgb(220, 209, 172)");
        i.style.setProperty("color", "rgb(45, 45, 45)");
      } else if (i.classList.contains("block") && i.textContent === "16") {
        i.style.setProperty("background-color", "rgb(255, 72, 0)");
        i.style.setProperty("color", "white");
      } else if (
        i.classList.contains("block") &&
        (i.textContent === "32" || i.textContent === "64")
      ) {
        i.style.setProperty("background-color", "rgb(255, 35, 15)");
        i.style.setProperty("color", "white");
      } else if (
        i.classList.contains("block") &&
        (i.textContent === "128" || i.textContent === "256")
      ) {
        i.style.setProperty("background-color", "rgb(218, 218, 36)");
        i.style.setProperty("color", "white");
        i.style.setProperty("font-size", "2.5em");
      } else if (i.classList.contains("block") && i.textContent === "512") {
        i.style.setProperty("background-color", "rgb(226, 226, 0)");
        i.style.setProperty("color", "white");
        i.style.setProperty("font-size", "2.5em");
      } else if (
        i.classList.contains("block") &&
        (i.textContent === "1024" || i.textContent === "2048")
      ) {
        i.style.setProperty("background-color", "rgb(255, 208, 0)");
        i.style.setProperty("color", "white");
        i.style.setProperty("font-size", "2em");
        i.style.setProperty("padding-top", "27px");
      }
    });
  }
});
