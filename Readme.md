<html><center><h1>TypeScript Express Microservice Template</h1></center></html>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="center">
  <b>A delightful way of building a Node.js Backend Microservice with beautiful code written in TypeScript.</b></br>
  <sub>Made with ❤️ by <a href="https://github.com/kingshuknandy2016/">Kingshuk Nandy</a></sub>
</p>

![Microservices-Built-With-Node-1](https://github.com/kingshuknandy2016/microservice-nodejs-starter/assets/36564770/28454ace-8629-4849-8da1-38bab6076e26)
## ❯ Why

This project is a complete ***Backend Microservice Application Server*** build in NodeJS with all standard features. We like you to be focused on your business and not spending hours in project configuration.

Try it!! We are happy to hear your feedback or any kind of new features.

### ❯ Features

- **Authentication** of the API is integrated using JWT
- Strong **Password Encryption** using bcrypt
- Basic **Unit testing** is implemented using jest
- **Simplified Database Query** with the ORM [Sequelize](https://sequelize.org/).
- **API Documentation** thanks to [swagger](http://swagger.io/) 
- **PostgreSQL**  database provides a powerful  **Object Relational Database**
- **GraphQL** provides as a awesome query language for our api [GraphQL](http://graphql.org/).
- Deployment Using Docker and Docker Compose

## ❯ Table of Contents
https://github.com/kingshuknandy2016/microservice-nodejs-graphql-starter/tree/master#getting-started
- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Important URL](#-important-url)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Logging](#-logging)
- [Seeding](#-seeding)
- [GraphQL](#-graphql)
- [Docker](#-docker)
- [Docker Compose](#-docker-compose)
- [Further Documentations](#-further-documentations)
- [License](#-license)

## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)
### Step 2: Set up Application Database

Get your application DB up. Ensure that you have docker installed. We are using **Postgres Docker container** as the Database

```cmd
docker pull postgres
```

```cmd
docker run --name postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.


## ❯ Scripts and Tasks

All script are defined in the `package.json` file, but the most important ones are listed here.

### Install
- Install all dependencies with `npm install`

### Linting
- For linting execute the command `npm run eslint:fix`

### Tests
- Run the unit tests using `npm test`

### Running in dev mode
- Run `npm run dev` to start nodemon with ts-node, to serve the app.

### Building the project and run it
- Then start the application
```cmd
npm run start:dev
```


## ❯ Important URL
- **Application Health** http://localhost:3000/health
- **Graphql Server** 
  - http://localhost:3000/graphql or 
  - https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql
- **Swagger** http://localhost:3000/api-docs/

In order to access the private the routes, we need to pass the JWT token generated by the login API

## ❯ API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/health**    | Get the health of server |
| **/apis/v1**   | The Api server details |
| **/graphql**   | Route to the graphql editor or your query/mutations requests |
| **/api-docs/** | This is the Swagger UI with our API documentation |

### Example Entity Endpoint
```sh
# Public API Routes:
+--------+------------------------------+
  Method | URI
+--------+------------------------------+
  GET    | /health
  POST   | /apis/v1/auth/signUp
  POST   | /apis/v1/auth/login
  GET    | /apis/v1/employees/getEmployeeBasic
  GET    | /apis/v1/employees/getEmployees
  POST   | /apis/v1/employees/setEmployee
+--------+------------------------------+

# Private API Routes:
+--------+------------------------------+
  Method | URI
+--------+------------------------------+
  GET    | /apis/v1/users/getUsersBasic
  GET    | /apis/v1/users/getUsers
  POST   | /apis/v1/users/setUser
+--------+------------------------------+
```

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/constants/**                | The Global Constants |
| **src/controllers/**              | REST API Controllers |
| **src/controllers/v1**            | REST API Controllers version v1|
| **src/dbServices/v1**             | DB Service Configuration|
| **src/services/**                 | Service layer |
| **src/middlewares/**              | Express Middlewares like Authentication |
| **src/models/**                   | Sequelize Models |
| **src/routes/v1Apis**             | API Routes |
| **test/unit/** *.test.ts          | Unit tests |
| .env.example                      | Environment configurations |

## ❯ Logging

Our logger is winston. 

```javascript
export interface Log {
  level: "info" | "debug" | "error" | "warn";
}
const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: LOG.level })],
});
export default logger;
```
## ❯ Seeding

Yet to be implemented

## ❯ GraphQL
For the GraphQL part we used the library [Apollo Server 4](https://www.apollographql.com/docs/apollo-server/schema/schema/) to build awesome GraphQL API's.

## ❯ Docker
Here we will try to spin up two containers.
- postgres
- microservice
There has to be a common network attached to both of them so that they will be able to communicate with each other

### Step A: Install Docker
Before you start, make sure you have a recent version of [Docker](https://docs.docker.com/engine/installation/) installed

### Step B: Create a network
In order to communicate between containers we need to create a [user-defined custom bridge networks](https://docs.docker.com/network/drivers/bridge/)
```cmd
  docker network create -o com.docker.network.bridge.enable_icc=true custom-network
```

### Step C: Run the Database Image
Then, Get the Postgres DB up. Run the postgres image, passing the newly created network ***custom-network***
```cmd
docker run --network custom-network --name postgres-db -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```
### Step D: Build the Application Docker image

```shell
docker build -t <your-image-name> .
```
Then, build the app's image
```cmd
docker build . -t kingshuknandy/node-microservice
```

### Set E: Run the Application docker image in container and map port

Finally, run the app's image, passing the newly created network ***custom-network*** 

The port which runs your application inside Docker container is either configured as `PORT` property in your `.env` configuration file or passed to Docker container via environment variable `PORT`. Default port is `3000`.

```cmd
docker run -p 3000:3000 --network custom-network --env-file .env  --env DB_HOST='postgres-db' --name node-microservice kingshuknandy/node-microservice:latest
```

## ❯ Docker Compose

- Created the [Dockerfile](/Dockerfile) to build the app
- Defined the services that make up the app in [docker-compose.yml](/docker-compose.yml) so they can be run together in an isolated environment.
- Run ***docker-compose up*** and Compose starts and runs your entire app.
```cmd
docker-compose up
```

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Sequelize](https://sequelize.org/) |Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL |
| [Jest](http://facebook.github.io/jest/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |
| [GraphQL Documentation](http://graphql.org/graphql-js/) | A query language for your API. |

## ❯ References

## ❯ License

[MIT](/LICENSE)