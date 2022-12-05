const _ = require('lodash');
const { read_input } = require('../util');

async function get_top_crates() {
    const input = await read_input(__dirname, 'input.txt');

    const [raw_crates, raw_instructions] = input.split('\n\n');

    const instructions = raw_instructions.split('\n').map(parse_instructions);
    const crates = parse_crates(raw_crates);

    instructions.forEach(({ n, from, to }) => {
        _.range(0, n).forEach(() => {
            const lifted_crate = crates[from - 1].pop();
            crates[to - 1].push(lifted_crate);
        })
    })

    return crates
        .map(crate => crate[crate.length - 1])
        .join('');
}

async function get_top_crates_9001() {
    const input = await read_input(__dirname, 'input.txt');

    const [raw_crates, raw_instructions] = input.split('\n\n');

    const instructions = raw_instructions.split('\n').map(parse_instructions);
    const crates = parse_crates(raw_crates);

    instructions.forEach(({ n, from, to}) => {
        const lifted = _.range(0, n)
            .map(() => crates[from - 1].pop());
        _.reverse(lifted).forEach(crate => crates[to - 1].push(crate))
    })

    return crates
        .map(crate => crate[crate.length - 1])
        .join('');
}

function parse_instructions(raw_instructions) {
    const template = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;
    const [_, n, from, to] = template.exec(raw_instructions);
    return { n, from, to };
}

function parse_crates(raw_crates) {
    const columns = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    const raw_rows = raw_crates.split('\n');
    const rows = raw_rows
        .slice(0, raw_rows.length - 1)
        .map(row => {
            return columns.map(index => row[index]) 
        });

    const column_crates = columns.map(x => []);
    for (let i = rows.length - 1; i >= 0; i--) {
        columns.forEach((v, j) => {
            if (_.trim(rows[i][j])) {
                column_crates[j].push(rows[i][j])
            }
        })
    }

    return column_crates;
}

get_top_crates().then(console.log);