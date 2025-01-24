# Stryktipset App

A modern web application for managing Stryktipset betting pools. Users can register, place bets, and compete with others in a friendly environment.

## Features

- User registration and authentication
- Admin panel for user management
- Real-time match updates
- Interactive betting interface
- Leaderboard and competition tracking
- Automatic result updates
- Payment handling for bets
- Historical data and statistics

## Tech Stack

### Backend
- Python 3.11+
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Query
- React Router

## Getting Started

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- PostgreSQL 14 or higher

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a .env file with your configuration:
```bash
cp .env.example .env
```

6. Run migrations:
```bash
alembic upgrade head
```

7. Start the server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
