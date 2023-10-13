class Checkers {
  constructor() {
    this.renderBoard();
    this.renderDarkAndLightSquares();
    this.renderCheckerPeices();
    this.mouseHover();
    this.moveBlackPeices();
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
          square.appendChild(peice);
        } else if (row > 4) {
          const peice = document.createElement("div");
          peice.classList.add("peice", "player2");
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

  handlePieceClick(event) {
    const clickedPiece = event.target;
    const parentSquare = clickedPiece.parentElement;
    const row = parentSquare.dataset.row;
    const col = parentSquare.dataset.col;
    //test
    console.log(`Piece clicked at row: ${row}, col: ${col}`)
    
  }
  

  moveBlackPeices() {
   const pieces = document.querySelectorAll(".player2");
   pieces.forEach((piece) => {
    piece.addEventListener("click", (event) => {
        this.handlePieceClick(event);
    });
   })
  }

  
}

document.addEventListener("DOMContentLoaded", () => {
  const startGame = new Checkers();
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
