let fs = require('fs')
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
    plotlyData = {}
    plotlyFit = {}

    X = []
    Y = []
    // Y_mess = []
    // Y_i = []
    // residuals = []
    // r_sq = 0
    constructor(callback) {
        this.callback = callback
    }
    SSR() {
        /* SSR = sum of residuals */
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
        let SSE = null
        // ####################TOTAL SUM OF SQUARES ####################
        let SSTO = null
        this.plotlyFit = this.X.reduce( (a,c, id) => {
            a['x'].push(c)
            a['y'].push(y_fit[id])
            a['m'] = m
            a['b'] = b
            return a
        }, {x:[], y:[]}  )
        return this.plotlyFit
    }

    // linearFit(fit_intercept=true) {
    //     this.X = this.plotlyData.x
    //     this.Y = this.plotlyData.y

    //     let m = 0.01
    //     let n = 0
    //     this.Y_i = this.X.map( x => m * x + n    )
    //     this.residuals = this.Y.map( (Y, ind) => (Y - this.Y_i[ind]) ** 2)
    //     console.log(this.Y)
    //     console.log(this.Y_i)
    //     console.log(this.residuals)
    //     this.plotlyFit = this.X.reduce( (a,b, ind) => {
    //         a['x'].push(b)
    //         a['y'].push(this.Y_i[ind])
    //         return a
    //     }  , {x:[], y:[]} )
    // }
    saveAsJSON(str = 'data.json', data = 'plotlyData') {
        fs.writeFile(str, JSON.stringify(this[data]), function (e) {
            if (e) throw e
            console.log(`Data is written to ${str}`)
        })
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
            },{ x: [], y: [], error_y: [] }
        )
        return this.plotlyData
    }
}

const loopExp = new Regression(linear)
let result = loopExp.linearTest(1000, 100)
loopExp.formatCoors()
console.log(loopExp.SSR())
// loopExp.linearFit()

// loopExp.saveAsJSON('fit.json', 'plotlyFit')
