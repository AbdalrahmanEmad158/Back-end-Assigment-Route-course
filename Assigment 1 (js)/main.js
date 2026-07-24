//1 Convert the string "123" to a number and add 7. (0.5 Grade)
let strProblem1 ='123'
strProblem1= Number(strProblem1) +7
console.log(strProblem1) //130
//-------------------------------------------------------------------------


//2 Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
let  givenVariable=null
if (!givenVariable) {
    console.log("Invalid")
}
//-------------------------------------------------------------------------


//3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue;
    }

    console.log(i);
}
//-------------------------------------------------------------------------

// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)

let arr = [1, 2, 3, 4, 5];
let filteredArrEven = arr.filter((num)=>num%2===0)
console.log(filteredArrEven) // [2,4]
//-------------------------------------------------------------------------

// 5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let mergedArr =[]
mergedArr.push(...arr1,...arr2)
console.log(mergedArr) // [1,2,3,4,5,6]
//-------------------------------------------------------------------------


// 6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)
let dayNumber = 2;

switch (dayNumber) {
    case 1:
        console.log("Sunday");
        break;
    case 2:
        console.log("Monday");
        break;
    case 3:
        console.log("Tuesday");
        break;
    case 4:
        console.log("Wednesday");
        break;
    case 5:
        console.log("Thursday");
        break;
    case 6:
        console.log("Friday");
        break;
    case 7:
        console.log("Saturday");
        break;
    default:
        console.log("Invalid day");
}
//-------------------------------------------------------------------------



// 7 Create an array of strings and return their lengths using map method.

let strings = ["Abdalrahman", "emad", "mahdy"];
let lengths = strings.map((str) => str.length);
console.log(lengths); // [11, 4, 5]
//-------------------------------------------------------------------------


// 8 Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)

function isDivisibleBy3And5(num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return "Divisible by both";
    }
    return "Not divisible by both";
    
}
console.log(isDivisibleBy3And5(15)) // "Divisible by both"
console.log(isDivisibleBy3And5(10)) // "Not divisible by both"

//-------------------------------------------------------------------------




// 9 Write a function using arrow syntax to return the square of a number (0.5 Grade)

let square = (num) => num * num;
console.log(square(5)) // 25
console.log(square(10)) // 100

//-------------------------------------------------------------------------


//10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)

function objectToString(obj)
{
let {name, age} = obj;
return `${name} is ${age} years old.`;
}

var person = { name: "Abdalrahman", age: 22 };

console.log(objectToString(person)); // "Abdalrahman is 22 years old."

//-------------------------------------------------------------------------


//11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)

function Sum(... items)
{
    let sum = 0
    for (let i = 0; i < items.length; i++) {
        sum += items[i];
    }
    return sum
}

sumResult = Sum(1, 2, 3, 4, 5);
console.log(sumResult); // 15

//-------------------------------------------------------------------------


// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)

function MyPromiss()
{
    return new Promise((resolve, reject) =>
{
    setTimeout(() => {
        resolve("Success");
    }, 3000);

})}

let promise = MyPromiss().then((message) => {
    console.log(message); // 
})
//----------------------------------------------------------------



// 13. Write a function to find the largest number in an array. (0.5 Grade)

function findLargest(arr) {
    let largest = arr[0];

    for (let num of arr) {
        if (num > largest) {
            largest = num;
        }
    }
     return largest;
}
   

    let numbers = [3, 7, 2, 9, 5];
    let largestNumber = findLargest(numbers);
    console.log(largestNumber); // 9



//------------------------------------------------------------------------



// 14 Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)

function objToArrayOfKeys(obj) {
    return Object.keys(obj);
}

var person = { name: "Abdalrahman", age: 22, city: "Cairo" };
console.log(objToArrayOfKeys(person)); // ["name", "age", "city"]

//------------------------------------------------------------------------



// 15 Write a function that splits a string into an array of words based on spaces. (0.5 Grade)

function StringToArrayBasedOnSpace(string) {
    string = string.trim()
    var word = ''
    let arrOfWords = []
    for (let i = 0; i < string.length; i++) {
       if(string[i] === ' ')
       {
        arrOfWords.push(word)
        word = ''
       }
       else{
        word += string[i]
       }
       if(i === string.length-1)
       {
        arrOfWords.push(word)
       }

}

return arrOfWords
}

console.log(StringToArrayBasedOnSpace("Abdalrahman emad mahdy ")) // ["Abdalrahman", "emad", "mahdy"]

//------------------------------------------------------------------------




// b1 What is the difference between forEach and for...of? When would you use each? (0.5 Grade)

/*forEach
Used only with arrays.
Executes a callback function for each element.
Cannot use break or continue.
can acess index and modify value by index 
do not use async function inside forEach because it will not wait 
for the async function to complete
 before moving on to the next iteration.
*/



/*forof
Used with iterable objects (arrays, strings, sets, maps, etc.).
Supports break and continue.
can not acess index and can not modify value by index 

note : by chat gpt i can get index by arr.entries()
*/

//------------------------------------------------------------------------




// b2 What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade)

/*
Hoisting means JavaScript moves declarations to the top of their scope before execution.

Example:

console.log(x);

var x = 10;

It behaves like:

var x;

console.log(x);

x = 10;

Output:

undefined
Temporal Dead Zone (TDZ)

let and const are hoisted but cannot be used before they are initialized.

Example

console.log(x);

let x = 10;

Output

ReferenceError

The period before initialization is called the Temporal Dead Zone (TDZ).
*/

//------------------------------------------------------------------------






// b3 What are the main differences between == and ===? (0.5 Grade)

/*
== compare between value only (1=='1' is true)
=== compare between value and type (1==='1' is false)
*/

//------------------------------------------------------------------------




// b4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)

/*
try...catch is used to handle errors without stopping the program.

try block contains code that may throw an error, and the catch block handles the error if it occurs.

*/

//------------------------------------------------------------------------



// b5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade)

/*
type conversion : انا اللي بحول نوع البيانات بنفسي 
(Number('123') => 123)

coercion : js  اللي بيحول نوع البيانات تلقائي
1+'1' => '11'
js is converting the number 1 to a string and concatenating it with the string '1', resulting in the string '11'.
*/

//------------------------------------------------------------------------