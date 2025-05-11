import Block from "./block";

const block1 = new Block(1, "a")
block1.hash  = "aaaa";
block1.index = 100;

console.log(block1.isValid());

