const _ = require('lodash');
const { to_int, read_input, solve } = require('../util');

async function find_full_overlaps() {
    const input = await read_input(__dirname);

    const result = input.split('\n')
        .filter(group => {
            const [[as, ae], [bs, be]] = parse_group(group)
            return (as <= bs && ae >= be) || (bs <= as && be >= ae);
        })
        .length

    return result;
}

async function find_partial_overlaps() {
    const input = await read_input(__dirname);

    const result = input.split('\n')
        .filter(group => {
            const [[as, ae], [bs, be]] = parse_group(group)
            return (as <= be && as >= bs) || (bs <= ae && bs >= as);
        })
        .length

    return result;
}

function parse_group(group) {
    return group
        .split(',')
        .map(range => range.split('-').map(to_int));
}

solve(
    find_full_overlaps(),
    find_partial_overlaps()
)