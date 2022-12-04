const _ = require('lodash');
const { union, read_input } = require('../util')

const alphabet = 
    [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
    ];

async function get_total_priority() {
    const input = await read_input(__dirname);
    const total_priority = input.split('\n')
        .map(rucksack => {
            return _.chunk(
                rucksack,
                 rucksack.length / 2)
            .map(section => new Set(section));
        })
        .map(([a, b]) => {
            let max = 0;
            union(a, b).forEach(entry => {
                max = Math.max(get_letter_score(entry), max);
            });

            return max
        })
        .reduce((prev, curr) => prev + curr, 0);
    console.log(total_priority);
}

async function get_total_badge_priority() {
    const input = await read_input(__dirname)
    const rucksacks = input.split('\n').map(rucksack => new Set(rucksack));
    const groups = _.chunk(rucksacks, 3);

    const total_badge_priority = groups.map(([a, b, c]) => {
        const a_b_c = [...union(a, b, c)];
        return get_letter_score(a_b_c[0]);
    })
    .reduce((prev, curr) => prev + curr, 0);

    console.log(total_badge_priority)
}

function get_letter_score(letter) {
    return alphabet.indexOf(letter) + 1;
}
