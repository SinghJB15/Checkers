class Checkers {
  constructor() {
    this.renderBoard();
    this.renderDarkAndLightSquares();
    this.renderCheckerPeices();
    this.mouseHover();
    this.onBoardClick();
    this.selectedPeice = null;
    this.black = 0;
    this.red = 0;
    this.currentTurn = "player2";
    // this.targetSquare = null;
  }

  renderBoard() {
    const board = document.querySelector("#board");

    //Loop for each row
    for (let i = 0; i < 8; i++) {
      //Loop for each column in a row
      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        //Assigning classes and data atrributes
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.col = j;

        //Adding the square to the board
        //There will be a total of 64 square divs
        board.appendChild(square);
      }
    }
    console.log(board);
  }

  renderDarkAndLightSquares() {
    const squares = document.querySelectorAll("#board .square");
    squares.forEach((square) => {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);

      //Change square to dark
      if ((row + col) % 2 === 0) {
        square.classList.add("dark");
      } else {
        square.classList.add("light");
      }
    });
  }

  renderCheckerPeices() {
    //Select board with child elements that have the class "sqaure"
    const squares = document.querySelectorAll("#board .square");

    squares.forEach((square) => {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);

      //Check if is the square is a dark square
      if ((row + col) % 2 === 0) {
        //Place player 1 peices
        if (row < 3) {
          const peice = document.createElement("div");
          peice.classList.add("peice", "player1");
          peice.dataset.row = row;
          peice.dataset.col = col;
          square.appendChild(peice);
        } else if (row > 4) {
          const peice = document.createElement("div");
          peice.classList.add("peice", "player2");
          peice.dataset.row = row;
          peice.dataset.col = col;
          square.appendChild(peice);
        }
      }
    });
  }

  mouseHover() {
    const squares = document.querySelectorAll("#board .square");
    const peices = document.querySelectorAll("#board .peice");

    squares.forEach((square) => {
      if (square.classList.contains("dark")) {
        square.addEventListener("mouseover", () => {
          square.classList.add("mouseHoverDark");
        });
        square.addEventListener("mouseout", () => {
          square.classList.remove("mouseHoverDark");
        });
      }
    });

    peices.forEach((peice) => {
      peice.addEventListener("mouseover", () => {
        peice.classList.add("mouseOverPeice");
      });
      peice.addEventListener("mouseout", () => {
        peice.classList.remove("mouseOverPeice");
      });
    });
  }

  onBoardClick() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("peice")) {
          this.selectedPeice = event.target;
          console.log("Clicked Peice", this.selectedPeice);
        } else if (this.selectedPeice) {
          // Only try to handle a move if a piece is selected.
          this.handleClick(event);
        }
      });
    });
  }

  extractPositions(event) {
    const peiceRow = parseInt(this.selectedPeice.dataset.row);
    const peiceCol = parseInt(this.selectedPeice.dataset.col);
    const targetRow = parseInt(event.target.dataset.row);
    const targetCol = parseInt(event.target.dataset.col);
    return { peiceRow, peiceCol, targetRow, targetCol };
  }

  validateMove(peiceRow, peiceCol, targetRow, targetCol) {
    //Check player2 move
    if (this.selectedPeice.classList.contains("player2")) {
      this.currentTurn = "player1";
      return (
        targetRow === peiceRow - 1 &&
        (targetCol === peiceCol + 1 || targetCol === peiceCol - 1)
      );
    } //Check player 1 move
    else if (this.selectedPeice.classList.contains("player1")) {
      this.currentTurn = "player2";
      return (
        targetRow === peiceRow + 1 &&
        (targetCol === peiceCol + 1 || targetCol === peiceCol - 1)
      );
    } else {
      return false; //in valid mode
    }
  }

  captureMove(event) {
    const { peiceRow, peiceCol, targetRow, targetCol } = this.extractPositions(event);

    //Determine direction of movement
    let rowDirection, colDirection;
    if(targetRow - peiceRow > 0) {
      rowDirection = 1
    } else {
      rowDirection = -1;
    }
    if(targetCol - peiceCol > 0) {
      colDirection = 1; 
    } else {
      colDirection = -1
    }

    //Determine oponents square
    const opponentRow = peiceRow + rowDirection;
    const opponentCol = peiceCol + colDirection;

    const opponentSquare = document.querySelector(`[data-row='${opponentRow}'][data-col='${opponentCol}']`)

    //Validate the opponent's square
    if(this.selectedPeice.classList.contains("player2")){
      if(targetRow === peiceRow - 2 && opponentSquare && opponentSquare.firstElementChild && opponentSquare.firstElementChild.classList.contains("player1")) {
      opponentSquare.removeChild(opponentSquare.firstElementChild);
      this.executeMove(event.target);
      this.black++;
      this.updateUI();
      this.currentTurn = "player1";
    } else {
      //Invalid capture move
      this.invalidMove();
    }
  }
  if(this.selectedPeice.classList.contains("player1")) {
    if(targetRow === peiceRow + 2 && opponentSquare && opponentSquare.firstElementChild && opponentSquare.firstElementChild.classList.contains("player2")) {
      opponentSquare.removeChild(opponentSquare.firstElementChild);
      this.executeMove(event.target);
      this.red++;
      this.updateUI();
      this.currentTurn = "player2";
    } else {
      this.invalidMove();
    }
  } 
  }

  executeMove(target) {
    target.appendChild(this.selectedPeice);
    this.selectedPeice.dataset.row = target.dataset.row;
    this.selectedPeice.dataset.col = target.dataset.col;
    this.selectedPeice = null;
  }


  invalidMove() {
    alert("This is an invalid move!");
  }

  handleClick(event) {
    const { peiceRow, peiceCol, targetRow, targetCol } =
      this.extractPositions(event);
    //Validate target has no children elements (no checker peice) 

    if (!this.selectedPeice.classList.contains(this.currentTurn)) {
      return alert("not your current turn");
    }
    if(event.target.children.length !== 0) {
      return this.invalidMove();
    }
    //Normal checker move
    if(this.validateMove(peiceRow, peiceCol, targetRow, targetCol)) {
      return this.executeMove(event.target)
    }
    //Capture move validation
    if(Math.abs(targetRow - peiceRow) === 2) {
      return this.captureMove(event);
    }
    return this.invalidMove();
  }

  updateUI() {
    document.querySelector("#captures").innerHTML = `Red: ${this.red} | Black:${this.black}`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const newGame = new Checkers();
});

