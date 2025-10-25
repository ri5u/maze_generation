const container = document.querySelector(".container");

const numRow = 50;
const numCol = 50;

for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numCol; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.classList.add("top-wall", "bottom-wall", "left-wall", "right-wall"); // add all walls initially
        container.appendChild(cell);
    }
}

let dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function generateMaze(startingRow, startingCol) {
    const cell = document.querySelector(`[data-row="${startingRow}"][data-col="${startingCol}"]`);
    if (cell.classList.contains("visited")) return;
    cell.classList.add("visited");
    cell.style.backgroundColor = "pink";
    shuffle(dir);
    for (let idx = 0; idx < 4; idx++) {
        let newRow = startingRow + dir[idx][0];
        let newCol = startingCol + dir[idx][1];
        if (newRow < 0 || newCol < 0 || newRow >= numRow || newCol >= numCol) continue;

        // remove walls between current cell and neighbor
        const neighbor = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
        if(!neighbor.classList.contains("visited")){
            if (dir[idx][0] === -1) { // moving up
                cell.classList.remove("top-wall");
                neighbor.classList.remove("bottom-wall");
            } else if (dir[idx][0] === 1) { // moving down
                cell.classList.remove("bottom-wall");
                neighbor.classList.remove("top-wall");
            } else if (dir[idx][1] === -1) { // moving left
                cell.classList.remove("left-wall");
                neighbor.classList.remove("right-wall");
            } else if (dir[idx][1] === 1) { // moving right
                cell.classList.remove("right-wall");
                neighbor.classList.remove("left-wall");
            }

            generateMaze(newRow, newCol);

        }
    }
    cell.style.backgroundColor = "gray";

}

function shuffle(dirArray) {
    let currentIndex = dirArray.length;
    while (currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [dirArray[currentIndex], dirArray[randomIndex]] = [dirArray[randomIndex], dirArray[currentIndex]];
    }
}

generateMaze(0, 0);

