Manipulation of objects and arrays can be quite complex and challenging at times, especially when they become nested within one another.

Earlier in your bootcamp, you learned about dealing with arrays of objects. For this challenge question, you'll be asked to research more information about how arrays and objects work together and share your findings.

Please research the following questions and provide your answer below.

Question #1: What is at least one way to add an object to an existing array? What is at least one way to add an array to an existing object?

> > You can add an object to an array with the push method or array constructing

```
  let person = { name: 'ryan' }
  let people = [];
  people.push(person)
  or
  people = [...people, person ]
```

> > You can add an array to an object by setting it as a property of that object

```
person["people"] = people
```

Question #2: How can you find the length of an array? How can you find the number of properties in an object?

You can find the length of an array with .length property

```
console.log(people.length)
```

You can find the number of properties in an object with Object.keys() static method coupled with .length property

```
console.log(Object.keys(people).length)
```

Question #3: Let's say you have a MongoDB collection of documents, and you've used a Mongoose/MongoDB Node Driver method such as collection.find() that returns the documents as objects in an array. How would you go about checking to see if a specific object already exists in that array?

Respond to this question with your answers to complete this activity. Use code snippets to demonstrate your answers.
I would check by Id.

```
if ([collection].id('...mongoId')) {
  ..do some stuff
}
```
