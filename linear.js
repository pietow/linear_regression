const stats = require('./stats.js')
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
    X = []
    plotlyData = {}
    constructor(callback) {
        this.callback = callback
    }
    linearTest(runs, steps) {
        let a1 = 0
        let a2 = 0
        for (let i = 0; i < runs; i = i + steps) {
            for (let j = 0; j < 5; j++) {
                a1 = performance.now()
                this.callback(i)
                a2 = performance.now()
                if (j === 0) this.coor.push([i]) // microseconds
                this.X.push(((a2 - a1) * 1000))
                a1 = 0
                a2 = 0
            }
            this.coor[i/steps].push(this.X)
            this.X = []
        }
        return this.coor
    }

    formatCoors() {
        this.coor = this.coor.map( x => [x[0], stats.mean(x[1]).toFixed(2), stats.stddev(x[1]).toFixed(2)]  )
        this.plotlyData = this.coor.reduce(
            (a, b) => {
                a['x'].push(b[0])
                a['y'].push(b[1])
                a['error_y'].push(b[2])
                return a
            },
            { x: [], y: [], error_y: []}
        )
        this.plotlyData = JSON.stringify(this.plotlyData)
        return this.plotlyData
    }
}

const loopExp = new Regression(linear)
let result = loopExp.linearTest(1000, 100)
// console.log(result)
// console.log(stats.mean([1,2]))
console.log(loopExp.formatCoors())
