const game_status = document.querySelector('.status');
let GameActive = true;
let player = 'X';
const turn = `Player ${player} turns`;
const end = 'Game ended. A draw!';
let board = ['', '', '', '', '', '', '', '', ''];
const cells = Array.from(document.querySelectorAll('.cell'));

const playerDisplay = document.querySelector('.display_player');
const textDisplay = document.getElementById('display_text');


const winningConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const valid_action = (cell) => {
    if (cell.innerHTML === 'X' || cell.innerHTML === 'O'){
        return false;
    }
    else{
        return true;
    }
}

const add_turn = (index) => {
    board[index] = player;
}

const change_player = () => {
    player = player === 'X' ? 'O' : 'X';
    playerDisplay.innerHTML = player;
}

function color_active_cell(){
    let target = event.target;
    target.style.backgroundColor = "#FAF2D2"
}


function result() {
    let Won = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            let ind_win_pos = winningConditions[i];

            document.getElementById("cell"+(ind_win_pos[0]+1)).style.backgroundColor = "pink";
            document.getElementById("cell"+(ind_win_pos[1]+1)).style.backgroundColor = "pink";
            document.getElementById("cell"+(ind_win_pos[2]+1)).style.backgroundColor = "pink";
            Won = true;
            document.getElementById("container").classList.add("disable_div");
            textDisplay.style.visibility = "hidden";
            break
        }
    }

    if (Won) {
        game_status.innerHTML = `Player ${player} won!`;
        gameActive = false;
        return;
    }

    let Draw = !board.includes("");
    if (Draw) {
        textDisplay.style.visibility = "hidden";
        game_status.innerHTML = end;

        gameActive = false;
        return;
    }

}
const userAction = (cell, index) => {
    if (valid_action(cell) && GameActive) {
      cell.innerText = player;
      add_turn(index);
      result();
      change_player();
    }
    else{
        return;
    }
};

function restart() {
    let target = event.target;

    textDisplay.style.visibility = "visible";
    document.getElementById("container").classList.remove("disable_div");
    gameActive = true;
    player = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    game_status.innerHTML = "";
    playerDisplay.innerHTML = player;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    cells.forEach((cell) => cell.style.backgroundColor = "white");
}

cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});