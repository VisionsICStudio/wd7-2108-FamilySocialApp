
# Project & Portfolio VI 

* **Notes - "Implementing Redux**
* **Aaron Wilson**
* **March 28 2021**

<br>


## State Management

This document contains general notes related to State Management...

<br>

## Data and Components
* All components are present in the reactjs app, and they contain props... this gives us a clue on the data and what the individual components expect.
*  This should make it a bit easier to pull together the redux side if you understand [React PropTypes](https://www.andreasreiterer.at/react-proptypes/) (Nice Article Explaining Use of PropTypes) : Also Covered in ASL 
  * Checkout the defaultProps and PropTypes defined in the component
This informs you what props the component will need.
* Container.js files will have mapToDispatch and mapToProps.  
Whatever Action Creator method you need in the component, will need to be provided to the component. So 1st check out the prop types to figure out what methods need to be accessed, then mapToDispatch those methods. For any prop you need in the component use mapToProps.

<br>

## Set up Redux
Install redux and redux-thunk from within the reactjs directory, and then... verify it shows up in the reactjs/package.json file as a dependency 

`npm install redux-thunk`  
`npm install redux react-redux`

<br>

## Set up the Store
The reactjs/src/App.js file will need access to the store data, so be sure to create it!...

Create a store folder here: `reactjs/src/store`

We can use the store folder to logically organize our work. For example...

```
store/index.js  
store/actionTypes.js
store/posts/actions.js  
store/posts/reducer.js
store/anotherPage(for example... users)/actions.js  
store/users/reducer.js
etc.
```

**Tip:** We don't necessarily have to create 1/1 folders in our store folder for every page contained in the reactjs app. Instead, we can just use store folders to logically organize related data. For example... the 'profile' page could be drawing from a users folder that contains a related reducer and actions.     
 
 <br>
	
### Add an index file to the Store folder

Example store [index file](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/9)

Brief description of the store index file...

To create the store we need a reducer (only one reducer, but we can combine multiple reducers into one) and a middleware. The store index file is where we pull in all the reducers and combine them into one. Ideally, reducers should be grouped in a logical way. For example, if we know we have a post page that is expecting data (props), we can create in the store folder a sub folder to organize posts data using a reducer and action file...

`reactjs/src/store/posts/actions.js`  
`reactjs/src/store/posts/reducer.js`  

This makes our application more manageable because instead of having one massive reducer, we took the time to break out the information across multiple reducers related to the different resources expecting data (i.e. pages located here: reactjs/src/pages). 

For example, our app could have multiple folders in the store folder for comments, users, etc. After pulling in the reducers, you will need to use combineReducers (which is imported from redux).  

```
// combine multiple reducers into one
const rootReducer = combineReducers({
  comments,
  posts,
  ...and so on,
});
  	
``` 

[Add a reducer to the store](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/16): This example slide demonstrates how to add a reducer to the store index file. 
 	
To decide how many reducers and action files are needed for our store, check out the pages area of the reactjs application again: `reactjs/src/pages`

Upon review of the different reactjs pages, we can then decide how to organize our reducers and actions into related store folders.  

So that redux and Action Creators can work with the API, Thunk is needed. This is because the dispatch function will be used. This is typically synchronous, meaning that a call to dispatch returns data immediately without interruption. We know we will need to work with the API though, so Thunk will help us make API calls in an asynchronous way. In other words, we will use await to retrieve back information from the API before calling dispatch. 

[Reference **actions.js** file](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/8): This file demonstrates asynchronous use of dispatch. This is the approach you can take when an asynchronous call to the API is needed.  


[Reference **Store Index** File](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/9): This file demonstrates combining reducers and adding Thunk to the store.

This store.index code excerpt shows adding middleware for logging and Thunk...

```
// reactjs/src/store/index.js
// Import what we need from redux and
// Thunk middleware to enable asynchronous actions... 

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// and later in the index.js code
// set up the middleware...

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);

```

After all of this setup work, the store is then exported.


<br>

## Create an actionTypes.js file
So we have consistency when using actions, use a file to keep track of the action names we will be using throughout our Reducers, Action Creators, etc. 

Suggested location for this file...
`reactjs/src/store/actionTypes.js`

[Example actionTypes file](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/34): This example from the ASL course shows how our actions may look when building out the store. 



<br>

## Import and Provide the store to the App

`reactjs/src/App.js` —--> Update the App so that it has access to the store

Your import statement will look something like this...

`import { store } from './store';`


After importing the store in your App.js file, you will also need to provide access to this store to your entire app. You can do this by wrapping your App.js router with the Provider tag. That looks something like this... `<Provider store={store}>`

Reference: [Adding Redux to the App](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/10)

  
<br>


## Connect Components...

The pages directory contains all the components we would want to connect. To connect any of the pages/components to data... we will need to create `container.js` file and add it to the pages folder.  

### Add a Container File
Example location for a container.js file...  
`reactjs/src/pages/post/container.js`

[Example **container.js** file](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/11): This container demonstrates how to use mapStateToProps and mapDispatchToProps. 

A good way of thinking about mapDispatchToProps is that we use this to provide to the page any action needed for the page. We defined those actions in our `store/PageName/actions.js` file.

A good way of thinnking about mapStateToProps is that this is providing the piece of state needed for the page. When an action is invoked due to a state change (like a button being clicked, a form being submitted, a page loading, etc.) The reducer sends back to the action this portion of state that can then be used within the page. 

After creating the container file the page itself needs to be updated to have access to the container data. 

<br>

### Update a Page to use Container

At this point we need to switch the page/component to use our container file instead of default or example data.

[Update the Container](https://present.yourcode.app/004aff80-4c3a-11e9-acdb-4d51e6ac33f2/18): This example page demonstrates how to import and export a container so that we are essentially wrapping the page with data provided to us from the store. 

After connecting a component, we also want to make sure we are no longer any defaultProps or example data. Comment all of that out to see if the application is actually pulling in data from the container. 

<br>

*Note: Remove Example Data!* 
After connecting a page, we can test to see if data is actually propagating the page as needed. 

* Look for and comment out example data!
import examplePosts from '../../exampleData/posts.json';
* Look for and comment out **defaultProps**!

**Tip:** As we work on containers we may want to isolate exactly where data is being used within the ShipIt app. If we replace a page's defaultProps with our own data and then click around the React ShipIt app, we can quickly see where defaultProps data is being used. Sometimes it may be necessary to refresh the browser. As we connect containers we can then revisit these locations to verify data is actually coming through as needed. 

  

<br>

## Reference Links
Use this section to highlight your own independent research. Replace the example references below with your own links and recommended resources. It is acceptable to provide multiple links for a single topic.  

What resource(s) did you find most helpful for this research assignment and why? 


*Resource 1:  How to Integrate React Redux + Nodejs/Express RestAPIs + Sequelize ORM – PostgreSQL CRUD example*  
[Grokonez Frontend Redux Tutorial](https://grokonez.com/frontend/redux/how-to-integrate-react-redux-nodejs-express-restapis-sequelize-orm-postgresql-crud-example)  


I found the tutorial above to be pretty more of a straightforward technical approach to guiding a newer developer or student to where they can get an understanding of what is needed to get a good idea of how state is controlled with Redux.

This tutorial has a heavy focus on coding and less explain of what redux does and why it does things programmatically the way it does. The tutorial is more of a "learn by coding" approach. The benefits of doing it this way is the student will get a real-world look at state changes and its "flow" throughout the redux environment.

*Resource 2:  How to load data in React with redux-thunk, redux-saga, suspense & hooks*

[GitConnected Redux/Thunk Tutorial](https://levelup.gitconnected.com/loading-data-in-react-redux-thunk-redux-saga-suspense-hooks-666b21da1569)

In this research article I learned that the author's main objective for writing the article was to expose the fact that even using two frontend libraries such as React and Redux still isn't enough tools in a developers arsenal to efficiently handle data flow from the backend to the frontend. That's why in order to properly deal with this common dilemma, enter such libraries like Thunk and Saga. These libraries are primmed for their ability to manage data flow mixed with Redux to deliver that data coupled with state control to get the job done.

This article unlike the one above this one, does do a better job at explaining the why, why a developer would use such addd-on libraries.

*Resource 3: How Redux Reducers Work*
[Smashing Magazine Article on Reducers](https://www.smashingmagazine.com/2020/12/how-redux-reducers-work/)

In this awesome Smashing Magazine article it gives great insight to how Redux reducers influence its pivotal role and functionality with regards to Redux and React. I am very impressed with this article in the way it breaks down the distinct actions that are handled by a reducer in Redux. The author breaks it down to specifics in Layman's terms of what each individual part of the reducer is, and how these parts coincide with each other to achieve specific tasks. He goes into details about how a reducer must take two (2) specific parameters into account such as with that os state and action.

I found it to be both very useful and interesting at the same time that a developer could use a reducer to initiate state in the same way as I needed the state changed in the Shipit website with the vote feature. The author happen to use the same example.




