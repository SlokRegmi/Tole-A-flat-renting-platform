# Tole: A Renting Solution

---

## Executive Summary

Tole is a web-based application designed to simplify the room rental process for individuals seeking accommodations. Built with a Next.js frontend and a Django REST API backend, Tole offers an interactive platform where users can explore rental properties via an open map, view detailed property information, communicate directly with property owners, and securely request property tours through integrated payment processing.

Key Features:

- Interactive Open Map with multiple rental locations.
- Google OAuth Integration for seamless and secure user authentication.
- Direct Messaging between renters and property owners.
- Khalti Payment Integration for secure and straightforward tour bookings.
- Responsive Design for accessibility across various devices.

---

## Feature List

### 1. User Authentication with Google OAuth

- Quick Sign-Up/Login: Users can register and log in using their existing Google accounts.
- Secure Authentication: Utilizes OAuth 2.0 protocol to ensure user data privacy and security.

### 2. Interactive Open Map

- Location Markers: Displays multiple rental properties on an OpenStreetMap.
- Dynamic Navigation: Users can zoom in/out and pan across different locations.
- Property Preview: Clicking on a marker reveals a snapshot of the property's key details.

### 3. Property Details Page

- Comprehensive Information: Includes photos, descriptions, amenities, and rental terms.
- Owner Information: Displays the property owner's profile for transparency.
- Direct Messaging: Users can send messages to property owners for inquiries.

### 4. Tour Request and Booking

- Schedule Tours: Users can request a property tour on available dates.
- Khalti Payment Integration: Securely process payments for tour bookings.
- Booking Confirmation: Users receive confirmation upon successful payment.

### 5. User Dashboard

- Manage Bookings: View upcoming tours and booking history.
- Message Center: Access all communications with property owners.
- Profile Settings: Update personal information and preferences.

### 6. Responsive Design

- Cross-Device Compatibility: Optimized for desktops, tablets, and mobile devices.
- User-Friendly Interface: Intuitive navigation and accessible design elements.

---

## Technical Architecture

### 1. Overview

Tole is structured as a client-server application with a clear separation of concerns between the frontend and backend. This architecture ensures scalability, maintainability, and flexibility for future enhancements.

### 2. Frontend

- Framework: Next.js (React.js)
- Features:
  - Server-side rendering for improved performance and SEO.
  - Dynamic routing for efficient navigation.
  - Integration with OpenStreetMap for the interactive map.

### 3. Backend

- Framework: Django REST Framework
- Features:
  - RESTful API endpoints for data retrieval and manipulation.
  - JWT authentication for secure API access.
  - Integration with Google OAuth and Khalti APIs.

### 4. Database

- Type: PostgreSQL
- Usage:
  - Stores user information, property listings, bookings, and messages.
  - Utilizes Django's ORM for database operations.

### 5. External Integrations

- Google OAuth API: For user authentication.
- Khalti Payment Gateway API: For processing payments.
- OpenStreetMap API: For rendering the interactive map.

### 6. Deployment

- Frontend Hosting: Vercel or similar platform for seamless Next.js deployment.
- Backend Hosting: Heroku or AWS Elastic Beanstalk for scalable backend services.
- CI/CD Pipeline: Automated testing and deployment using GitHub Actions.

### 7. System Architecture Diagram

