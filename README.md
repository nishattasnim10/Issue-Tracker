1️⃣ var, let, and const -
They are used to create variables to store data.
** var: It is the older way to declare variables. It can be re-declared and is accessible globally or within a function, which sometimes causes bugs.
** let: The modern way to store data that might change later.But it cannot be re-declare in the same scope.
** const: Short for "constant".It is used when the value should never change.

2️⃣ spread operator (...) -
** It is used to expand or copy values from an array or object. It is commonly used to copy data or combine arrays. For example-
const numbers = [1,2,3];
const newNumbers = [...numbers,4,5]; 
output: [1,2,3,4,5]

3️⃣ map(), filter(), and forEach() -
** map(): It checks every item in a list then modifies it, and creates a new list with the changed items.
** filter(): It is used to search items in an array. If an item matches the given condition, it returns that item in a new array.
** forEach(): It runs a function for every item in the array, but it does not return a new array.

4️⃣ arrow function -
** It is same as normal fuction just different syntax, just a shorter way to write a function in JavaScript. For example -
const add = (a, b) => a + b;

5️⃣ template literals -
** Template literals are used to create strings in JavaScript and easily include variables inside them.
They use backticks ( ) instead of quotes. For example-
const name = "Nishat";
console.log(`My name is ${name}`);
