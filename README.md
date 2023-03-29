[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CodeFactor](https://www.codefactor.io/repository/github/alejandroluishc/orpheus-music-app-backend/badge)](https://www.codefactor.io/repository/github/alejandroluishc/orpheus-music-app-backend)
# Orpheus (Backend API)
![This is an image](https://res.cloudinary.com/drghk9p6q/image/upload/v1671122043/Final-Project-MERN/Readme/WhatsApp_Image_2022-12-15_at_17.29.42_c8gara.jpg)
This is the backend repository for the [Orpheus-music-app repository](https://github.com/AlejandroLuisHC/orpheus-music-app).

## Getting Started 🚀

1. Clone the repository: `git clone https://github.com/AlejandroLuisHC/Orpheus-Music-App-Backend-API.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file in the root of the project and set the environment following the stucture provided in the `.env.example`
4. Start the development server: `npm run dev`
5. Open the browser and navigate to `https://orpheus-music-app.netlify.app/` to access the API.

### Requirements 📋

_You need to install nodejs_

Go to [NodeJS web page](https://nodejs.org/es/) download and install the
program.

## Endpoints and actions 🔍

### `/api/v1/users` Endpoint

- **GET** `/`: Retrieves a list of all users.
- **GET** `/:id`: Retrieves a specific user by their `id`.
- **POST** `/`: Creates a new user.
- **DELETE** `/:id`: Deletes a specific user by their `id`.
- **PATCH** `/:id`: Updates a specific user by their `id`. 

### `/api/v1/playlists` Endpoint

- **GET** `/`: Retrieves a list of all playlists.
- **GET** `/:id`: Retrieves a specific playlist by their `id`.
- **POST** `/`: Creates a new playlist.
- **DELETE** `/:id`: Deletes a specific playlist by their `id`.
- **PATCH** `/:id`: Updates a specific playlists by their `id`. 

### `/api/v1/tracks` Endpoint

- **GET** `/`: Retrieves a list of all tracks.
- **GET** `/:id`: Retrieves a specific track by their `id`.
- **POST** `/`: Creates a new track.
- **DELETE** `/:id`: Deletes a specific track by their `id`.
- **PATCH** `/:id`: Updates a specific track by their `id`. 

### `/api/v1/albums` Endpoint

- **GET** `/`: Retrieves a list of all albums.
- **GET** `/:id`: Retrieves a specific album by their `id`.
- **POST** `/`: Creates a new album.
- **DELETE** `/:id`: Deletes a specific album by their `id`.
- **PATCH** `/:id`: Updates a specific album by their `id`. 

### `/api/v1/events` Endpoint

- **GET** `/`: Retrieves a list of all events.
- **GET** `/:id`: Retrieves a specific event by their `id`.
- **POST** `/`: Creates a new event.
- **DELETE** `/:id`: Deletes a specific event by their `id`.
- **PATCH** `/:id`: Updates a specific event by their `id`. 

### `/api/v1/genres` Endpoint

- **GET** `/`: Retrieves a list of all genres.
- **POST** `/`: Creates a new genre.

### `/api/v1/moods` Endpoint

- **GET** `/`: Retrieves a list of all moods.
- **POST** `/`: Creates a new mood.

## Built with 🛠️
- **Express.js**: A web application framework for Node.js
- **Mongoose**: A MongoDB object modeling tool for Node.js
- **Cors**: A middleware for handling CORS (Cross-Origin Resource Sharing)
- **Helmet**: A collection of middlewares for security-related HTTP headers
- **Morgan**: A middleware for logging HTTP requests
- **Nodemon**: A utility that automatically restarts the Node.js application when changes are detected
- **Express-jwt**: A middleware for validating JWTs (JSON Web Tokens)
- **Jwks-rsa**: A library for retrieving RSA signing keys from a JWKS (JSON Web Key Set) endpoint
- **Auth0**: An authentication and authorization platform for web and mobile apps
- **Cloudinary**: A cloud-based image and video management service for web and mobile apps

## Contributing 🖇️

We welcome any contributions to the Orpheus-music-app (Backend API). To contribute, please follow these steps:

1. Fork the repository by clicking the "Fork" button in the top right corner of this page.
2. Clone the forked repository to your local machine by running `git clone https://github.com/[your-username]/Orpheus-music-app-backend.git` in your terminal.
3. Create a new branch for your contribution by running `git checkout -b [branch-name]`.
4. Make your changes and test them thoroughly.
5. Commit your changes by running `git commit -m "[commit message]"`.
6. Push your changes to your forked repository by running `git push origin [branch-name]`.
7. Create a new pull request by navigating to your forked repository on GitHub, selecting the branch you just pushed, and clicking the "New pull request" button.
8. Provide a clear and detailed description of your changes and why they are necessary.
9. We will review your pull request and provide feedback. Once it is approved, your changes will be merged.

Thank you for your contributions! 🎉


## Contributors ✨
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/BalaguerDev"><img src="https://avatars.githubusercontent.com/u/101297683?v=4" 
    width="100px;" alt="BalaguerDev"/><br /><sub><b>Alex Balaguer</b></sub></a></td>
    <td align="center"><a href="https://github.com/Jose-Morcillo-Cascales"><img src="https://avatars.githubusercontent.com/u/85121932?v=4" width="100px;" alt="Jose-Morcillo-Cascales"/><br /><sub><b>Jose Mocillo</b></sub></a></td>
    <td align="center"><a href="https://github.com/pauciv"><img src="https://avatars.githubusercontent.com/u/99875709?v=4" 
    width="100px;" alt="pauciv"/><br /><sub><b>Pau Civill</b></sub></a></td>
    <td align="center"><a href="https://github.com/zzezequiel"><img src="https://avatars.githubusercontent.com/u/104327861?v=4" 
    width="100px;" alt="zzezequiel"/><br /><sub><b>Ezequiel Zvirgzdins</b></sub></a></td>
    <td align="center"><a href="https://github.com/AlejandroLuisHC"><img src="https://avatars.githubusercontent.com/u/57948901?v=4" width="100px;" alt="AlejandroLuisHC"/><br /><sub><b>Alejandro L. Herrero</b></sub></a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
