exports.mean = arr => arr.reduce( (a,b) => a + b  ) / arr.length 

exports.stddev = arr => {
    let mu = exports.mean(arr) 
    return Math.sqrt(arr.reduce( (a, b) => {
        a = a + (b - mu) ** 2
        return a
    }, 0) / (arr.length - 1))
}

// console.log(exports.stddev([1,2,1]))

