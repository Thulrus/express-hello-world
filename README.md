# Express + PostgreSQL on Render

This is an [Express](https://expressjs.com) application with PostgreSQL database integration, designed to run on [Render](https://render.com).

## Features

- Express.js web server
- PostgreSQL database integration
- Contact form that saves to database
- View saved contact submissions
- Ready for deployment on Render

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your local database credentials:
   ```
   DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/express_hello_world
   NODE_ENV=development
   ```

3. Set up a local PostgreSQL database (see Database Setup section below)

4. Run the application:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## Database Setup (Local Development)

1. Connect to PostgreSQL as superuser:
   ```bash
   sudo -u postgres psql
   ```

2. Create database and user:
   ```sql
   CREATE DATABASE express_hello_world;
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE express_hello_world TO myuser;
   \c express_hello_world
   GRANT USAGE, CREATE ON SCHEMA public TO myuser;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO myuser;
   \q
   ```

## Deployment on Render

### Step 1: Create a PostgreSQL Database

1. Go to your Render Dashboard
2. Click "New +" and select "PostgreSQL"
3. Configure your database settings
4. Note the database connection details

### Step 2: Create a Web Service

1. Go to your Render Dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the following settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `DATABASE_URL`: Use the Internal Database URL from your PostgreSQL service
     - `NODE_ENV`: `production`

### Step 3: Deploy

Your web service will automatically deploy and be available at your Render URL once the build completes.

## Database Schema

The application creates a `contacts` table with the following structure:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

- `GET /` - Home page with contact form
- `GET /contacts` - View all contact submissions
- `POST /contacts` - Submit a new contact form