class Checkers {
  constructor() {
    this.initVariables();
    this.renderBoard();
    this.renderDarkAndLightSquares();
    this.renderCheckerPeices();
    this.mouseHoverSquare();
    this.mouseHoverPeice();
    this.onBoardClick();
    this.restartGame();
    this.instructions();
  }

  // Initialization Variables - Initial setup for gameplay
  initVariables() {
    this.selectedPeice = null;
    this.black = 12;
    this.red = 12;
    this.currentTurn = "player2";
    this.currentPlayer = "black";
  }

  // Initialization and Rendering

  //Render the 8x8 board
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

  //Render dark and light squares
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

  //Render black and red checker peices
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

  // Event Handling

  // Highlighting the squares and peices
  mouseHoverSquare() {
    const squares = document.querySelectorAll("#board .square");
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
  }

  mouseHoverPeice() {
    const peices = document.querySelectorAll("#board .peice");
    peices.forEach((peice) => {
      peice.addEventListener("mouseover", () => {
        peice.classList.add("mouseOverPeice");
      });
      peice.addEventListener("mouseout", () => {
        peice.classList.remove("mouseOverPeice");
      })
    })
  }

  //On board click
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

  //Handle clicks
  handleClick(event) {
    const targetSquare = event.target;

    const { peiceRow, peiceCol, targetRow, targetCol } =
      this.extractPositions(targetSquare);
    //Validate target has no children elements (no checker peice)

    if (!this.selectedPeice.classList.contains(this.currentTurn)) {
      return this.showNotification("not your current turn");
    }
    if (targetSquare.children.length !== 0) {
      return this.invalidMove();
    }
    //Normal checker move
    if (this.validateMove(peiceRow, peiceCol, targetRow, targetCol)) {
      this.executeMove(targetSquare);
      this.selectedPeice = null; //nullify after the move
      this.switchTurn();
      return;
    }
    //Capture move validation
    if (Math.abs(targetRow - peiceRow) === 2) {
      if (this.handleCapture(targetSquare)) {
        //If a capture has occured, then check for potential mulit-jumps
        if (this.checkForMultiJumps(targetSquare)) {
          //If mulit jump is possible, notify user
          this.showNotification("Another Capture is possible!");
          return; //do not switch turns
        } else {
          //no more captures are possible
          this.switchTurn();
          this.selectedPeice = null;
          return; //exit function after handling multi jump
        }
      }
    } else {
      //invalid capture move
      return this.invalidMove();
    }
    // if above all fails
    return this.invalidMove();
  }

  // Move Logic

  //Extract positions
  extractPositions(targetSquare) {
    const peiceRow = parseInt(this.selectedPeice.dataset.row);
    const peiceCol = parseInt(this.selectedPeice.dataset.col);
    const targetRow = parseInt(targetSquare.dataset.row);
    const targetCol = parseInt(targetSquare.dataset.col);
    return { peiceRow, peiceCol, targetRow, targetCol };
  }

  //Validate move
  validateMove(peiceRow, peiceCol, targetRow, targetCol) {
    //Check if a peice is a king
    if (this.selectedPeice.dataset.type === "king") {
      return (
        (targetRow === peiceRow - 1 || targetRow === peiceRow + 1) &&
        (targetCol === peiceCol + 1 || targetCol === peiceCol - 1)
      );
    }

    //Check player2 move
    if (this.selectedPeice.classList.contains("player2")) {
      return (
        targetRow === peiceRow - 1 &&
        (targetCol === peiceCol + 1 || targetCol === peiceCol - 1)
      );
    } //Check player 1 move
    else if (this.selectedPeice.classList.contains("player1")) {
      return (
        targetRow === peiceRow + 1 &&
        (targetCol === peiceCol + 1 || targetCol === peiceCol - 1)
      );
    } else {
      return false; //in valid mode
    }
  }

  //Execute Move
  executeMove(target) {
    target.appendChild(this.selectedPeice);
    this.selectedPeice.dataset.row = target.dataset.row;
    this.selectedPeice.dataset.col = target.dataset.col;
    this.checkKing();
    this.updateScoreUI();
    this.winCondition();
  }

