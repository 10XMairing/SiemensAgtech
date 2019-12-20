## AGTECH API


## STEPS TO RUN IN PRODUCTION

### prep!
* step 0 => install required dependencies
```
npm install
```

### Run!
* step 1  => builds the typescript server and runs it: 
```
npm run start:build
```

OR 

* step  1 => *builds the typescript files*
```
npm run build
```

* step 2 => *starts the server in production mode* 
```
npm run start
```






## TO RUN IN DEVELOPMENT MODE
```
npm run dev
```

### DEMO ^
For demo this api server is hosted at 

http://agtech.xydev.io

The API documentation can be found here

[API DOCUMENTATION](https://documenter.getpostman.com/view/5816310/SWECXbKP)


## Backend

|                 |                                                                          |
| --------------- | ------------------------------------------------------------------------ |
| **Typescript**  | provides typing for javascript , [link](https://www.typescriptlang.org/) |
| Node/Express    | [node](https://nodejs.org/en/)                                           |
| Mongo/Mongoose  | node library for mongo                                                   |
| Axios           | networking library                                                       |
| Celebrate & Joi | express middleware for request validation                                |
| Typedi          | Dependency injection framework                                           |
| nodemailer      | mailing library                                                          |
| Winston         | logging library                                                          |
| Event-Dispatch  | library for event based execution                                        |

### Reason for using typescript

Typescript provides much better structure to the overall project with its interfaces and typing feature.
Its most useful with used together with Dependency Injection tools like `typedi` as demonstrated here

### The Backend Structure

```
|-- agtech
    |-- .env
    |-- .gitignore
    |-- Dockerfile
    |-- README.md
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- src
    |   |-- app.ts
    |   |-- demo.ts
    |   |-- index.ts
    |   |-- api
    |   |   |-- v1
    |   |       |-- index.ts
    |   |       |-- appointment
    |   |       |-- business
    |   |-- config
    |   |   |-- gmail.ts
    |   |   |-- index.ts
    |   |-- controller
    |   |   |-- template
    |   |   |-- appointment
    |   |   |   |-- create.ts
    |   |   |   |-- get.ts
    |   |   |   |-- index.ts
    |   |   |   |-- update-status.ts
    |   |   |-- business
    |   |   |-- crop
    |   |   |-- distPrices
    |   |-- data
    |   |   |-- prices.js
    |   |-- interface
    |   |   |-- IBase.ts
    |   |   |-- ICropType.ts
    |   |   |-- IUser.ts
    |   |-- loaders
    |   |   |-- express.ts
    |   |   |-- index.ts
    |   |   |-- logger.log
    |   |   |-- logger.test.log
    |   |   |-- mongoose.ts
    |   |   |-- winston.ts
    |   |-- middleware
    |   |-- models
    |   |-- services
    |   |   |-- EmailService.ts
    |   |-- subscribers
    |   |   |-- EventHandlers.ts
    |   |-- utils
    |       |-- compare-password.ts
    |       |-- generate-token.ts
    |       |-- index.ts
    |-- uploads
```

| **_package_**   | **_description_**                                                                                                                                                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **loaders**     | Loads all the base dependencies for the application server and sets it up like mongo,loggers etc                                                                                                                                                                         |
| **api**         | Contains the api logic. which is handled by its respective Controllers                                                                                                                                                                                          |
| **controller**  | Interacts with the router responses and the different services , functions of different types are grouped in different files and all exported through a common index file                                                                                                                                                                                                 |
| **services**    | Contains specific services that deals with the databases ,email , sms services etc                                                                                                                                 |
| **middlewares** | Contains the middlewares for authentication for use with express router                                                                                                              |
| **subscribers** | Has event handlers using the `event-dispatch` library. events like `signup` and `request` are caught by these callbacks and various services like email and sms services are executed. These events are called by the Controllers during signup or other events |
| **config**      | configuration keys.                                                                                                                                                                                                                                             |
| **interface**   | Contains interfaces for typescript.                                                                                                                                                                                                                             |
| **models**      | Contains the database models.                                                                                                                                                                                                                                   |
| **utils**       | Contains global utility functions.                                                                                                                                                                                                                              |

- nodemailer implemented with gmail oauth2




