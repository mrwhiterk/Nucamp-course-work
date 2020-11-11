// class Dragon {
//   constructor(color, maxHP) {
//     this.color = color;
//     this.maxHP = maxHP;
//   }

//   roar() {
//     console.log(`the ${this.color} dragon roared`);
//   }
// }

// const dragon1 = new Dragon("red", 1200);
// dragon1.roar();
// console.log(dragon1.maxHP);

const arr = [1, 2, 3];

const result = arr.reduce((cur, next) => cur.concat([next + 1]), []);

console.log(result);

let objs = [{ cost: 1 }, { cost: 2 }, { cost: 3 }];

const factors = objs.reduce((acc, cur) => (+acc || acc.cost) + cur.cost);

console.log(factors);
