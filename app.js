const container = document.querySelector(".container");
const range = document.getElementById("sizeRange");
const value = document.getElementById("sizeValue");
const startBtn = document.getElementById("startBtn");

range.addEventListener("input", () => value.textContent = range.value);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];

startBtn.addEventListener("click", async () => {
    const size = parseInt(range.value);
    const startRow = Math.floor(Math.random() * size);
    const startCol = Math.floor(Math.random() * size);
    container.innerHTML = "";
    generateGrid(size);
    await generateMaze(startRow, startCol, size, size);
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

function shuffledCopy(array) {
    const a = array.slice();
    let currentIndex = a.length;
    while (currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [a[currentIndex], a[randomIndex]] = [a[randomIndex], a[currentIndex]];
    }
    return a;
}

async function generateMaze(row, col, numRow, numCol, preMarked = false) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!cell) return;

    if (cell.classList.contains("visited") && !preMarked) return;

    cell.classList.add("visited", "current");

    const localDirs = shuffledCopy(dir);

    for (const direction of localDirs) {
        const newRow = row + direction[0];
        const newCol = col + direction[1];

        if (newRow < 0 || newCol < 0 || newRow >= numRow || newCol >= numCol) {
            continue;
        }

        const neighbor = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
        if (!neighbor) continue;

        if (!neighbor.classList.contains("visited")) {
            neighbor.classList.add("visited");
            removeWalls(cell, neighbor, direction);
            await sleep(50);
            await generateMaze(newRow, newCol, numRow, numCol, true);
        }
    }
    cell.classList.remove("current");
    cell.classList.add("finished");
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

