//O(log(n))
exports.generate = n => {
    let arr = []
    for (let i = 1; i < n+1; i++) {
        arr.push(i)
    }
    return arr
}

exports.binarySearch = (arr, num) => {
    let startIndex = 0
    let endIndex = arr.length - 1
    let count = 1

    while (startIndex <= endIndex) {
        let pivot = Math.ceil((startIndex + endIndex) / 2)
        // console.log(arr[pivot])
        console.log(count)
        count += 1

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

// let array = generate(100)
// console.log(binarySearch(array, 0))
