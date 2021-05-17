# Indigenous Plant Go
Indigenous Plant Go is a mobile application that allows BCIT Students to explore the BCIT Burnaby campus and discover plants, and points-of-interests that have significance in the indigenous culture.

<<<<<<< HEAD
=======
<<<<<<< HEAD
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
>>>>>>> main
**Table Of Contents**
1. [Core Application Features](#core-application-features)
2. [Application Features](#application-features)
3. [Road-mapped Features](#road-mapped-features)
4. [Technology Stack](#technology-stack)
5. [Wireframes](#wireframes)
6. [Installation Documents](#installation)

### Content Management System (Client)
This specific repository houses the client-side user interface of the mobile application's content management system (cms).

#### Core Application Features
* User authentication
* Users can create, read, update, delete resources:
    * Plants
    * Waypoints
    * Locations
    * Media (Images, Video, Audio)
    * Categories + Tags
* CMS Exposes a Restful API for the Mobile application to consume

#### Application Features
* Users can create, read, update, delete resources using a visual, tabular dashboard.
* The tabular dashboard can be filtered, and searched.
* Users can bulk-delete any resource
* All DESTRUCTIVE requests will prompt the user for confirmation.
* Users can upload images and audio files directly from the CMS.
* A user can create other users.

#### Road-mapped Features
* Interface is mobile-responsive
* Allow input for a QR code data for a plant and/or waypoint
* Implement (2) more resource types: "tours", and "learn more"
* Enhanced media previews allow the user to see the exact image/video/audio before upload.

### Technology Stack
* Client: ReactJS, axios
* Deployment: Netlify

### Wireframes
#### Home

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/DASHBOARDHOME.png)

#### Plant Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS3.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS4.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS5.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS6.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS7.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PLANTS8.png)

#### Waypoint Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/WAYPOINTS3.png)

#### Learn More Content Type

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LEARNMORE3.png)

#### Users

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS2.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/USERS3.png)

#### Profile

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/PROFILE.png)

#### Tags

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/TAGS.png)

#### Locations

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/LOCATIONS.png)

#### Media Uploads

![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/MEDIA1.png)
![image](https://raw.githubusercontent.com/BCIT-SSD-2020-21/indigenous-plant-go-cms/main/planning/client/wireframes/MEDIA2.png)

### Installation
#### Local Installment
1. Clone the repo with the following code:
```
git clone https://github.com/BCITConstruction/indigenousplantgo-cms-client.git
```
And navigate into the folder:
```
cd indigenousplantgo-cms-client
```
2. Install all the node module with `npm install`.
3. Add a .env file with the base url of your server-side code.
  - If you run the server-side locally, the link will be `http://localhost:8080/api`.
  - If you run the server-side on heroku, the link will be where the the url provided by heroku followed by /api.
```
REACT_APP_BASE_URL="<Your link>/api"
```
4. Running `npm start` now should run it at `http://localhost:3000`.
#### Deploying client-side of cms to netlify
1. Proceed to https://www.netlify.com/ 
2. Select New site from Git and connect to a Git provider
3. Select the repository for the client-side application
4. Click on Advanced settings and define the environment variable (refer to the .env file):  
<<<<<<< HEAD
      Key = "REACT_APP_BASE_URL"
      Value : <-Your-Heroku-URL->
5. Deploy the site
=======
```
Key = "REACT_APP_BASE_URL"
Value : <-Your-Heroku-URL->
```
5. Deploy the site
>>>>>>> b721856ba02e17de35a970e48cb14b4837646a6b
>>>>>>> main
