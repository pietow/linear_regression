let fs = require('fs')
const system = require('system-commands')
const stats = require('./stats.js')
const logExpriment = require('./logn.js')

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
    plotlyFit = {}

    X = []
    Y = []
    constructor(callback) {
        this.callback = callback
    }
    SSR() {
        this.X = this.plotlyData.x
        this.Y = this.plotlyData.y
        let avgX = stats.mean(this.X)
        let avgY = stats.mean(this.Y)
        let avgXY = stats.mean(this.X.map((X, id) => X * this.Y[id]))
        let avgXsquare = stats.mean(this.X.map(x => x ** 2))

        //############SLOPE AND INTERCEPT##############################
        let m = (avgX * avgY - avgXY) / (avgX ** 2 - avgXsquare)
        let b = avgY - m * avgX

        // ####################REGRESSION LINE#########################
        let y_fit = this.X.map(x => m * x + b)

        // ####################ERROR SUM OF SQUARES ####################
        let SSE = this.Y.map((Y, id) => (Y - y_fit[id]) ** 2).reduce(
            (a, c) => a + c
        )
        // ####################TOTAL SUM OF SQUARES ####################
        let SSTO = this.Y.map(Y => (Y - avgY) ** 2).reduce(
            (a, c) => a + c
        )
        // ####################R^2######################################
        let r_square = 1 - SSE / SSTO //r^2 === corr^2

        // ####################Correlation######################################
        let corr = stats.cov(y_fit, this.Y) / Math.sqrt(stats.variance(y_fit) * stats.variance(this.Y))

        //RESULTS store in data object plotlyFit
        this.plotlyFit = this.X.reduce(
            (a, c, id) => {
                a['x'].push(c)
                a['y'].push(y_fit[id])
                a['m'] = m
                a['b'] = b
                a['sse'] = SSE
                a['ssto'] = SSTO
                a['r_sq'] = r_square
                a['correlation'] = corr
                a['correlation2'] = corr ** 2
                return a
            },
            { x: [], y: [] }
        )
        return this.plotlyFit
    }

    saveAsJSON(str = 'data.json', data = 'plotlyData') {
        fs.writeFile(str, JSON.stringify(this[data]), function (e) {
            if (e) throw e
            console.log(`Data is written to ${str}`)
        })
    }
    logTest(runs, steps) {
        this.coors = []
        let X = []
        let a1 = 0
        let a2 = 0
        for (let i = 0; i < runs; i = i + steps) {
            for (let j = 0; j < 5; j++) {
                arr = logExpriment.generate(i) 
                console.log(arr)
                a1 = performance.now()
                // this.callback(i)
                a2 = performance.now()
                if (j === 0) this.coor.push([i]) // microseconds
                X.push((a2 - a1) * 1000)
                a1 = 0
                a2 = 0
            }
            this.coor[i / steps].push(X)
            X = []
        }
        return this.coor
    }

    linearTest(runs, steps) {
        this.coors = []
        let X = []
        let a1 = 0
        let a2 = 0
        for (let i = 0; i < runs; i = i + steps) {
            for (let j = 0; j < 5; j++) {
                a1 = performance.now()
                this.callback(i)
                a2 = performance.now()
                if (j === 0) this.coor.push([i]) // microseconds
                X.push((a2 - a1) * 1000)
                a1 = 0
                a2 = 0
            }
            this.coor[i / steps].push(X)
            X = []
        }
        return this.coor
    }
    formatCoors() {
        this.plotlyData = {}
        this.coor = this.coor.map(x => [
            x[0],
            parseFloat(stats.mean(x[1]).toFixed(2)),
            parseFloat(stats.stddev(x[1]).toFixed(2)),
        ])
        this.plotlyData = this.coor.reduce(
            (a, b) => {
                a['x'].push(b[0])
                a['y'].push(b[1])
                a['error_y'].push(b[2])
                return a
            },
            { x: [], y: [], error_y: [] }
        )
        return this.plotlyData
    }
}

const loopExp = new Regression(linear)
let result = loopExp.linearTest(1000, 100)
loopExp.formatCoors()


// console.log(loopExp.SSR())

// loopExp.saveAsJSON('fit.json', 'plotlyFit')
// loopExp.saveAsJSON('data.json')
// system('python3 plot.py').then(console.log).catch(console.error)
