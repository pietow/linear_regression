exports.arraySize = n => {
    let arr = []
    for (let i = 1; i < n+1; i++) {
        arr.push(i)
    }
    return arr
}

//O(log(N))
exports.binarySearch = (arr, num) => {
    let startIndex = 0
    let endIndex = arr.length - 1
    let count = 1

    while (startIndex <= endIndex) {
        let pivot = Math.ceil((startIndex + endIndex) / 2)
        count += 1
        // console.log(count)

        if (arr[pivot] === num) {
            return `Found ${num} at ${pivot}`
        } else if (arr[pivot] < num) {
            startIndex = pivot + 1
        } else {
            endIndex = pivot - 1
        }
    }
    return false
}

//O(N)
exports.forN = (arr, num) => {
    for (e in arr) {
    }
}

let arr = exports.arraySize(100, 0)
exports.binarySearch(arr, 0)
exports.forN(arr)
