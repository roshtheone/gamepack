document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const winnerContainer = document.getElementById('winnerContainer');
    const startGameBtn = document.getElementById('startGameBtn');
    const playerXNameInput = document.getElementById('playerXName');
    const playerONameInput = document.getElementById('playerOName');
    const challengerX = document.getElementById('challengerX');
    const challengerO = document.getElementById('challengerO');
    const challengers = document.querySelector('.challengers');
    const inputNames = document.querySelector('.input-names');
    let gameActive = false;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let playerXScore = 0;
    let playerOScore = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    startGameBtn.addEventListener('click', () => {
        const playerXName = playerXNameInput.value.trim();
        const playerOName = playerONameInput.value.trim();

        if (playerXName && playerOName) {
            challengerX.textContent = playerXName;
            challengerO.textContent = playerOName;
            gameActive = true;
            inputNames.style.display = 'none';
            challengers.style.display = 'flex';
            gameBoard.style.display = 'grid';
            restartBtn.style.display = 'block';
            statusDisplay.innerHTML = `It's ${playerXName}'s turn`;
        } else {
            alert('Please enter names for both players.');
        }
    });

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.style.color = currentPlayer === "X" ? "#f06" : "#4a90e2";
    }

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = `It's ${currentPlayer === "X" ? challengerX.textContent : challengerO.textContent}'s turn`;
    }

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            const winner = currentPlayer === "X" ? challengerX.textContent : challengerO.textContent;
            const loser = currentPlayer === "X" ? challengerO.textContent : challengerX.textContent;
            statusDisplay.innerHTML = `Player ${winner} has won! 🎉`;
            winnerContainer.style.display = 'block';
            winnerContainer.innerHTML = `Congratulations ${winner}! You won! 🎉<br>${loser}, better luck next time! 😢`;
            if (currentPlayer === "X") {
                playerXScore++;
            } else {
                playerOScore++;
            }
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = `Game ended in a draw!`;
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    const handleRestartGame = () => {
        gameActive = false;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = "";
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        winnerContainer.style.display = 'none';
        winnerContainer.innerHTML = "";
        inputNames.style.display = 'flex';
        challengers.style.display = 'none';
        gameBoard

    }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', handleRestartGame);
});
