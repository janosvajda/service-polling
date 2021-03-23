## Available Scripts

If you work on the service pooler script's frontend then you should go its project directory. You can find it in `src/frontend/services-crud` directory inside of the project.

This is a React app. All its vendors is in packgage.json. It deploys itself automatically. You can the details in the description of `build` command at very bottom in this Readme.

**In the project directory, you can run these commands:**

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

I created only two very simple tests at the moment.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

It also copies the production build frontend app to Vert.x's webroot directory and it replaces the old version of the app.
