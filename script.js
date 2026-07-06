
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let startBtn = document.querySelector(".startBtn");
let resetBtn = document.querySelector(".resetBtn");
let message = document.querySelector(".message");
let boxes = document.querySelectorAll(".box");


let player1 = "";
let player2 = "";
let turnX = true;
let gameStarted = false;
let moveCount = 0;



startBtn.addEventListener("click", () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";

    turnX = true;
    gameStarted = true;
    moveCount = 0;

    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });

    updateTurnMessage();
});


const updateTurnMessage = () => {
    if (!gameStarted) return;

    let currentPlayer = turnX ? player1 : player2;
    message.innerText = `${currentPlayer}'s turn`;
    message.classList.remove("hide");
};


boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!gameStarted || box.innerText !== "") return;

        box.innerText = turnX ? "X" : "O";
        box.disabled = true;

        moveCount++;
        turnX = !turnX;

        checkWinner();
        updateTurnMessage();
    });
});


const showWinner = (symbol) => {
    let winnerName = symbol === "X" ? player1 : player2;
    message.innerText = `🎉 ${winnerName} wins!`;
    message.classList.remove("hide");

    gameStarted = false;
    boxes.forEach(box => box.disabled = true);
};


const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a && a === b && b === c) {
            showWinner(a);
            return;
        }
    }

    
    if (moveCount === 9) {
        message.innerText = "🤝 It's a Draw!";
        message.classList.remove("hide");

        setTimeout(resetGame, 1500);
    }
};


const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });

    turnX = true;
    moveCount = 0;
    gameStarted = true;

    updateTurnMessage();
};


resetBtn.addEventListener("click", resetGame);

