# Movie App

A movie application built with React.js for the frontend and Node.js/Express for the backend. This application allows users to search for movies, view movie details, and manage their favorite movies.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Clone the Repository](#clone-the-repository)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)

## Folder Structure

The repository has the following structure:
```
movie-app
    │
    ├── movie-app-client # React.js application
    │
    └── movie-app-service # Node.js/Express application
```


## Clone the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/Nuruzzamancse/movie-app.git
```

## Setup and Installation
1. Setting Up the Backend (movie-app-service)
Navigate to the movie-app-service directory:

```bash
cd movie-app/movie-app-service
```
Install the dependencies:

```bash
npm install
```
Copy the .env.example to .env and fill in the required environment variables:

```bash
cp .env.example .env
```

### Running the Application
Running the Backend
In the movie-app-service directory, start the server:

```bash
npm start
```
The backend server should now be running on the port specified in your .env file.

Running the Frontend
In the movie-app-client directory, start the React development server:

```bash
npm run dev
```
The frontend should now be running and accessible at http://localhost:5173/

## Environment Variables
The movie-app-service requires several environment variables to be set. These variables should be defined in the .env file in the movie-app-service directory. An example file .env.example is provided for reference.
