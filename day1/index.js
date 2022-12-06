const { solve, readInput } = require('../util');

async function mostCalories() {
    return (await getAllElveTotalCalories())
        .reduce((prev, curr) => Math.max(prev, curr), 0);
}

async function topThreeElveCalories() {
    return (await getAllElveTotalCalories())
        .reduce((top3, current) => top3
            .concat(current)
            .sort((a, b) => b - a)
            .slice(0, 3), [0, 0, 0])
        .reduce((prev, curr) => prev + curr, 0);
}

async function getAllElveTotalCalories() {
    const input = await readInput(__dirname);
    
    return input
        .split('\n\n')
        .map(packet => packet.split('\n').map(cal_str => parseInt(cal_str, 10)))
        .map(calories => calories.reduce((prev, curr) => prev + curr, 0))
}

solve(
    mostCalories(),
    topThreeElveCalories()
)