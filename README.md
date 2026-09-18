# Expense Tracker Application

A full-stack web application built for managing personal expenses, built with Java Spring Boot and React.

## Features
- **Expense Management**: Add, view, and delete expenses.
- **Categorization**: Group expenses by category (Food, Utilities, Entertainment, Transport).
- **Total Calculation**: Dynamic summary of overall spending.
- **RESTful API**: Standardized backend endpoints with Spring Boot.

## Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Data JPA, MySQL
- **Frontend**: React.js, Axios, JavaScript
- **Tools**: Maven, Git

## API Endpoints
- `GET /api/expenses` - Retrieve all expenses
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/{id}` - Delete an expense by ID

## How to Run Locally

### Backend
1. Clone the repository.
2. Update `application.properties` with your MySQL connection details.
3. Run `mvn spring-boot:run`.

### Frontend
1. Navigate to the frontend directory.
2. Run `npm install` and `npm start`.
