const { read_input, solve } = require('../util');
const _ = require('lodash');

async function time_to_start_buffer() {
    return find_end_of_buffer(await read_input(__dirname), 4);
}

async function time_to_start_message_marker() {
    return find_end_of_buffer(await read_input(__dirname), 14);
}

function find_end_of_buffer(input, buffer_size) {
    let end_of_buffer = 0;
    _.range(0, input.length)
        .forEach(index => {
            if (!end_of_buffer && index >= (buffer_size - 1)) {
                const last_n = new Set(_.range(0, buffer_size).map(i =>
                    input[index - i]));

                if (last_n.size === buffer_size) {
                    end_of_buffer = index;
                }
            }
        });

    return end_of_buffer + 1;
}

solve(
    time_to_start_buffer(),
    time_to_start_message_marker()
)