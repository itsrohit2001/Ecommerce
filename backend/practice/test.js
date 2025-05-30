const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
console.log(res);

// primitive data types: stack memory - user gets copy
// Non primitive data types: heap memory - user gets reference

let user= {
    email: "rk@rk.com",
    upi: "rk@upi",
}

let user2= {
    email:"pk@pk.com",
    upi: "pk@upi",
}

let user3 = user2

user3.email = "rohit@google.com"

console.log(user2.email) ;
console.log(user3.email) ;


// string interpolation
const marvel_hero = ["ironman", "hulk", "thor", "spiderman"];
const dc_hero = ["batman", "superman", "wonderwoman", "aquaman",["harry", "ron", "hermione"]];

const both_hero = [...marvel_hero, ...dc_hero];
const second_hero = marvel_hero.concat(dc_hero);

// console.log(both_hero);
// console.log(second_hero);

// singleton object - through object.create method
// object literal
const user4 = {
    name: "rohit",
    email: "rk@rk",
    "up": "rk@upi",
}

// console.log(user[name]);
// console.log(user["name"]);
// console.log(user.up);
// console.log(user["up"]);

const arr1= [1, 2, 3, 4, 5];

const response = arr1.slice(0, 2);
// console.log(res);
const res3 = arr1.slice(-4, 4);
// console.log(res3);

const res4 = arr1.slice(2, -2);
// console.log(res4);
// console.log(arr1)

const res2 = arr1.splice(0, 2);
console.log(res2);

console.log(arr1);


const arr2 = [1, 2, 3, 4, 5];
const arr3 = arr2.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);
console.log(arr3); // Output: 15


