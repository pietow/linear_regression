////linear x = O(n)
const linear = n => {
    let arr = []
    for (let i = 0; i < n; i++) {
        arr.push(i)
    }
    return arr
}

class Regression {
    coor = []
    plotlyData = {}
    constructor(callback) {
        this.callback = callback
    }
    linearTest(runs) {
        for (let i = 0; i < runs; i = i + 100) {
            let a1 = performance.now()
            this.callback(i)
            let a2 = performance.now()
            this.coor.push([i, ((a2 - a1) * 1000).toFixed(2)]) // microseconds
        }
        return this.coor
    }
    formatCoors() {
        this.plotlyData = this.coor.reduce(
            (a, b) => {
                a['x'].push(b[0])
                a['y'].push(b[1])
                return a
            },
            { x: [], y: [] }
        )
        this.plotlyData['type'] = 'scatter'
        this.plotlyData['mode'] = 'markers'
        return this.plotlyData
    }
}

const loopExp = new Regression(linear)
let result = loopExp.linearTest(1000)


