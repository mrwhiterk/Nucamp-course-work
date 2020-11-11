class Dragon {
  constructor(color, maxHP) {
    this.color = color;
    this.maxHP = maxHP;
  }

  roar() {
    console.log(`the ${this.color} dragon roared`);
  }
}

const dragon1 = new Dragon("red", 1200);
dragon1.roar();
console.log(dragon1.maxHP);

const arr = [1, 2, 3];

const result = arr.reduce((cur, next) => cur.concat([next + 1]), []);

console.log(result);
