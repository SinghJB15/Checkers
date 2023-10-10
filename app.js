document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector("#board");

    //Loop for each row
    for(let i = 0; i < 8; i++) {
        //Loop for each coloum in a row
        for(let j = 0; j < 8; j++) {
            const square = document.createElement("div");
            //Assigning classes and data attributes 
            square.classList.add("square");
            square.dataset.row = i;
            square.dataset.col = j;

            //Adding the square to the board
            board.appendChild(square);
        }
    }
    console.log(board);
})