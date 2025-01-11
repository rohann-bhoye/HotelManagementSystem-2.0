# HotelManagementSystem-2.0
Here’s a README template for your project that includes sections for both React.js (frontend) and Java Spring Boot (backend).

You can customize it further as needed.

Hotel Management System
This project is a Hotel Management System with a React.js frontend and a Java Spring Boot backend.

The Hotel Management System allows hotel administrators to manage bookings, room details, and customer information efficiently. It uses a React.js frontend for user interaction and a Spring Boot backend for handling business logic and APIs.

Technologies Used
Frontend
React.js
HTML5, CSS3, JavaScript
Axios (for API communication)
Backend
Java Spring Boot
Spring Data JPA (for database access)
MySQL / PostgreSQL (database)
Maven (build tool)
Setup Instructions
Backend Setup (Spring Boot)
Clone the repository:

git clone (https://github.com/rohann-bhoye/HotelManagementSystem-2.0.git)
cd HotelManagementSystem/backend
Configure the database:

Update application.properties or application.yml with your database credentials:
properties

spring.datasource.url=jdbc:mysql://localhost:3306/hotel_management
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Build and run the backend:

mvn clean install
mvn spring-boot:run
Verify backend:
The backend runs on http://localhost:8080.

Frontend Setup (React.js)
Navigate to the frontend folder:

cd frontend
Install dependencies:

npm install
Start the development server:

npm start
Access the frontend:
The React app runs on http://localhost:3000.

Project Structure

HotelManagementSystem/
│
├── backend/
│ ├── src/main/java/com/example/hotelmanagement
│ │ ├── controller/ # REST Controllers
│ │ ├── service/ # Business Logic
│ │ ├── model/ # Entity Classes
│ │ └── repository/ # Database Repositories
│ └── application.properties
│
└── frontend/
├── src/
│ ├── components/ # React Components
│ ├── pages/ # Pages for routing
│ ├── services/ # API services using Axios
│ └── App.js
└── package.json
API Endpoints
Method Endpoint Description
GET /api/rooms Get all available rooms
POST /api/bookings Create a new booking
GET /api/bookings/{id} Get details of a specific booking
PUT /api/bookings/{id} Update a booking
DELETE /api/bookings/{id} Delete a booking

Screen Shot:

Login Page
image

Admin Dashbord
image

Customer Profile
image

Room Booking Section
image

Contributors

Thank you to the following people for contributing to this project:

Rohan Somnath Bhoye (rohanbhoye1234@gmail.com)
Nilambari Shivmurti Kothavale (kothavalenilu@gmail.com)
Naveen T (naveenfaxy1098@gmail.com)
