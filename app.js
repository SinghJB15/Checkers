document.addEventListener("DOMContentLoaded", () => {
    renderBoard();
    renderDarkAndLightSquares();
    renderCheckerPeices();
})

const renderBoard = () => {
    const board = document.querySelector("#board");

    //Loop for each row
    for(let i = 0; i < 8; i++) {
        //Loop for each column in a row
        for(let j = 0; j < 8; j++) {
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


const renderCheckerPeices = () => {
    //Select board with child elements that have the class "sqaure"
    const squares = document.querySelectorAll("#board .square");

    squares.forEach((square) => {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        //Check if is the square is a dark square
        if((row + col) % 2 === 0) {
            //Place player 1 peices
            if(row < 3) {
                const peice = document.createElement("div");
                peice.classList.add("peice", "player1");
                square.appendChild(peice);
            } else if(row > 4) {
                const peice = document.createElement("div");
                peice.classList.add("peice", "player2");
                square.appendChild(peice);
            }
        } 
    })
}


const renderDarkAndLightSquares = () => {
    const squares = document.querySelectorAll("#board .square");
    squares.forEach((square) => {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        
        //Change square to dark
        if((row + col) % 2 === 0) {
            square.classList.add("dark");
        } else {
            square.classList.add("light");
        }
    })
}