# Skill-Workshop Application Documentation

Welcome to the documentation for the Skill-Workshop application. Skill-Workshop is a platform that aims to bring together learners, educators, and employers to solve the skills puzzle. This document provides an overview of the application's architecture, technologies used, and key features.

## Table of Contents

- [Application Overview](#application-overview)
- [Technologies Used](#technologies-used)
- [Application Setup](#application-setup)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [User Profile Management](#user-profile-management)
- [Followers](#followers)
- [Photos](#photos)
- [Trainings](#trainings)
- [Paging and Sorting](#paging-and-sorting)
- [Running the Application](#running-the-application)
- [Demo](#demo)

## Application Overview

Skill-Workshop is a platform that connects learners, educators, and employers to facilitate the acquisition and assessment of skills. The application provides various features, such as user authentication, user profile management, the ability to follow other users, uploading photos, and managing training content.

## Technologies Used

Skill-Workshop is built using a combination of technologies, including:

### .NET Backend

- MediatR.Extensions.Microsoft.DependencyInjection
- AutoMapper.Extensions.Microsoft.DependencyInjection
- Microsoft.AspNetCore.Identity.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- System.IdentityModel.Tokens.Jwt
- Microsoft.AspNetCore.Authentication.JwtBearer
- FluentValidation.AspNetCore
- NWebsec.AspNetCore.Middleware
- Microsoft.EntityFrameworkCore.Sqlite
- Npgsql.EntityFrameworkCore.PostgreSQL
- SendGrid
- CloudinaryDotNet
- Microsoft.AspNetCore.Authorization

### Frontend (Using Vite)

- React
- React-DatePicker
- React-DOM
- SASS
- Semantic-UI-React
- Styled-Components
- UUID

### Dev Dependencies

- Various packages for linting, validation, and building, including TypeScript, Eslint, Formik, MobX, React-Router, and more.

## Application Setup

1. **Backend (.NET)**: Ensure that you have .NET SDK installed. You can use Visual Studio or command-line tools to work with .NET projects.

2. **Frontend (Vite)**: For the frontend, ensure that you have Node.js and npm installed. You can install Vite using npm.

3. **Database**: The application uses a database (SQL or PostgreSQL) for storage. You should set up the database and configure the connection in the backend.

## API Endpoints

The Skill-Workshop application provides a set of API endpoints to interact with its features. Here are some of the key endpoints:

### Account Controller

- **POST /api/account/login**: User login with email and password.
- **POST /api/account/register**: User registration with email, username, and password.
- **POST /api/account/verifyEmail**: Verify a user's email with a token.
- **GET /api/account/resendEmailConfirmationLink**: Resend the email verification link.
- **GET /api/account**: Get the current user's information.
- **POST /api/account/refreshToken**: Refresh the user's token.

### Follow Controller

- **POST /api/follow/{userName}**: Follow a user.
- **GET /api/follow/{userName}**: Get a list of followings for a user.

### Photos Controller

- **POST /api/photos**: Upload a photo.
- **DELETE /api/photos/{id}**: Delete a photo.
- **POST /api/photos/{id}/setMain**: Set a photo as the main photo.

### Profiles Controller

- **GET /api/profiles/{userName}**: Get a user's profile information.
- **PUT /api/profiles**: Edit a user's profile.
- **GET /api/profiles/{userName}/trainings**: Get a user's training information.

### Trainings Controller

- **GET /api/trainings**: Get a list of trainings with optional paging and sorting.
- **GET /api/trainings/{id}**: Get a specific training by ID.
- **POST /api/trainings**: Create a new training.
- **PUT /api/trainings/{id}**: Edit a training.
- **DELETE /api/trainings/{id}**: Delete a training.
- **POST /api/trainings/{id}/attend**: Register for a training.

## User Authentication

Skill-Workshop provides user authentication using email and password. Users can register, verify their email, log in, and refresh their authentication tokens. The application also includes mechanisms to resend email verification links.

## User Profile Management

Users can manage their profiles by viewing, editing, and uploading photos. Profiles can include a display name, email, username, and photos.

## Followers

The application allows users to follow other users. Users can choose to follow or unfollow other users, and a list of followers is available.

## Photos

Users can upload and manage photos in their profiles. They can set a photo as the main photo and delete photos as needed.

## Trainings

Trainings are a central feature of Skill-Workshop. Users can create, edit, and delete training content. Trainings can also be attended by users. The application supports advanced features like pagination and sorting for training listings.

## Paging and Sorting

For a better user experience, the application includes support for pagination and sorting when viewing lists of trainings. Users can efficiently navigate through large datasets.

## Running the Application

To run the Skill-Workshop application, follow these steps:

1. **Backend (.NET)**:

   - Navigate to the backend directory of the application.
   - Configure the database connection in the `appsettings.json` file.
   - Run the following command to start the backend:

     ```
     dotnet run
     ```

     or

     ```
     dotnet watch
     ```

2. **Frontend (Vite)**:

   - Navigate to the frontend directory of the application.
   - Install the necessary dependencies by running:
     ```
     npm install
     ```
   - Start the frontend development server with:
     ```
     npm run dev
     ```

3. **Access the Application**:
   - Once both the backend and frontend are running, you can access the application in your web browser.

## Demo

You can explore a live demo of the Skill-Workshop application at [here](https://skillworkshop.fly.dev). The demo allows you to test the application with the provided login settings:

**Profile 1**

- Email: bob@test.com
- Password: Pa$$w0rd

**Profile 2**

- Email: tom@test.com
- Password: Pa$$w0rd

**Profile 3**

- Email: jane@test.com
- Password: Pa$$w0rd

This concludes the documentation for the Skill-Workshop application. Please refer to the application's source code and detailed documentation for more specific information and instructions on usage.
