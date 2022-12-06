const { readInput, solve } = require('../util');
const _ = require('lodash');

async function timeToStartBuffer() {
    return findEndOfBuffer(await readInput(__dirname), 4);
}

async function timeToStartMessageMarker() {
    return findEndOfBuffer(await readInput(__dirname), 14);
}

function findEndOfBuffer(input, bufferSize) {
    let endOfBuffer = 0;
    _.range(0, input.length)
        .forEach(index => {
            if (!endOfBuffer && index >= (bufferSize - 1)) {
                const lastN = new Set(_.range(0, bufferSize).map(i =>
                    input[index - i]));

                if (lastN.size === bufferSize) {
                    endOfBuffer = index;
                }
            }
        });

    return endOfBuffer + 1;
}

solve(
    timeToStartBuffer(),
    timeToStartMessageMarker()
)