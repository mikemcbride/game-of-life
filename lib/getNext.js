import make2DArray from './make2DArray'
import countNeighbors from './countNeighbors'

export default function (opts) {
    let { cols, rows, grid } = opts
    let next = make2DArray(cols, rows)

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j]
            const options = { grid, i, j, cols, rows }
            let neighbors = countNeighbors(options)

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0
            } else {
                next[i][j] = state
            }
        }
    }

    return next
}
