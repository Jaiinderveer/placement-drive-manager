# Placement Drive Manager

A full-stack web application for managing campus placement drives at Guru Nanak Dev Engineering College (GNDEC), Ludhiana.

## Features

- Add placement drives with company name, job role, date and time, and eligible branch.
- Optionally specify minimum CGPA and job type.
- View saved placement drives in a dashboard.
- Validate required fields, CGPA, and job type.
- Store records persistently in PostgreSQL using Prisma ORM.
- Display loading, empty, and submission feedback states.
- Responsive UI built with Next.js, React, and Tailwind CSS.

## Tech Stack

- **Frontend:** Next.js App Router, React, Tailwind CSS
- **Backend:** Next.js Route Handlers
- **Database:** PostgreSQL
- **ORM:** Prisma

## Prerequisites

Install the following before running the project:

- Node.js and npm
- PostgreSQL
- Git

## Setup

### 1. Clone the repository

```bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
cd placement-drive-manager
```

Replace the URL above with your actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/placement_manager?schema=public"
```

Replace `USERNAME` and `PASSWORD` with your local PostgreSQL credentials. Never commit your real `.env` file or database password.

### 4. Apply database migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Documentation

### `GET /api/drives`

Returns placement drives ordered by drive date in ascending order.

**Success response:** `200 OK`

Returns a JSON array of placement drive records.

**Error response:** `500 Internal Server Error` if the server cannot retrieve the records.

### `POST /api/drives`

Creates a new placement drive.

**Required fields**

| Field | Type |
|---|---|
| `companyName` | String |
| `role` | String |
| `driveDate` | ISO-compatible date/time string |
| `eligibleBranch` | String |

**Optional fields**

| Field | Type | Accepted values |
|---|---|---|
| `minCGPA` | Number | 0–10 |
| `jobType` | String | `Internship`, `Full-Time`, `Other` |

**Example request**

```json
{
  "companyName": "Google",
  "role": "Software Engineer Intern",
  "driveDate": "2026-11-15T10:00:00.000Z",
  "eligibleBranch": "CSE",
  "minCGPA": 7.5,
  "jobType": "Internship"
}
```

**Responses**

- `201 Created` — record successfully created.
- `400 Bad Request` — required fields or validation rules are not satisfied.
- `500 Internal Server Error` — unexpected server/database error.

## Database

The application uses a PostgreSQL database managed through Prisma. The schema and migration files are included in the repository so the database structure can be recreated.

## Screenshots

Add screenshots of the dashboard, saved placement drives, and API tests here before submission.

## Author

Developed as a placement drive management project for GNDEC Ludhiana.