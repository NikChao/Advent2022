const { readInput, solve, toInt } = require('../util');
const _ = require('lodash');

async function getVisibleTrees() {
    const input = await readInput(__dirname, 'input.txt');

    const rows = input.split('\n');

    const grid = rows.map(row => row.split('').map(toInt))

    const trees = [];
    for (const rowNum of _.range(0, grid.length)) {
        const row = grid[rowNum];
        let  currentTallest = -1;

        row.forEach((value, colNum) => {
            if (value <= currentTallest) {
                return;
            }
            
            currentTallest = value;
            const key = `${rowNum}:${colNum}`;
            trees.push(key);
        });

        currentTallest = -1;
        _.reverse(_.clone(row)).forEach((value, invColNum) => {
            const colNum = row.length - 1 - invColNum;
            if (value <= currentTallest) {
                return;
            }
            
            currentTallest = value;
            const key = `${rowNum}:${colNum}`;
            trees.push(key);
        });
    }

    for (let colNum = 0; colNum < grid[0].length; colNum++) {
        const column = grid.map(v => v[colNum])
        let currentTallest = -1;
        column.forEach((value, rowNum) => {
            if (value <= currentTallest) {
                return;
            }

            currentTallest = value;
            const key = `${rowNum}:${colNum}`;
            trees.push(key);
        });

        currentTallest = -1;
        _.reverse(_.clone(column)).forEach((value, invRowNum) => {
            const rowNum = column.length - 1 - invRowNum;            ;
            if (value <= currentTallest) {
                return;
            }
            
            currentTallest = value;
            const key = `${rowNum}:${colNum}`;
            trees.push(key);
        });
    }

    return new Set(trees).size
}

async function getHighestScenicScore() {
    const input = await readInput(__dirname, 'input.txt');
    const rows = input.split('\n');
    const grid = rows.map(row => row.split(''));

    let maxScenicScore = 0;
    for (const row of _.range(0, grid.length - 1)) {
        for (const col of _.range(0, grid.length - 1)) {
            const scenicScore = getScenicScore(row, col, grid);
            maxScenicScore = Math.max(maxScenicScore, scenicScore);
        }
    }

    return maxScenicScore;
}

function getScenicScore(row, col, grid) {
    let [left, right, top, bottom] = [0, 0, 0, 0];


    for (let x = col - 1; x >= 0; x--) {
        left++
        if (grid[row][x] >= grid[row][col]) {
            break
        }
    }

    for (let x = col + 1; x <= (grid.length - 1); x++) {
        right++
        if (grid[row][x] >= grid[row][col]) {
            break
        }
    }

    for (let y = row - 1; y >= 0; y--) {
        top++
        if (grid[y][col] >= grid[row][col]) {
            break
        }
    }

    for (let y = row + 1; y <= (grid.length - 1); y++) {
        bottom++
        if (grid[y][col] >= grid[row][col]) {
            break
        }
    }

    if (row === 3 && col === 2) console.table({ v: grid[row][col], left, right, top, bottom })

    return left * right * top * bottom;
}

solve(
    getVisibleTrees(),
    getHighestScenicScore()
)