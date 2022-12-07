const { readInput, toInt, solve } = require('../util');
const _ = require('lodash');

const TOTAL_DISK_SPACE = 70000000;
const MIN_UNUSED_SPACE = 30000000;

async function sumOfSmallFolders() {
    const { directorySizeCache } = await parseCommandBatches()

    return _.sum(Object.values(directorySizeCache)
        .filter(value => value <= 100000))
}

async function findSmallestDirectoryToRemove() {
    const { tree, directorySizeCache } = await parseCommandBatches()

    const currentSpace = TOTAL_DISK_SPACE - _.sum(Object.keys(tree)
        .map(key => directorySizeCache[key]))

    return Object.values(directorySizeCache)
        .reduce((prev, size) => {
            if (currentSpace + size >= MIN_UNUSED_SPACE && size <= prev) {
                return size;
            }
            return prev
        }, TOTAL_DISK_SPACE - MIN_UNUSED_SPACE)
}

async function parseCommandBatches() {
    const commandBatches = (await readInput(__dirname, 'input.txt'))
        .split('\n')
        .slice(1)
        .reduce((prev, curr) => {
            if (curr.startsWith('$')) {
                prev.push([])
            }
            prev[prev.length - 1].push(curr)
            return prev
        }, []);

    const tree = {};
    const currentDir = [];
    const directorySizeCache = {};

    commandBatches.forEach(commandBatch => {
        const [command, ...data] = commandBatch;
        if (command.startsWith('$ ls')) {
            data.forEach(output => {
                if (!output.startsWith('dir')) {
                    const [size, fileName] = output.split(' ');
                    const intSize = toInt(size);
                    
                    _.set(tree, [...currentDir, fileName], intSize);

                    const copyDir = _.clone(currentDir);
                    while (copyDir.length) {
                        if (directorySizeCache[copyDir.join('.')]) {
                            directorySizeCache[copyDir.join('.')] += intSize
                        } else {
                            directorySizeCache[copyDir.join('.')] = intSize;
                        }
                        copyDir.pop()
                    }
                }
            });
        }
        if (command.startsWith('$ cd')) {
            const [ , ,dir] = command.split(' ');
            
            if (dir === '..') {
                currentDir.pop(dir);
            } else {
                currentDir.push(dir);
            }
        }
    });

    return { tree, directorySizeCache };
}

solve(
    sumOfSmallFolders(),
    findSmallestDirectoryToRemove()
)