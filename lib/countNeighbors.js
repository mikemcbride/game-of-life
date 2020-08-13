export default function (opts) {
    let { grid, i, j, cols, rows } = opts
    let sum = 0
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            let col = x + i
            let row = y + j
            const isValidCol = col >= 0 && col < cols
            const isValidRow = row >= 0 && row < rows
            const isSameCell = x === 0 && y === 0
            if (isValidCol && isValidRow && !isSameCell) {
                sum += grid[col][row]
            }
        }
    }
    return sum
}
