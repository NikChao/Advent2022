const { readInput, solve } = require('../util');

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

    async getModeledScore() {
        const input = await readInput(__dirname);
        const result = input.split('\n')
            .map(game => {
                const [them, me ] = game.split(' ');
                return this.getRoundScore(them, me);
            })
            .reduce((prev, curr) => prev + curr, 0);
    
        return result;
    }
    
    getRoundScore(them, me) {
        const opShape = this.LETTER_SHAPES[them];
        const myShape = this.LETTER_SHAPES[me];
    
        const isWin = this.didIWin(opShape, myShape);
        const isDraw = opShape === myShape;
    
        const winScore = isWin ? 6 : isDraw ? 3 : 0;
        const shapeScore = SHAPE_SCORES[myShape];
    
        return winScore + shapeScore;
    }
    
    didIWin(them, me) {
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

    async getModeledScore() {
        const input = await readInput(__dirname);
        const result = input.split('\n')
            .map(game => {
                const [them, result ] = game.split(' ');
                const myShape = this.getMyShape(them, result);

                const winScore = this.LETTER_WIN_LOSS_DRAW[result];
                const shapeScore = SHAPE_SCORES[myShape];
                
                return winScore + shapeScore;
            })
            .reduce((prev, curr) => prev + curr, 0);
    
        return result;
    }

    getMyShape(them, result) {
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

solve(
    new PartOne().getModeledScore(),
    new PartTwo().getModeledScore(),
)