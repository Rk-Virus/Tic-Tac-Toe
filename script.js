const cells = document.getElementsByClassName('cell');
const resetBtn = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 0; // 0 for Player 1, 1 for Player 2

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


for(let cell of cells) {
    cell.addEventListener('click', () => {
        play(cell);
        checkWinner();
    });
};

//play function
const play = (cell) =>{
    if (cell.textContent === '') {
            cell.textContent = currentPlayer === 0 ? 'X' : 'O';
            currentPlayer = 1 - currentPlayer; // Switch player
            message.textContent = `Player ${currentPlayer === 0 ? 'X' : 'O'}'s turn`;
        }
}

// Check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            message.textContent = `Player ${cells[a].textContent} wins!`;
            for (let index of pattern) {
                cells[index].style.backgroundColor = '#90EE90'; // Highlight winning cells
            }
            // Disable further clicks
            for (let cell of cells) {
                cell.disabled = true;
            }
            return;
        }
    }
    if ([...cells].every(cell => cell.textContent)) {
        message.textContent = "It's a draw!";
    }
}

// Reset the game
resetBtn.addEventListener('click', () => {
    for(let cell of cells) {
        cell.textContent = '';
        cell.style.backgroundColor = '';
        cell.disabled = false;
    }
    currentPlayer = 0; // Reset to Player X
    message.textContent = "Player X's turn";
});