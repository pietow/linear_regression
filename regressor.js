let fs = require('fs')
const system = require('system-commands')
const stats = require('./stats.js')
const Laboratorium = require('./lab.js')
const testFunctions = require('./testFunctions.js');

class LinearRegression {
    plotFit = {}

    X = []
    Y = []
    fit(X, Y) {
        this.X = X
        this.Y = Y
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

        //RESULTS store in data object plotFit
        this.plotFit = this.X.reduce(
            (a, c, id) => {
                a['x'].push(c)
                a['y'].push(y_fit[id])
                a['m'] = m.toFixed(2)
                a['b'] = b.toFixed(2)
                a['sse'] = SSE
                a['ssto'] = SSTO
                a['r_sq'] = r_square.toFixed(2)
                a['correlation'] = corr.toFixed(2)
                a['correlation2'] = corr ** 2
                return a
            },
            { x: [], y: [] }
        )
        return this.plotFit
    }

    saveAsJSON(str = 'fit.json', data = 'plotFit') {
        fs.writeFile(str, JSON.stringify(this[data]), function (e) {
            if (e) throw e
            console.log(`Data is written to ${str}`)
        })
    }
    show() {
        system('python3 plot.py').then(console.log).catch(console.error)
    }
}

//##############Function to test
const OlogN = testFunctions.binarySearch
const ON = testFunctions.arraySize

//##############Measure time dependent of ArraySize
// const runner = new Laboratorium(OlogN)
const runner = new Laboratorium(ON)
runner.getDataPoints(800, 10)
let [X, Y] = runner.formatData()
// runner.formatData()
// let [X, Y] = runner.transformLog()
runner.saveAsJSON('data.json')

//############LinearRegression#####################
let model = new LinearRegression()
console.log(model.fit(X, Y))
model.saveAsJSON('fit.json')
model.show()


