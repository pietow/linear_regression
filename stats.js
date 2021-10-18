const sum = (x, y) => x + y
const square = x => x * x

exports.mean = arr => arr.reduce(sum) / arr.length

// exports.stddev = arr => {
//     let mu = exports.mean(arr)
//     return Math.sqrt(
//         arr.reduce((a, b) => {
//             a = a + (b - mu) ** 2
//             return a
//         }, 0) /
//             (arr.length - 1)
//     )
// }
exports.variance = arr => {
    let m = exports.mean(arr)
    return (
        arr
            .map(x => x - m)
            .map(square)
            .reduce(sum) /
        (arr.length - 1)
    )
}

exports.stddev = arr => {
    return Math.sqrt(exports.variance(arr))
}

//Covariance
exports.cov = (arr_x, arr_y) => {
    let X_m = exports.mean(arr_x)
    let Y_m = exports.mean(arr_y)
    return arr_x.map((x,id) => (x - X_m) * (arr_y[id] - Y_m)).reduce(sum) / (arr_x.length - 1)
}

// console.log(exports.stddev([1,2,1]))
