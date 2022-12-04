const fs = require('fs/promises');
const path = require('path');

/**
 * 
 * @param {Set} a 
 * @param {Set} b 
 * @returns {Set} union_set
 */
function union(a, b, c) {
    const a_b = new Set(
        [...a].filter(x => b.has(x))
    );

    if (!c) return a_b;

    return union(a_b, c);
}

function read_input(dir = __dirname, filename = 'input.txt') {
    const file_path = path.join(dir, filename);
    return fs.readFile(file_path, { encoding: 'utf-8'});
}

function to_int(str) {
    return parseInt(str, 10);
}

module.exports = {
    union,
    read_input,
    to_int
}