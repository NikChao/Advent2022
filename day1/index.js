const fs = require('fs/promises');
const path = require('path');

async function most_calories() {
    const result = (await get_all_elve_total_calories())
        .reduce((prev, curr) => Math.max(prev, curr), 0);

    console.log(result);

    return result;
}

async function top_three_elve_calories() {
    const result = (await get_all_elve_total_calories())
        .reduce((top_3, current) => top_3
            .concat(current)
            .sort((a, b) => b - a)
            .slice(0, 3), [0, 0, 0])
        .reduce((prev, curr) => prev + curr, 0);

    console.log(result);

    return result;
}

async function get_all_elve_total_calories() {
    const input_path = path.join(__dirname, 'input.txt');
    const input = await fs.readFile(input_path, { encoding: 'utf-8' })
    
    return input
        .split('\n\n')
        .map(packet => packet.split('\n').map(cal_str => parseInt(cal_str, 10)))
        .map(calories => calories.reduce((prev, curr) => prev + curr, 0))
}
