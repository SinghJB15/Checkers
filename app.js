class Checkers {
  constructor() {
    this.renderBoard();
    this.renderDarkAndLightSquares();
    this.renderCheckerPeices();
    this.mouseHover();
    this.onBoardClick();
    this.selectedPeice = null;
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

    squares.forEach((square) => {
      if (square.classList.contains("dark")) {
        square.addEventListener("mouseover", () => {
          square.classList.add("mouseHoverDark");
          square.addEventListener("mouseout", () => {
            square.classList.remove("mouseHoverDark");
          });
        });
      }
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
        } 
        this.handleClick(event);
      });
    });
  }

  handleClick(event) {
    // console.log(event.target);
    const peiceRow = parseInt(this.selectedPeice.dataset.row);
    const peiceCol = parseInt(this.selectedPeice.dataset.col);
    const targetRow = parseInt(event.target.dataset.row);
    const targetCol = parseInt(event.target.dataset.col);
    if(this.selectedPeice.classList.contains("player2")) {
      if(targetRow === peiceRow - 1 && (targetCol === peiceCol + 1) || (targetCol === peiceCol -1)) {
        event.target.appendChild(this.selectedPeice);
        //Update data of the moved peice
        this.selectedPeice.dataset.row = targetRow;
        this.selectedPeice.dataset.col = targetCol;
        this.selectedPeice = null;
        // this.targetSquare = null;
      }
    }
    if(this.selectedPeice.classList.contains("player1")) {
      if(targetRow === peiceRow + 1 && (targetCol === peiceCol + 1) || (targetCol === peiceCol -1)) {
        event.target.appendChild(this.selectedPeice);
        //Update data of the moved peice
        this.selectedPeice.dataset.row = targetRow;
        this.selectedPeice.dataset.col = targetCol;
        this.selectedPeice = null;
        // this.targetSquare = null;
      }
    }
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