  //Validate capture
  validateCapture(targetSquare) {
    const { peiceRow, peiceCol, targetRow, targetCol } =
      this.extractPositions(targetSquare);

    //Determine direction of movement
    let rowDirection;
    let colDirection;
    if (targetRow - peiceRow > 0) {
      rowDirection = 1;
    } else {
      rowDirection = -1;
    }
    if (targetCol - peiceCol > 0) {
      colDirection = 1;
    } else {
      colDirection = -1;
    }

    //Determine Opponent's Square
    const opponentRow = peiceRow + rowDirection;
    const opponentCol = peiceCol + colDirection;
    const opponentSquare = document.querySelector(
      `[data-row='${opponentRow}'][data-col='${opponentCol}']`
    );

    if (!opponentSquare || !opponentSquare.firstElementChild) {
      return false; //no capture possible
    }

    const opponentPeice = opponentSquare.firstElementChild;

    //Handle King's movement and capturing
    if (
      this.selectedPeice.dataset.type === "king" &&
      (targetRow === peiceRow + 2 || targetRow === peiceRow - 2) &&
      (targetCol === peiceCol + 2 || targetCol === peiceCol - 2)
    ) {
      if (
        (this.selectedPeice.classList.contains("player1") &&
          opponentPeice.classList.contains("player2")) ||
        (this.selectedPeice.classList.contains("player2") &&
          opponentPeice.classList.contains("player1"))
      ) {
        return true;
      }
    }

    //Handle Regular Movements
    if (
      this.selectedPeice.classList.contains("player1") &&
      targetRow === peiceRow + 2 &&
      (targetCol === peiceCol + 2 || targetCol === peiceCol - 2) &&
      opponentPeice.classList.contains("player2")
    ) {
      return true;
    }

    if (
      this.selectedPeice.classList.contains("player2") &&
      targetRow === peiceRow - 2 &&
      (targetCol === peiceCol + 2 || targetCol === peiceCol - 2) &&
      opponentPeice.classList.contains("player1")
    ) {
      return true;
    }
    //if above all fails return false indicating capture move is not possible
    return false;
  }

  //Handle capture
  handleCapture(targetSquare) {
    if (this.validateCapture(targetSquare)) {
      const { peiceRow, peiceCol, targetRow, targetCol } =
        this.extractPositions(targetSquare);

      //Determine direction of movement
      let rowDirection;
      let colDirection;

      if (targetRow - peiceRow > 0) {
        rowDirection = 1;
      } else {
        rowDirection = -1;
      }
      if (targetCol - peiceCol > 0) {
        colDirection = 1;
      } else {
        colDirection = -1;
      }

      //Determine Opponent's square
      const opponentRow = peiceRow + rowDirection;
      const opponentCol = peiceCol + colDirection;
      const opponentSquare = document.querySelector(
        `[data-row='${opponentRow}'][data-col='${opponentCol}']`
      );

      const opponentPeice = opponentSquare.firstElementChild;

      this.capturePeice(opponentSquare, opponentPeice);
      this.executeMove(targetSquare);
      return true;
    }
    return false;
  }

  //Check for multi jumps
  checkForMultiJumps(currentSquare) {
    const directions = [
      { row: 2, col: 2 },
      { row: 2, col: -2 },
      { row: -2, col: 2 },
      { row: -2, col: -2 },
    ];

    const peiceRow = parseInt(currentSquare.dataset.row);
    const peiceCol = parseInt(currentSquare.dataset.col);

    for (const direction of directions) {
      const targetRow = peiceRow + direction.row;
      const targetCol = peiceCol + direction.col;
      const targetSquare = document.querySelector(
        `[data-row='${targetRow}'][data-col='${targetCol}']`
      );

      //ensure target square is on the board
      if (!targetSquare) {
        continue; //if targetSquare is null or undefined, do not proceed with rest of the code and skip to the next iteration
      }

      if (
        !targetSquare.firstElementChild &&
        this.validateCapture(targetSquare)
      ) {
        return true;
      }
    }
    //if above all fails
    return false;
  }

