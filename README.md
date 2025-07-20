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

2. Set up a local PostgreSQL database and set the DATABASE_URL environment variable:
   ```bash
   export DATABASE_URL="postgresql://username:password@localhost:5432/express_hello_world"
   ```

3. Run the application:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
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