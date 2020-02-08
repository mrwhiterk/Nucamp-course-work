const rect = require('./rectangle')

function solveRect(l, w) {
  console.log(`Solving for rect with dimensions: ${l}, ${w}`)

  rect(l, w, (err, rectangle) => {
    if (err) {
      console.log('ERROR: ', err.message)
    } else {
      console.log(
        `Area of rectangle with dimensions ${l}, ${w} is: ${rectangle.area()}`
      )
      console.log(
        `Perimeter of rectangle with dimensions ${l}, ${w} is: ${rectangle.perimeter()}`
      )
    }
  })

  console.log('====================================')
}

solveRect(2, 4)
solveRect(3, 5)
solveRect(0, 5)
solveRect(5, -3)

// Code Challenge: Node Modules
// completed glitch link - https://glitch.com/edit/#!/boatneck-ghost-vq28cvu32?path=server.js:7:0

// Code Challenge: Node Modules 2 - with es6 imports
//https://glitch.com/edit/#!/boatneck-ghost-vq28cvu32?path=server.mjs:3:84
