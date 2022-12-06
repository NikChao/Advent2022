const _ = require('lodash');
const { toInt, readInput, solve } = require('../util');

async function findFullOverlaps() {
    const input = await readInput(__dirname);

    const result = input.split('\n')
        .filter(group => {
            const [[as, ae], [bs, be]] = parseGroup(group)
            return (as <= bs && ae >= be) || (bs <= as && be >= ae);
        })
        .length

    return result;
}

async function findPartialOverlaps() {
    const input = await readInput(__dirname);

    const result = input.split('\n')
        .filter(group => {
            const [[as, ae], [bs, be]] = parseGroup(group)
            return (as <= be && as >= bs) || (bs <= ae && bs >= as);
        })
        .length

    return result;
}

function parseGroup(group) {
    return group
        .split(',')
        .map(range => range.split('-').map(toInt));
}

solve(
    findFullOverlaps(),
    findPartialOverlaps()
)