# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

Before start application you need to install PostgresSQL and start it.
Then set up the environment variables.
Create a `.env` file in the root directory and fill it with the content from .env.example file.

To start the application, enter the following command:
```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application in Docker

Install Docker Desktop - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop).

To run the application in Docker, you need to enter the following command:

```
npm run docker:start
```

App is starting on port 4000. Be sure that port 5432 is free on your machine.

To stop the application in Docker, you need to enter the following command:

```
npm run docker:stop
```

## Vulnerabilities scanning

To scan the application for vulnerabilities, you need to enter the following command:

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Migration

To generate a migration file to create all tables from scratch you should delete all tables from database and generate migration file using the following command:

```
npm run migrations:generate
```

Then using this command you can determine changes in schema and generate new migration file