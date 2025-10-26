const container = document.querySelector(".container");
const range = document.getElementById("sizeRange");
const value = document.getElementById("sizeValue");
const startBtn = document.getElementById("startBtn");

range.addEventListener("input", () => value.textContent = range.value);

startBtn.addEventListener("click", () => {
    const size = parseInt(range.value);
    container.innerHTML = "";
    generateGrid(size);
    generateMaze(0, 0, size, size);
});

function generateGrid(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", "top-wall", "bottom-wall", "left-wall", "right-wall");
            cell.dataset.row = i;
            cell.dataset.col = j;
            container.appendChild(cell);
        }
    }
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

let dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function generateMaze(row, col, numRow, numCol) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!cell || cell.classList.contains("visited")) return;

    cell.classList.add("visited");
    cell.style.backgroundColor = "pink";

    shuffle(dir);

    let idx = 0;

    function visitNext() {
        if (idx >= 4) {
            cell.style.backgroundColor = "gray"; // finished this cell
            return;
        }

        const newRow = row + dir[idx][0];
        const newCol = col + dir[idx][1];
        idx++;

        if (newRow < 0 || newCol < 0 || newRow >= numRow || newCol >= numCol) {
            setTimeout(visitNext, 20); // schedule next direction
            return;
        }

        const neighbor = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
        if (!neighbor.classList.contains("visited")) {
            removeWalls(cell, neighbor, dir[idx - 1]);
            setTimeout(() => generateMaze(newRow, newCol, numRow, numCol), 50);
        }

        setTimeout(visitNext, 50); // schedule next direction
    }

    visitNext();
}



function removeWalls(cell, neighbor, direction) {
    if (direction[0] === -1) { // up
        cell.classList.remove("top-wall");
        neighbor.classList.remove("bottom-wall");
    } else if (direction[0] === 1) { // down
        cell.classList.remove("bottom-wall");
        neighbor.classList.remove("top-wall");
    } else if (direction[1] === -1) { // left
        cell.classList.remove("left-wall");
        neighbor.classList.remove("right-wall");
    } else if (direction[1] === 1) { // right
        cell.classList.remove("right-wall");
        neighbor.classList.remove("left-wall");
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

// initialize default
// generateGrid(50);
// generateMaze(0, 0, 50, 50);

startBtn.addEventListener("click", () => {
    const size = parseInt(range.value);
    container.innerHTML = "";
    generateGrid(size);
    generateMaze(0, 0, size, size); // await to animate properly
});


