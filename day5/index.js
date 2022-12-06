const _ = require('lodash');
const { readInput, solve } = require('../util');

async function getTopCrates() {
    const input = await readInput(__dirname, 'input.txt');

    const [rawCrates, rawInstructions] = input.split('\n\n');

    const instructions = rawInstructions.split('\n').map(parseInstructions);
    const crates = parseCrates(rawCrates);

    instructions.forEach(({ n, from, to }) => {
        _.range(0, n).forEach(() => {
            const liftedCrate = crates[from - 1].pop();
            crates[to - 1].push(liftedCrate);
        })
    })

    return crates
        .map(crate => crate[crate.length - 1])
        .join('');
}

async function getTopCrates9001() {
    const input = await readInput(__dirname, 'input.txt');

    const [rawCrates, rawInstructions] = input.split('\n\n');

    const instructions = rawInstructions.split('\n').map(parseInstructions);
    const crates = parseCrates(rawCrates);

    instructions.forEach(({ n, from, to}) => {
        const lifted = _.range(0, n)
            .map(() => crates[from - 1].pop());
        _.reverse(lifted).forEach(crate => crates[to - 1].push(crate))
    })

    return crates
        .map(crate => crate[crate.length - 1])
        .join('');
}

function parseInstructions(rawInstructions) {
    const template = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
    const [_, n, from, to] = template.exec(rawInstructions);
    return { n, from, to };
}

function parseCrates(rawCrates) {
    const columns = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    const rawRows = rawCrates.split('\n');
    const rows = rawRows
        .slice(0, rawRows.length - 1)
        .map(row => {
            return columns.map(index => row[index]) 
        });

    const columnCrates = columns.map(x => []);
    for (let i = rows.length - 1; i >= 0; i--) {
        columns.forEach((v, j) => {
            if (_.trim(rows[i][j])) {
                columnCrates[j].push(rows[i][j])
            }
        })
    }

    return columnCrates;
}

solve(
    getTopCrates(),
    getTopCrates9001(),
)