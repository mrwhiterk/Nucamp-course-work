// const rect = {
//   perimeter: (x, y) => {
//     return 2 * (x + y)
//   },
//   area: (x, y) => {
//     return x * y
//   }
// }

const rect = require('./rectangle')

function solveRect(l, w) {
  console.log(`Solving for rect with dimensions: ${l}, ${w}`)

  if (l <= 0 || w <= 0) {
    console.log(`rect dimens must be > 0. received: ${l}, ${w}`)
  } else {
    console.log(`Area of rect: ${rect.area(l, w)}`)
    console.log(`Perimeter of rect: ${rect.perimeter(l, w)}`)
  }
}

solveRect(2, 4)
solveRect(3, 5)
solveRect(0, 5)
solveRect(5, -3)
