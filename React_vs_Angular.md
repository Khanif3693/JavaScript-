REFERENCE: https://programmingwithmosh.com/react/react-vs-angular/


Do you want to learn about and discover the differences between React vs. Angular? Then keep on reading! I am going to explain to you the similarities, differences, pros, and cons of both React and Angular in this article. You don’t need to be an expert programmer to understand this post but it is encouraged that you are familiar with JavaScript.

*Disclaimer: I have worked extensively with both React and Angular. I used Angular at my job at IBM and React & React Native at my current job. I personally prefer React but will do my best not to taint the article with bias.
History of React vs. Angular

Angular is a JavaScript framework written in TypeScript. It was developed and is maintained by Google, and is described as a “Superheroic JavaScript MVWFramework” on Angular’s webpage. Angular (version 2 and above), originally released in September 2016, is a complete rewrite of AngularJS (released in October 2010). The newest major release is version 6 at the time of writing. Google AdWords, one of the most important projects at Google, uses Angular – so Angular is likely to be around for a while.

React is a JavaScript library developed and maintained by Facebook. It was released in March 2013 and is described as “a JavaScript library for building user interfaces”. React is used far more at Facebook than Angular is at Google if it’s any indication as to how big Facebook is betting on this technology. By this metric, you can also conclude that React will be around for a very long time.

Both Frameworks are available under the MIT license.
Architecture of React vs. Angular
Framework vs. Library

Angular and React have many similarities and many differences. One of them is that Angular is a full-fledged MVC framework and React is merely a JavaScript Library (just the view). Let me elaborate. Angular is considered a framework because it offers strong opinions as to how your application should be structured. It also has much more functionality “out-of-the-box”. You don’t need to decide which routing libraries to use or other such considerations – you can just start coding. However, a drawback is that you have less flexibility – you must use what Angular provides.

Angular provides the following “out of the box”:

    Templates, based on an extended version of HTML
    XSS protection
    Dependency injection
    Ajax requests by @angular/HTTP
    Routing, provided by @angular/router
    Component CSS encapsulation
    Utilities for unit-testing components.
    @angular/forms for building forms

React, on the other hand, gives you much more freedom. It only provides the “view” in MVC – you need to solve the M and C on your own. Due to this, you can choose any of your own libraries as you see fit. You will end up using many independent, fast-moving libraries. Because of this, you will need to take care of the corresponding updates and migrations by yourself. In addition, each React project is different and requires a decision requiring its folder hierarchy and architecture. Things can go wrong much more easily due to this.

React provides the following “out of the box”:

    Instead of classic templates, it has JSX, an XML-like language built on top of JavaScript
    XSS protection
    No dependency injection
    Fetch for Ajax requests
    Utilities for unit-testing components

Some popular libraries to add functionality are:

    React-router for routing
    Redux or MobX for state management
    Enzyme for additional testing utilities

Regular DOM vs. Virtual Dom

React’s use of a virtual DOM is one of its features that makes it so blazingly fast. You’ve probably heard of it. It was React’s “killer feature” when it was first released. Let me give you an example scenario:

Let’s say that you want to update a user’s age within a block of HTML tags. A virtual DOM only looks at the differences between the previous and current HTML and changes the part that is required to be updated. Git employs a similar method, which distinguishes the changes in a file.

Conversely, Angular opted to use a regular DOM. This will update the entire tree structure of HTML tags until it reaches the user’s age.

So why does this matter? The example above is trivial and probably won’t make any difference in a real app. However, if we’re dealing with hundreds of data requests on the same page (and the HTML block is replaced for every page request) it drastically affects the performance, in addition to the user’s experience.
Templates – JSX or HTML

React decided to combine UI templates and inline JavaScript logic, which no company had ever done before. The result is called “JSX”. Although it may have sounded like a bad idea, Facebook’s gamble paid off big-time. React uses something called a component, which contains both the markup AND logic in the same file. It also uses an XML-like language that allows you to write markup directly in your JavaScript code. JSX is a big advantage for development, because you have everything in one place, and code completion and compile-time checks work better.

