# AnimeFinder
This project recommends the most compatible anime series, based upon the user's interests.  The app consists of a survey that receives information about the user's favorite genres and their personality.  The app stores the user information as a nonpersistent JSON object.  The app then searches the list of anime shows, and returns the best show based on this input.  
# Demo
*https://vast-tor-39272.herokuapp.com/<br/>
# Setup
In order to run the app, you will need to clone this repository and install all required technologies listed below.
# Required Technologies
1. [Node.js LTS](https://nodejs.org/en/)<br/>
2. [NPM](https://www.npmjs.com/get-npm)<br/>
3. [Git & Git Bash](https://git-scm.com/downloads)<br/>
4. [MySQL 5.7.24](https://dev.mysql.com/downloads/installer/)<br/>
# NPM Modules Used
1. express
2. path
# Installation Steps
1. Open Bash and Clone the AnimeFinder repo
2. Install all required technologies
3. In Bash, change the current directory to the AnimeFinder directory and install all modules from the package.json, using the following command:
    1. install i [Enter]  
# Execute Program
1. In Bash, enter the following command in the AnimeFinder directory, to start the server.
    1. node server.js [ENTER]
2. Open your browser and type the following URL:
    1. http://localhost:3000
3. Query API:
    1. List All Anime: http://localhost:3000/api/animes
    2. List Specific Anime: http://http://localhost:3000/api/animes/animeRouteName
# Use
This repo is available for public non-commercial use only.
# Goal
The goal of this project was to use Express to create an API and a server engine that can receive a request for data and return results as a response.    
