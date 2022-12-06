const _ = require('lodash');
const { union, solve, readInput } = require('../util')

const alphabet = 
    [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
    ];

async function getTotalPriority() {
    const input = await readInput(__dirname);
    return input.split('\n')
        .map(rucksack => {
            return _.chunk(
                rucksack,
                 rucksack.length / 2)
            .map(section => new Set(section));
        })
        .map(([a, b]) => {
            let max = 0;
            union(a, b).forEach(entry => {
                max = Math.max(getLetterScore(entry), max);
            });

            return max
        })
        .reduce((prev, curr) => prev + curr, 0);
}

async function getTotalBadgePriority() {
    const input = await readInput(__dirname)
    const rucksacks = input.split('\n').map(rucksack => new Set(rucksack));
    const groups = _.chunk(rucksacks, 3);

    return groups.map(([a, b, c]) => {
        const a_b_c = [...union(a, b, c)];
        return getLetterScore(a_b_c[0]);
    })
    .reduce((prev, curr) => prev + curr, 0);
}

function getLetterScore(letter) {
    return alphabet.indexOf(letter) + 1;
}

solve(getTotalPriority(), getTotalBadgePriority())