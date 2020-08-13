import make2DArray from './lib/make2DArray'
import draw from './lib/draw'
import getNext from './lib/getNext'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.strokeStyle = 'black'

// make our canvas 90% of the lesser of the window height/width
// for the height, we subtract an extra 40px to allow for the game controls to fit
const canvasSize = Math.floor(Math.min(window.innerHeight - 40, window.innerWidth) * .9)
canvas.setAttribute('height', canvasSize)
canvas.setAttribute('width', canvasSize)

// set up variables
// global variable to allow stopping the game mid-play
const resolution = 10 // 10px per square
const colRowCount = Math.floor(canvasSize / resolution) // need an even number for count of columns/rows
let cols = colRowCount
let rows = colRowCount
let grid = make2DArray(cols, rows)
window.GAME_IS_STOPPED = null
window.GAME_BOARD = [...grid]
const playButton = document.getElementById('play')
const resetButton = document.getElementById('reset')

setupGame({ grid, cols, rows, resolution, ctx })

playButton.addEventListener('click', () => {
    if (window.GAME_IS_STOPPED === false) {
        window.GAME_IS_STOPPED = true
        playButton.innerText = 'Resume'
    } else {
        window.GAME_IS_STOPPED = false
        playButton.innerText = 'Stop'
        play({ grid: window.GAME_BOARD, cols, rows, resolution, ctx })
    }
})
resetButton.addEventListener('click', () => {
    window.GAME_IS_STOPPED = null
    playButton.innerText = 'Play'
    setupGame({ grid, cols, rows, resolution, ctx })
})


function setupGame(opts) {
    for (let i = 0; i < opts.cols; i++) {
        for (let j = 0; j < opts.rows; j++) {
            opts.grid[i][j] = Math.random() < .1 ? 1 : 0
        }
    }
    // draw initial grid
    draw(opts)
}

function play(opts) {
    let next = getNext(opts)
    let strGrid = JSON.stringify(opts.grid)
    let strNext = JSON.stringify(next)
    const didChange = strGrid !== strNext
    if (didChange && window.GAME_IS_STOPPED === false) {
        setTimeout(() => {
            opts.grid = next
            window.GAME_BOARD = next
            draw(opts)
            play(opts)
        }, 100)
    }
}