// document.addEventListener("DOMContentLoaded", () => {
//   renderBoard();
//   renderDarkAndLightSquares();
//   renderCheckerPeices();
//   mouseHover();
// });

// const renderBoard = () => {
//   const board = document.querySelector("#board");

//   //Loop for each row
//   for (let i = 0; i < 8; i++) {
//     //Loop for each column in a row
//     for (let j = 0; j < 8; j++) {
//       const square = document.createElement("div");
//       //Assigning classes and data atrributes
//       square.classList.add("square");
//       square.dataset.row = i;
//       square.dataset.col = j;

//       //Adding the square to the board
//       //There will be a total of 64 square divs
//       board.appendChild(square);
//     }
//   }
//   console.log(board);
// };

// const renderCheckerPeices = () => {
//   //Select board with child elements that have the class "sqaure"
//   const squares = document.querySelectorAll("#board .square");

//   squares.forEach((square) => {
//     const row = parseInt(square.dataset.row);
//     const col = parseInt(square.dataset.col);

//     //Check if is the square is a dark square
//     if ((row + col) % 2 === 0) {
//       //Place player 1 peices
//       if (row < 3) {
//         const peice = document.createElement("div");
//         peice.classList.add("peice", "player1");
//         square.appendChild(peice);
//       } else if (row > 4) {
//         const peice = document.createElement("div");
//         peice.classList.add("peice", "player2");
//         square.appendChild(peice);
//       }
//     }
//   });
// };

// const renderDarkAndLightSquares = () => {
//   const squares = document.querySelectorAll("#board .square");
//   squares.forEach((square) => {
//     const row = parseInt(square.dataset.row);
//     const col = parseInt(square.dataset.col);

//     //Change square to dark
//     if ((row + col) % 2 === 0) {
//       square.classList.add("dark");
//     } else {
//       square.classList.add("light");
//     }
//   });
// };

// const mouseHover = () => {
//   const squares = document.querySelectorAll("#board .square");

//   squares.forEach((square) => {
//     if (square.classList.contains("dark")) {
//       square.addEventListener("mouseover", () => {
//         square.classList.add("mouseHoverDark");
//         square.addEventListener("mouseout", () => {
//           square.classList.remove("mouseHoverDark");
//         });
//       });
//     }
//   });
// };