![System Architecture Diagram](https://via.placeholder.com/800x400.png?text=System+Architecture+Diagram)

*(Note: Replace the placeholder with an actual diagram illustrating the interactions between the frontend, backend, database, and external APIs.)*

---

## Installation and Setup Guide

### 1. Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- PostgreSQL database
- Git for version control

### 2. Frontend Setup

#### Clone the Repository

```bash
git clone https://github.com/yourusername/tole-frontend.git
cd tole-frontend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_KHALTI_PUBLIC_KEY=your-khalti-public-key
```

#### Run the Development Server

```bash
npm run dev
```

Access the frontend at `http://localhost:3000`.

### 3. Backend Setup

#### Clone the Repository

```bash
git clone https://github.com/yourusername/tole-backend.git
cd tole-backend
```

#### Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://user:password@localhost:5432/tole_db
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
KHALTI_SECRET_KEY=your-khalti-secret-key
```

#### Apply Migrations

```bash
python manage.py migrate
```

#### Run the Development Server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api`.

### 4. Database Setup

Ensure PostgreSQL is running and create a database named `tole_db`.

```sql
CREATE DATABASE tole_db;
```

---

## API Documentation

### Authentication Endpoints

#### 1. Google OAuth Login

- Endpoint: `/api/auth/google/`
- Method: POST
- Description: Authenticates a user using Google OAuth tokens.
- Request Body:

```json
{
  "token": "google-oauth-token"
}
```

- Response:

```json
{
  "access_token": "jwt-access-token",
  "refresh_token": "jwt-refresh-token"
}
```

### Property Endpoints

#### 1. Get All Properties

- Endpoint: `/api/properties/`
- Method: GET
- Description: Retrieves a list of all available properties.
- Response:

```json
[
  {
    "id": 1,
    "title": "Cozy Apartment in City Center",
    "latitude": 27.7172,
    "longitude": 85.3240,
    "price": 500,
    "images": ["url1", "url2"],
    "owner": {
      "id": 1,
      "name": "John Doe"
    }
  },
  ...
]
```

### Booking Endpoints

#### 1. Request a Tour

- Endpoint: `/api/bookings/`
- Method: POST
- Authentication: Required
- Request Body:

```json
{
  "property_id": 1,
  "tour_date": "2023-10-15",
  "payment_token": "khalti-payment-token"
}
```

- Response:

```json
{
  "booking_id": 123,
  "status": "confirmed"
}
```

### Messaging Endpoints

#### 1. Send a Message to Property Owner

- Endpoint: `/api/messages/`
- Method: POST
- Authentication: Required
- Request Body:

```json
{
  "recipient_id": 2,
  "property_id": 1,
  "message": "Is this property still available?"
}
```

- Response:

```json
{
  "message_id": 456,
  "timestamp": "2023-10-10T12:34:56Z"
}
```

*(Note: Include additional endpoints as necessary, ensuring to provide clear descriptions, request/response examples, and authentication requirements.)*

---

## Development Challenges

### 1. Integrating Google OAuth

- Challenge: Ensuring secure authentication while handling OAuth tokens.
- Solution: Implemented server-side token validation and used JWT for session management.

### 2. Khalti Payment Gateway Integration

- Challenge: Handling payment callbacks and ensuring transaction security.
- Solution: Used Khalti's SDKs and API documentation to securely process payments and verify transactions server-side.

### 3. Interactive Map Performance

- Challenge: Rendering a large number of property markers without compromising performance.
- Solution: Implemented clustering of map markers and lazy loading techniques.

### 4. Cross-Origin Resource Sharing (CORS)

- Challenge: Dealing with CORS issues between the frontend and backend during development.
- Solution: Configured CORS headers in Django settings to allow requests from the frontend domain.

---

## Future Enhancements

### 1. Mobile Application Development

- Plan: Develop native Android and iOS applications to reach a broader user base.
- Benefits: Enhanced user experience with device-specific features and offline capabilities.

### 2. Advanced Search and Filters

- Plan: Implement advanced filtering options such as price range, amenities, and property type.
- Benefits: Improves user experience by allowing users to find properties that match their specific needs.

### 3. Ratings and Reviews

- Plan: Allow users to rate and review properties and property owners.
- Benefits: Builds trust within the platform and provides valuable feedback to property owners.

### 4. Multi-Language Support

- Plan: Introduce language options to cater to a diverse user base.
- Benefits: Makes the platform more accessible to non-English speaking users.

### 5. Property Owner Dashboard

- Plan: Develop a dedicated dashboard for property owners to manage listings, view bookings, and communicate with potential renters.
- Benefits: Streamlines property management and enhances owner engagement.

---

## Conclusion

Tole aims to revolutionize the room rental market by providing a user-centric platform that simplifies the search and booking process. Through its integration of modern web technologies and user-friendly features, Tole offers a seamless experience for both renters and property owners. The project holds significant potential for growth and scalability, with planned enhancements set to further solidify its position in the market.

---

## Contact Information

For any queries or contributions, please contact:

- Project Maintainer: CoderaChiya (Slok Regmi, Inap Maharjan)
- Email: slokr86@gmail.com , inapmaharjan15@gmail.com