Ex. In this example, we declare a variable name and use it inside JSX by wrapping it in curly braces:

const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

Angular uses templates that are enhanced HTML with Angular directives (“ng-if” or “ng-for”). React only requires knowledge of JavaScript, but with Angular, you must learn its specific syntax.
React Fiber

I’m not going to go into too much detail, but React Fiber is going to take React from “fast” to “blazingly fast”. Fiber is a backward-compatible, complete rewrite of the React core. It was introduced to React v16 and the upgrade went so smooth that you most likely didn’t even notice it happened. With Fiber, react can pause and resume work as it sees fit to get what matters onto the screen as quickly as possible. I encourage you to do more research into React Fiber – it is a killer feature.
Components

You’ve heard of components, haven’t you? Unless you’ve been living under a rock, I’m sure that you have. Both React and Angular are both component-based. A component receives an input, and after some internal logic returns a rendered UI template (a sign-in form or a table for example) as output. Components should be easy to reuse within other components or even in other projects. For example, you could have a sign-in component consisting of two text inputs (user & password) and a “Login” button. This component may have various properties and underlying logic, but it should be generalized so that you can reuse the component with different data on another page or in another app.

Components are meant to be self-contained “chunks” of your app that you can reuse in different situations. They are meant to encapsulate logic. The web is slowly becoming component-based, so I recommend you start getting accustomed to them right away.
State Management

There are states everywhere in an application. Data morphing over time involves complexity. Do you want to know how it works? The UI is described by the component at a given point in time. Then, the framework re-renders the entire UI of the component when data changes. This ensures that the data is always up to date.

To handle state in React, Redux is often used as the solution. In Angular, you may not need Redux. But, if your application becomes large enough, chances are that you will. Some developers, including me, opt to use MobX instead of Redux. MobX has more “magic” (things automatically done for you behind the scenes) and I personally prefer it. Although Redux and MobX go beyond the scope of this article, I highly encourage you to do some more research on them.
Data Binding

A large difference between React and Angular is one-way vs. two-way binding. Angular uses two-way binding. For example, if you change the UI element (a user input) in Angular, then the corresponding model state changes as well. Additionally, if you change the model state, then the UI element changes – hence, two-way data binding.

However, React only has one-way binding. First, the model state is updated, and then it renders the change in the UI element. However, if you change the UI element, the model state DOES NOT change. You must figure that out for yourself. Some common ways are through callbacks or state management libraries (see State Management in the previous section).

I must admit that Angular’s method is easier to understand at first. However, as the project becomes larger React’s way results in a better data overview (making debugging much easier). Both concepts have their pros and cons. You need to understand the concepts and determine if this influences your framework decision.
TypeScript vs JavaScript/Flow

React uses JavaScript, a dynamically-typed language (which means you don’t have to define the variable’s type). Because many developers already know and love JavaScript, this can be seen as a pro.

Conversely, if you want to use Angular you’ll need to get comfortable with TypeScript. TypeScript is a statically typed language, which means you must define the variable’s type (string, number, array, etc). It is simply a transpiler that compiles TypeScript to JavaScript code, which also means you can write ES5 code in a TypeScript file.

TypeScript’s purpose is to ensure a smooth transition for programmers with an Object Oriented Programming (OOP) background. TypeScript was also released in the period of ES5, and during that time, ES5 was not a class-based OOP language.

Since then, JavaScript has grown and garnered lots of great changes. With ES6, you have modules, classes, spread operators, arrow functions, template literals and more. It allows developers to write declarative code while having the characteristics of a true OOP language (that is, including class-based structure).

But, an advantage of TypeScript is that it offers more consistency in examples found online (React examples can be found in either ES5 or ES6).

You should also probably know that you could use Flow to enable type checking within your React project. It’s a static type-checker developed by Facebook for JavaScript. If you so choose, you can also use TypeScript in your React project (although it isn’t natively included).
