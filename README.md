# dataBASED

Our website will host a collection of artwork layered on a geographical map to gain insight on prominent works for a given country or time period. We will allow users to explore a diverse range of artistic expression across the globe through our innovative digital platform. Users will also be able to discover the historical and cultural significance for pieces of art that hold influence.

Art history represents where humans have been and where we’re going. For many, art history can require extensive memorization, where one must be able to identify significant art works, periods, artists, techniques and categories. The sheer volume of information can be overwhelming. We are solving the non-trivial problem of helping make art more digestible and accessible; our hope is to make learning about art immersive.


![Home Page](/demo_images/artBASED.png?raw=true)



# Project Setup Guide

Welcome to our project setup guide! This guide is designed to help you get the project up and running on your local machine for development, testing, and viewing purposes.

## Prerequisites

Before you begin, be sure that you have the following installed to download the rest of our dependencies to run the application:

- [Node.js (20.12 or newer)](https://nodejs.org/en)
- npm (Node package manager, comes pre-installed with newer version of Node.js)
- Google Chrome [(latest version)](https://www.google.com/chrome/)

#### If you would you would like to run the Data cleaning scripts you will need Python

- Python [(Version 3.10 or newer )](https://www.python.org/downloads/)


## Initial Setup

1. **Clone the Repository**: Start by cloning the project repository to your local machine.

2. **Navigate to the Project Directory**: After cloning, change into the project directory through the terminal`cd dataBASED/client/src`

3. **Open multiple Terminals**: Open a second terminal tab or split the terminal in the editor of your choosing

4. **Navigate to the Server Side in Terminal 1** `cd dataBASED/server`

5. **Navigate to the Client Side in Terminal 2** `cd dataBASED/client`
   
6. **Install  Dependencies on Terminal 1 & 2**: Installs dependencies on server side and client side
```
npm i
```
## Running the Server Side in Express + Node js 
Runs the backend services for our web app in development mode, including routes to database and login

   ```
   npm start
   ```
Click or enter [http://localhost:8080/](http://localhost:8080/) in your Google Chrome browser to test server side routes

## Running the Client Side in React+Vite
Runs the frontend services for our web app in development, including visual display with HMR

   ```
   npm run dev
   ```
Click or enter [http://localhost:5173/](http://localhost:5173/) in your Google Chrome browser to view front end display and interact with web app (ensure server side is running to experience full web app capability)

## To close Server Side & Client Side
Execute this command in each terminal seperately to stop the application

   ```
   Ctrl+C
   ```

# External Resources and Documentation

[React](https://react.dev/blog/2023/03/16/introducing-react-dev)

[Vite](https://vitejs.dev/)

[Express](https://expressjs.com/)

[Node](https://nodejs.org/docs/latest/api/)

[Python](https://docs.python.org/3/)

<img src="/demo_images/artBASED_mobile.png" width="400" height = "600">

