# ⚙️ Event Horizon API (Server)

The robust engine powering the Event Horizon booking system. This API handles data persistence, security, and the business logic for event scheduling.

## 🛠️ Backend Features
* **RESTful API:** Endpoints for event CRUD operations, user registration, and bookings.
* **JWT Security:** Middleware for verifying user tokens and protecting sensitive routes.
* **Data Validation:** Strict Mongoose schemas to ensure data integrity.
* **CORS Enabled:** Configured to securely communicate with the [Frontend Repository](https://github.com/fariha-09/Event-management.git).

## 📡 API Endpoints (Quick Look)
- `POST /api/auth/register` - New User registration
- `POST /api/auth/login` - User authentication
- `GET /api/events` - Fetch all events
- `POST /api/bookings` - Book a specific event (Private)
