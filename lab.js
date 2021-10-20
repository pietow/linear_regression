let fs = require('fs')
const system = require('system-commands')
const testFunctions = require('./testFunctions.js')
const stats = require('./stats.js')

module.exports = class Laboratorium {
    rawData = []
    plotData = {}
    X = []
    Y = []
    constructor(callback) {
	this.callback = callback
    }
    getDataPoints(runs, steps) {
        let X = []
        let testArr = []
        let a1 = 0
        let a2 = 0
        for (let i = 0; i < runs; i = i + steps) {
            testArr = testFunctions.arraySize(i)
            for (let j = 0; j < 10; j++) {
                a1 = performance.now()
                this.callback(testArr, 0)
                a2 = performance.now()
                if (j === 0) this.rawData.push([i]) // microseconds
                X.push((a2 - a1) * 1000)
                a1 = 0
                a2 = 0
            }
            this.rawData[i / steps].push(X)
            X = []
        }
        this.rawData.shift()
        this.rawData.shift()
        return this.rawData
    }
    formatData() {
        this.plotData = {}
        this.rawData = this.rawData.map(x => [x[0], x[1].filter((y, id, arr) => y < Math.max(...arr))]) //filter out the biggest outlier
        // console.log(this.rawData)
        this.rawData = this.rawData.map(x => [
            x[0],
            parseFloat(stats.mean(x[1]).toFixed(2)),
            parseFloat(stats.stddev(x[1]).toFixed(2)),
        ])
        this.plotData = this.rawData.reduce(
            (a, b) => {
                a['x'].push(b[0])
                a['y'].push(b[1])
                a['error_y'].push(b[2])
                return a
            },
            { x: [], y: [], error_y: [] }
        )
        return [this.plotData.x, this.plotData.y]
    }
    saveAsJSON(str = 'data.json', data = 'plotData') {
        fs.writeFile(str, JSON.stringify(this[data]), function (e) {
            if (e) throw e
            console.log(`Data is written to ${str}`)
        })
    }
    transformLog(){
        // this.plotData.x = this.plotData.x.map(t => Math.log2(t))
        this.plotData.y = this.plotData.y.map(y => Math.sqrt(Math.pow(y, 2)))
        return [this.plotData.x, this.plotData.y]
    }
    show() {
        system('python3 plot.py').then(console.log).catch(console.error)
    }
}

