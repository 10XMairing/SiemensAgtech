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
    |   |       |   |-- index.ts
    |   |       |-- business
    |   |       |   |-- index.ts
    |   |       |-- crop
    |   |       |   |-- index.ts
    |   |       |-- distRequest
    |   |       |   |-- index.ts
    |   |       |-- distributor
    |   |       |   |-- index.ts
    |   |       |-- eqRequest
    |   |       |   |-- index.ts
    |   |       |-- equipment
    |   |       |   |-- index.ts
    |   |       |-- expert
    |   |       |   |-- index.ts
    |   |       |-- farmer
    |   |       |   |-- index.ts
    |   |       |-- order
    |   |       |   |-- index.ts
    |   |       |-- product
    |   |       |   |-- index.ts
    |   |       |-- productCart
    |   |           |-- index.ts
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
    |   |   |   |-- get-business.ts
    |   |   |   |-- index.ts
    |   |   |   |-- login.ts
    |   |   |   |-- register.ts
    |   |   |-- crop
    |   |   |   |-- create.ts
    |   |   |   |-- get.ts
    |   |   |   |-- index.ts
    |   |   |   |-- update.ts
    |   |   |-- distPrices
    |   |   |   |-- index.ts
    |   |   |   |-- prices.json
    |   |   |-- distributionRequest
    |   |   |   |-- create.ts
    |   |   |   |-- get-req.ts
    |   |   |   |-- index.ts
    |   |   |-- distributor
    |   |   |   |-- get-user.ts
    |   |   |   |-- index.ts
    |   |   |   |-- login.ts
    |   |   |   |-- register.ts
    |   |   |   |-- updateProfile.ts
    |   |   |-- eqipmentRequest
    |   |   |   |-- create.ts
    |   |   |   |-- get-req.ts
    |   |   |   |-- index.ts
    |   |   |-- equipment
    |   |   |   |-- create.ts
    |   |   |   |-- get-equipment.ts
    |   |   |   |-- index.ts
    |   |   |-- expert
    |   |   |   |-- get-experts.ts
    |   |   |   |-- index.ts
    |   |   |   |-- login.ts
    |   |   |   |-- register.ts
    |   |   |   |-- update.ts
    |   |   |-- farmer
    |   |   |   |-- get-farmers.ts
    |   |   |   |-- index.ts
    |   |   |   |-- login.ts
    |   |   |   |-- register.ts
    |   |   |   |-- update.ts
    |   |   |-- order
    |   |   |   |-- create.ts
    |   |   |   |-- get-orders.ts
    |   |   |   |-- index.ts
    |   |   |-- product
    |   |   |   |-- create.ts
    |   |   |   |-- get.ts
    |   |   |   |-- index.ts
    |   |   |-- productCart
    |   |       |-- create.ts
    |   |       |-- get-cart.ts
    |   |       |-- index.ts
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
    |   |   |-- check-business.ts
    |   |   |-- check-distributor.ts
    |   |   |-- check-expert.ts
    |   |   |-- check-farmer.ts
    |   |   |-- index.ts
    |   |-- models
    |   |   |-- Appointment.ts
    |   |   |-- Business.ts
    |   |   |-- Crop.ts
    |   |   |-- DistributionRequest.ts
    |   |   |-- Distributor.ts
    |   |   |-- Equipment.ts
    |   |   |-- EquipmentRequest.ts
    |   |   |-- Expert.ts
    |   |   |-- Farmer.ts
    |   |   |-- Order.ts
    |   |   |-- Product.ts
    |   |   |-- ProductCart.ts
    |   |   |-- Template
    |   |   |-- User.ts
    |   |-- services
    |   |   |-- EmailService.ts
    |   |-- subscribers
    |   |   |-- EventHandlers.ts
    |   |-- tests
    |   |   |-- productapi.test.ts
    |   |   |-- test.loader.ts
    |   |   |-- userapi.test.ts
    |   |-- utils
    |       |-- compare-password.ts
    |       |-- generate-token.ts
    |       |-- index.ts
    |-- uploads
