const fs = require('fs/promises');
const path = require('path');

const SHAPE_SCORES = {
    ROCK: 1,
    PAPER: 2,
    SCIZZORS: 3
};

class PartOne {
    LETTER_SHAPES = {
        // ME
        X: 'ROCK',
        Y: 'PAPER',
        Z: 'SCIZZORS',
    
        // OP
        A: 'ROCK',
        B: 'PAPER',
        C: 'SCIZZORS',
    }

    async get_modeled_score() {
        const input = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
        const result = input.split('\n')
            .map(game => {
                const [them, me ] = game.split(' ');
                return this.get_round_score(them, me);
            })
            .reduce((prev, curr) => prev + curr, 0);
    
        console.log(result);
    
        return result;
    }
    
    get_round_score(them, me) {
        const op_shape = this.LETTER_SHAPES[them];
        const my_shape = this.LETTER_SHAPES[me];
    
        const is_win = this.did_i_win(op_shape, my_shape);
        const is_draw = op_shape === my_shape;
    
        const win_score = is_win ? 6 : is_draw ? 3 : 0;
        const shape_score = SHAPE_SCORES[my_shape];
    
        return win_score + shape_score;
    }
    
    did_i_win(them, me) {
        return (them === 'ROCK' && me === 'PAPER') ||
         (them === 'PAPER' && me === 'SCIZZORS') ||
         (them === 'SCIZZORS' && me === 'ROCK'); 
    }
}

class PartTwo {
    LETTER_WIN_LOSS_DRAW = {
        X: 0, // LOSS
        Y: 3, // DRAW
        Z: 6, // WIN
    }

    async get_modeled_score() {
        const input = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
        const result = input.split('\n')
            .map(game => {
                const [them, result ] = game.split(' ');
                const my_shape = this.get_my_shape(them, result);

                const win_score = this.LETTER_WIN_LOSS_DRAW[result];
                const shape_score = SHAPE_SCORES[my_shape];
                
                return win_score + shape_score;
            })
            .reduce((prev, curr) => prev + curr, 0);
    
        console.log(result);
    
        return result;
    }

    get_my_shape(them, result) {
        if (them === 'A') {
            return {
                X: 'SCIZZORS',
                Y: 'ROCK',
                Z: 'PAPER'
            }[result]
        }

        if (them === 'B') {
            return {
                X: 'ROCK',
                Y: 'PAPER',
                Z: 'SCIZZORS'
            }[result]
        }

        if (them === 'C') {
            return {
                X: 'PAPER',
                Y: 'SCIZZORS',
                Z: 'ROCK'
            }[result]
        }
    }
}
