REFERENCE: https://scotch.io/bar-talk/copying-objects-in-javascript


Objects are the fundamental blocks of JavaScript. An object is a collection of properties, and a property is an association between a key (or name) and a value. Almost all objects in JavaScript are instances of Object which sits on the top of the prototype chain.
Introduction

As you know, the assignment operator doesn't create a copy of an object, it only assigns a reference to it, let's look at the following code:
Table of Contents

    Introduction
    The Naive Way of Copying Objects
    Shallow Copying Objects
    Deep Copying Objects
    Copying Object methods
    Copying Circular Objects
    Using Spread Elements ( ... )
    Conclusion 

let obj = {
  a: 1,
  b: 2,
};
let copy = obj;

obj.a = 5;
console.log(copy.a);
// Result 
// a = 5;

** ---> Edit on JS Bin**

The obj variable is a container for the new object initialized. The copy variable is pointing to the same object and is a reference to that object. So basically this { a: 1, b: 2, } object is saying: There are now two ways to gain access to me. You have to pass through the obj variable or the copy variable either ways you still get to me and anything you do to me via these ways (gateways) will affect me.

Immutability is widely spoken about these days and you have to listen to this call! This method removes any form of immutability and could lead to bugs should the original object be used by another part of your code.
The Naive Way of Copying Objects

The naive way of copying objects is looping through the original object and copying each property one after the other. Let's take a look at this code:

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

const mainObj = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4,
  },
}

console.log(copy(mainObj));

** ---> Edit on JS Bin**
Inherent Issues

    objCopy object has a new Object.prototype method different from the mainObj object prototype method, which is not what we want. We want an exact copy of the original object.
    Property descriptors are not copied. A "writable" descriptor with value set to be false will be true in the objCopy object.
    The code above only copies enumerable properties of mainObj.
    If one of the properties in the original object is an object itself, then it will be shared between the copy and the original making their respective properties point to the same object.

Shallow Copying Objects

An object is said to be shallow copied when the source top-level properties are copied without any reference and there exist a source property whose value is an object and is copied as a reference. If the source value is a reference to an object, it only copies that reference value to the target object.
Essential Reading: Learn React from Scratch! (2019 Edition)

A shallow copy will duplicate the top-level properties, but the nested object is shared between the original(source) and the copy(target).
Using Object.assign() method

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.

let obj = {
  a: 1,
  b: 2,
};
let objCopy = Object.assign({}, obj);
console.log(objCopy);
// Result - { a: 1, b: 2 }

** ---> Edit on JS Bin **

Well, this does the job so far. We have made a copy of obj. Let's see if immutability exist:

let obj = {
  a: 1,
  b: 2,
};
let objCopy = Object.assign({}, obj);

console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }

** ---> Edit on JS Bin**

In the code above, we changed the value of the property 'b' in objCopy object to 89 and when we log the modified objCopy object in the console, the changes only apply to objCopy. The last line of code checks that the obj object is still intact and hasn't change. This implies that we have successfully created a copy of the source object without any references to it.
Pitfall of Object.assign()

Not so fast! While we successfully created a copy and everything seem to be working fine, remember we discussed shallow copying? Let's take a look at this example:

let obj = {
  a: 1,
  b: {
    c: 2,
  },
}
let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }

// Note: newObj.b.c = 30; Read why..

** ---> Edit on JS Bin**
Why is obj.b.c = 30?

Well, that is a pitfall of Object.assign(). Object.assign only makes shallow copies. Both newObj.b and obj.b share the same reference to the object because of individual copies were not made, instead a reference to the object was copied. Any change made to any of the object's property applies to all references using the object. How can we fix this? Continue reading... we have a fix in the next section.

Note: Properties on the prototype chain and non-enumerable properties cannot be copied. See here:

let someObj = {
  a: 2,
}

let obj = Object.create(someObj, { 
  b: {
    value: 2,  
  },
  c: {
    value: 3,
    enumerable: true,  
  },
});

let objCopy = Object.assign({}, obj);
console.log(objCopy); // { c: 3 }

** ---> Edit on JS Bin **

    someObj is on obj's prototype chain so it wouldn't be copied.
    property b is a non-enumerable property.
    property c has an enumerable property descriptor allowing it to be enumerable. That's why it was copied.

Deep Copying Objects

A deep copy will duplicate every object it encounters. The copy and the original object will not share anything, so it will be a copy of the original. Here's the fix to the problem we encountered using Object.assign(). Let's explore.
Using JSON.parse(JSON.stringify(object));

This fixes the issue we had earlier. Now newObj.b has a copy and not a reference! This is a way to deep copy objects. Here's an example:

let obj = { 
  a: 1,
  b: { 
    c: 2,
  },
}

let newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)

Immutable: ✓

** ---> Edit on JS Bin**
Pitfall

Unfortunately, this method can't be used to copy user-defined object methods. See below.
Copying Object methods

A method is a property of an object that is a function. In the examples so far, we haven't copied an object with a method. Let's try that now and use the methods we've learnt to make copies.

let obj = {
  name: 'scotch.io',
  exec: function exec() {
    return true;
  },
}

let method1 = Object.assign({}, obj);
let method2 = JSON.parse(JSON.stringify(obj));

console.log(method1); //Object.assign({}, obj)
/* result
{
  exec: function exec() {
    return true;
  },
  name: "scotch.io"
}
*/

console.log(method2); // JSON.parse(JSON.stringify(obj))
/* result
{
  name: "scotch.io"
}
*/

** ---> Edit on JS Bin**

The result shows that Object.assign() can be used to copy methods while JSON.parse(JSON.stringify(obj)) can't be used.
Copying Circular Objects

Circular objects are objects that have properties referencing themselves. Let's use the methods of copying objects we've learnt so far to make copies of a circular object and see if it works.
Using JSON.parse(JSON.stringify(object))

Let's try JSON.parse(JSON.stringify(object)):

// circular object
let obj = { 
  a: 'a',
  b: { 
    c: 'c',
    d: 'd',
  },
}

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj); 

** ---> Edit on JS Bin**

Here's the result:

JSON.parse(JSON.stringify(obj)) clearly doesn't work for circular objects.
Using Object.assign()

Let's try Object.assign():

// circular object
let obj = { 
  a: 'a',
  b: { 
    c: 'c',
    d: 'd',
  },
}

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj2 = Object.assign({}, obj);

console.log(newObj2); 

** ---> Edit on JS Bin**

Here's the result:

Object.assign() works fine for shallow copying circular objects but wouldn't work for deep copying. Feel free to explore the circular object tree on your browser console. I'm sure you'll find a lot of interesting work going on there.
Using Spread Elements ( ... )

ES6 already has rest elements for array destructuring assignment and spread elements for array literals implemented. Take a look at spread element implementation on an array here:

const array = [
  "a",
  "c",
  "d", {
    four: 4
  },
];
const newArray = [...array];
console.log(newArray);
// Result 
// ["a", "c", "d", { four: 4 }]

** ---> Edit on JS Bin**

The spread property for object literals is currently a Stage 3 proposal for ECMAScript. Spread properties in object initializers copies own enumerable properties from a source object onto the target object. The example below shows how easy it would be to copy an object once the proposal has been accepted.

let obj = {
  one: 1,
  two: 2,
}

let newObj = { ...z };

// { one: 1, two: 2 }

Note: This will just be effective for shallow copy
Conclusion

Copying objects in JavaScript can be quite daunting especially if you're new to JavaScript and don't know your way around the language. Hopefully this article helped you understand and avoid future pitfalls you may encounter copying objects. If you have any library or piece of code that achieves a better result, feel welcome to share with the community. Happy coding!
