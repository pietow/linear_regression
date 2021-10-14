const url = new URL("http://localhost:3000")

fetch(url, {mode: "no-cors"})
  .then(response => response.text())
  .then(result => console.log(result));
// fetch(url, {mode: "no-cors"})
//   .then(response => response.json())
//   .then(data => console.log(data));


let xArray = [50,60,70,80,90,100,110,120,130,140,150];
let yArray = [7,8,8,9,9,9,10,11,14,14,15];

// // Define Data
// let trace1 = {
//   x: [1, 2, 3, 4],
//   y: [10, 15, 13, 17],
//     // error_y: {
//     //   type: 'data',
//     //   array: [1, 2, 3],
//     //   visible: true
//     // },
//     type: 'scatter',
//     mode: 'markers'
// };


// let trace1 = result

let trace2 = {
  x: [1, 2, 3, 4],
  y: [16, 5, 11, 9],
  type: 'scatter'
};

let data = [trace2];
// let data = [trace1, trace2];

Plotly.newPlot('myPlot', data);


// let data = [trace1, trace2];

// // Define Layout
// let layout = {
//   xaxis: {range: [40, 160], title: "Square Meters"},
//   yaxis: {range: [5, 16], title: "Price in Millions"},  
//   title: "House Prices vs. Size"
// };

// // Display using Plotly
// Plotly.newPlot("myPlot", data, layout);
