# Skill-Workshop Application Documentation

Welcome to the documentation for the Skill-Workshop application. Skill-Workshop is a platform that aims to bring together learners, educators, and employers to solve the skills puzzle. This document provides an overview of the application's architecture, technologies used, and key features.

## Table of Contents

- [Application Overview](#application-overview)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [User Profile Management](#user-profile-management)
- [Followers](#followers)
- [Photos](#photos)
- [Trainings](#trainings)
- [Paging and Sorting](#paging-and-sorting)

## Application Overview

Skill-Workshop is a platform that connects learners, educators, and employers to facilitate the acquisition and assessment of skills. The application provides various features, such as user authentication, user profile management, the ability to follow other users, uploading photos, and managing training content.
View a demo of this app [here](https://skillworkshop.fly.dev).

## Technologies Used

Skill-Workshop is built using a combination of technologies, including:

### NuGet Packages

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

### Frontend

- React
- React-DatePicker
- React-DOM
- SASS
- Semantic-UI-React
- Styled-Components
- UUID

### Dev Dependencies

- Various packages for linting, validation, and building, including TypeScript, Eslint, Formik, MobX, React-Router, and more.

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

This documentation provides an overview of the Skill-Workshop application, its technologies, and key features. Please refer to the application's source code and detailed documentation for more specific information and instructions on usage.

aplication can be tested with default login settings:

Profile 1
name: bob@test.com
password: Pa$$w0rd

Profile 2
name: tom@test.com
password: Pa$$w0rd

Profile 3
name: jane@test.com
password: Pa$$w0rd
