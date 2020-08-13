export default function draw(opts) {
    let { grid, cols, rows, resolution, ctx } = opts

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution
            let y = j * resolution
            if (grid[i][j] == 1) {
                ctx.fillRect(x, y, resolution, resolution)
            } else {
                ctx.clearRect(x, y, resolution, resolution)
            }
            ctx.strokeRect(x, y, resolution, resolution)
        }
    }
}
