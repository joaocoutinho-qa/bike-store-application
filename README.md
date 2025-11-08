# Bike Store API

REST API for managing a bicycle store

## Features
- Customer management
- Product registration and management
- Scheduling of maintenance and services
- Financial control

## Authentication
- Login required to access features.

- Manager: access to all system features
- Employee: access to Customer Management and

Scheduling of maintenance and services features.

- Authentication via JWT (Bearer Token).

## Documentation
- Documentation available in `/docs` (Swagger UI).

- Swagger file in `resources/swagger.json`.

## Project Structure
- `src/routes`: API Routes
- `src/controllers`: Endpoint Logic
- `src/services`: Business Rules
- `src/models`: Models and In-Memory Database
- `src/middleware`: Authentication, Authorization, and Error Middleware
- `resources`: Swagger Documentation

## How to Run
1. Install dependencies:

``bash
npm install

``
2. Start the server:

``bash
npm api-server
npm web-server

``

3. Run the tests:

``bash
npm run api
npm run performance

```
4. Access the documentation at [http://localhost:3000/docs](http://localhost:3000/docs)

## Pre-registered Users
- Manager: `joao.coutinho` / `123456`
- Employee: `tiago.barbosa` / `123456`

## Notes
- In-memory database (data is lost upon restart).

- To customize users, edit `src/controllers/auth.controller.js`.
