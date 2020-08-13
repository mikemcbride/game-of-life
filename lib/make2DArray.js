export default function make2DArray(cols, rows) {
    let arr = []
    for (let c = 0; c < cols; c++) {
        arr[c] = []
        for (let r = 0; r < rows; r++) {
            arr[c].push([])
        }
    }
    return arr
}