  //Capture Peice
  capturePeice(opponentSquare, opponentPeice) {
    if (opponentPeice.classList.contains("player1")) {
      this.red--;
    } else {
      this.black--;
    }
    opponentSquare.removeChild(opponentPeice);
  }

  // Gameplay Utilities

  //Check king
  checkKing() {
    if (this.selectedPeice.classList.contains("player2")) {
      if (this.selectedPeice.dataset.row === "0") {
        this.selectedPeice.dataset.type = "king";
        this.selectedPeice.classList.add("king")
        console.log("Player 2 peice has been kinged!");
        return;
      }
    } else if (this.selectedPeice.classList.contains("player1")) {
      if (this.selectedPeice.dataset.row === "7") {
        this.selectedPeice.dataset.type = "king";
        this.selectedPeice.classList.add("king");
        console.log("Player 1 peice has been kinged");
        return;
      }
    } else {
      return false;
    }
  }

  //Update UI
  updateScoreUI() {
    document.querySelector(
      "#player1-info"
    ).innerHTML = `Player 1: Red |${this.red}`;

    document.querySelector(
      "#player2-info"
    ).innerHTML = `Player 2: Black |${this.black}`
  }

  updateUI() {
    document.querySelector("#current-player").innerHTML = `Current Player: ${this.currentPlayer}`
  };

  //Switch turns
  switchTurn() {
    let player1Info = document.querySelector("#player1-info");
    let player2Info = document.querySelector("#player2-info");
    let currentPlayerElem = document.querySelector("#current-player");

    if (this.currentPlayer === "black") {
        this.currentPlayer = "red";
        this.currentTurn = "player1";
        currentPlayerElem.innerHTML = `Current Player: ${this.currentPlayer}`;
        player1Info.style.opacity = "1";  // Highlight Player 1
        player2Info.style.opacity = "0.5";  // Fade out Player 2
    } else if (this.currentPlayer === "red") {
        this.currentPlayer = "black";
        this.currentTurn = "player2";
        currentPlayerElem.innerHTML = `Current Player: ${this.currentPlayer}`;
        player1Info.style.opacity = "0.5";  // Fade out Player 1
        player2Info.style.opacity = "1";  // Highlight Player 2
    }
}


  //Invalid moves
  invalidMove() {
    this.showNotification("This is an invalid move");
  }

  //Show notifications
  showNotification(message) {
    const notifcationElement = document.querySelector(".notification");
    const messageElement = document.querySelector("#other-message");
    messageElement.textContent = message;
    notifcationElement.style.display = "flex";

    //Hide the notification after 3 seconds 
    setTimeout(() => {
      notifcationElement.style.display = "none";
    }, 3000);
  }

  //Check win condition
  winCondition() {
    if(this.black === 0) {
     this.showNotification("Player 1 has WON! To play again, click 'Restart Game'");
    } else if(this.red === 0) {
      this.showNotification("Player 2 has WON! To play again, click 'Restart Game'");
    }
  }
  

  //Reset Game
  resetGame() {
    this.clearBoard();
    this.initVariables();
    this.renderCheckerPeices();
    this.mouseHoverPeice();
    this.updateScoreUI();
    this.updateUI();
    //Clear the game message
  }

  //Restart game
  restartGame() {
    const restartButton = document.querySelector("#restart-game");
    restartButton.addEventListener("click", () => {
      this.resetGame();
    });
  }

 //Clear the board 
  clearBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      if(square.firstElementChild) {
        square.removeChild(square.firstElementChild);
      }
    })
  }

  //Instructions
  instructions() {
    const instructionButton = document.querySelector("#instruction");
    const instructionOverlay = document.querySelector("#instructions-overlay");
    const instructionBox = document.querySelector(".instructions-box");

    instructionButton.addEventListener("click", () => {
      instructionOverlay.style.display = "flex";
    })

    instructionOverlay.addEventListener("click", () => {
      instructionOverlay.style.display = "none";
    })

    instructionBox.addEventListener("click", () => {
      event.stopPropagation();
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const newGame = new Checkers();
});

