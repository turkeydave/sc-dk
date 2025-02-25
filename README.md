# Dave K's submittal to Service Core

Even though its now depreciated, this project was bootstrapped with [reate React App](https://github.com/facebook/create-react-app), since testing is baked in by default, though getting React Testing Library and jest support in Vite or similar is not difficult.

## Description

This app has a button that will load users from a `dummyJson` endpoint using `fetch` api.
During loading, a loading 'spinner' will show, and upon success it disappears and the user list will appear.
If any error occurs, its desplayed in a `div` that is hidden otherwise.

The design consists of: 

- A `UsersContext` and `provider` (in `userContext.js`), that utilizes a `reducer` which allows mutating state based on actions.  This allows our component to access this `state, reducer, and functionality` to load users.  In our mock scenario its assumed many components would need access to this state, so a context was chosen.

- A `UsersComponent (UsersComponent.js)` that uses `usersContext`, `dispatch`, and a helper to load users `fetchUsers`.  It has our button and very pretty users list

## Tests

### `app.test.js`
There are tests rendering `<App/>`
- one test asserts the button is present, and the loading div is not present on itial render.
- the next test mocks `fetch` with dummy json and asserts the users list is visible.

### `userContext.test.js`
There are a few more tests in `userContext.tests.js`.  These tests are similar to `App.test.js` but show how one could test the context and provider via a custom component

- the first test shows the happy path, mocking `fetch` with test data, and waits for the results container to be visible
- the next test mocks `fetch` with an error response, and waits for and asserts the error container is visible


## Using this project

### `npm install` 

Will install all the dependencies to run and test

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
