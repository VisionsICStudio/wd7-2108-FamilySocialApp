# Project & Portfolio VI

* **RESEARCH - Error Handling**
* **Aaron Wilson**
* **March 28, 2021**

<br>

## Error Handling
In order for a developer to implement good development techniques when coding, they are going to have to institute some form of error handling pattern in their code base for the application they are working on. Some of the key concepts to good error handling techniques are:

* Familiarity with error object
* Async/Await operations
* Try/Catch coding blocks

<br>

## Error Handling Best Practices
It is imperative that a developer get into a good habit of using solid coding design patterns when it pertains to errors and the way you will handle those errors. 

Concepts described here will also address how these practices look in regards to NodeJS. This is the practices of time-tested, proven strategies for a developer to 
carry out their "Node Code" in a manner that allows for uniformity among the development team.

* Utilize HTTP Error Codes
* Error Handling Design Patterns
* Examining The Error Object

<br>

## Reference Links
This section features my own independent research of several key factors in gaining valuable insight into proper usage of error handling in NodeJS. You will find references below with links and recommended resources that will help you on your path to a better understanding of how to use good developer coding design patterns when it comes to erroe handling. 

The below resource(s) dare ones that I found to be the most helpful in my research research process.

**Resource 1: How to Build a Node.js Error-handling System**  
[Proper Error Handling In NodeJS](https://www.toptal.com/nodejs/node-js-error-handling)  

I found the article of which is linked above to be a highly useful resource in the presentation of solid factual information in regards to the use of error handling.

The author raises several key points of interest to hone your learning and focus on in order to master your skill set of NadeJS along with other key features of NodeJS to guide you along your journey to master error handling.

**Resource 2: Async Await Error Handling in JavaScript**

[Async/await, Javascript, and Error Handling](https://thecodebarbarian.com/async-await-error-handling-in-javascript.html#:~:text=Using%20catch()%20on%20the%20Function%20Call&text=In%20other%20words%2C%20handle%20errors,to%20handling%20each%20individual%20error.&text=Remember%20that%20async%20functions%20always,error%20occurs%20in%20the%20function.)

The Async/await approach has become the defacto proper ES6 way of dealing with error handling in Node backend parts of modern day SPA web applications. It is this pattern that has evolved into the standard approach to error handling where in past, developers would often fall victim to what is known as callback hell.

The older way of implementing error handling methodologies was to write functions that required a callback parameter. This usage often led to what is referred to in the industry as "spaghetti code". This coding practice led to confusion among developing teams when they were put on the task to decipher the author's code for optimization when nearing the application deployment deadline.

**Resource 3: Node.js Error Handling Best Practices**

[Anatomy of an error object w/ NodeJS](https://stackify.com/node-js-error-handling/)

In a portion of this article, the focus is on learning the anatomy of an error object. It goes on to break down the two (2) most important properties of the error object. These such properties are name and description. 

A good practice is to extend the error object by giving descriptive value to both the name and description properties.

This is an example of that:


```javascript
class FancyError extends Error {
    constructor(args){
        super(args);
        this.name = "FancyError"
    }
}

console.log(new Error('A standard error'))
// { [Error: A standard error] }

console.log(new FancyError('An augmented error'))
// { [Your fancy error: An augmented error] name: 'FancyError' }
```