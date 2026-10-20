# Placement Drive Manager

A full-stack web application for managing campus placement drives at **Guru Nanak Dev Engineering College (GNDEC), Ludhiana**. The application allows users to add placement drives, view saved records, and persist data in PostgreSQL.

## Features

- Add a placement drive with company name, role, date and time, and eligible branch.
- Optionally set a minimum CGPA and job type.
- View saved drives in a responsive dashboard.
- Validate required fields, CGPA (0–10), and job type.
- Sort placement drives by drive date.
- Persist records in PostgreSQL using Prisma ORM and migrations.
- Display loading, empty, and submission feedback states.

## Tech Stack

- **Frontend:** Next.js App Router, React, Tailwind CSS
- **Backend / API:** Next.js Route Handlers
- **Database:** PostgreSQL
- **ORM:** Prisma

## Prerequisites

Install the following:

- Node.js and npm
- PostgreSQL
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jaiinderveer/placement-drive-manager.git
cd placement-drive-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database named `placement_manager`. Then create a `.env` file in the project root with your own PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/placement_manager?schema=public"
```

Replace `USERNAME` and `PASSWORD` with your local PostgreSQL username and password. You can refer to `.env.example` for the placeholder format. **Do not commit your real `.env` file or database credentials.**

### 4. Apply migrations and generate the Prisma client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

Base URL for local development: `http://localhost:3000`

### GET `/api/drives`

Returns all placement drives ordered by `driveDate` in ascending order.

**Success:** `200 OK`

Example response:

```json
[
  {
    "id": "generated-id",
    "companyName": "Google",
    "role": "Software Engineer Intern",
    "driveDate": "2026-11-15T10:00:00.000Z",
    "eligibleBranch": "CSE",
    "minCGPA": 7.5,
    "jobType": "Internship",
    "createdAt": "2026-10-20T10:00:00.000Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  }
]
```

The values above are illustrative examples. If the database has no records, the endpoint returns an empty array (`[]`). A server/database failure returns `500 Internal Server Error`.

### POST `/api/drives`

Creates and saves a placement drive.

**Required fields**

| Field | Type | Description |
| --- | --- | --- |
| `companyName` | String | Company name |
| `role` | String | Job role |
| `driveDate` | Date/time string | Date and time of the drive |
| `eligibleBranch` | String | Eligible branch, e.g. CSE |

**Optional fields**

| Field | Type | Accepted values |
| --- | --- | --- |
| `minCGPA` | Number | From 0 to 10 |
| `jobType` | String | `Internship`, `Full-Time`, `Other` |

**Example request body**

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

| Status | Meaning |
| --- | --- |
| `201 Created` | Placement drive created successfully; response contains the created record. |
| `400 Bad Request` | Required fields are missing, date is invalid, or an optional value fails validation. |
| `500 Internal Server Error` | Unexpected server/database error. |

## Testing the API with Postman

1. Start the app using `npm run dev`.
2. For **GET**, send a request to `http://localhost:3000/api/drives`. Expect `200 OK` and a JSON array.
3. For **POST**, use the same URL, select **Body → raw → JSON**, paste the example request body above, and click **Send**. Expect `201 Created`.
4. To test validation, change `minCGPA` to `11` and send the POST request again. Expect `400 Bad Request`.

## Screenshots

Save your screenshots in a folder named `screenshots` at the project root, using these filenames. The images will appear here once you add them to the repository.

### Dashboard

![Placement Drive Manager dashboard](screenshots/dashboard.png)

### GET all placement drives — 200 OK

![Postman GET drives response](screenshots/get-drives.png)

### POST placement drive — 201 Created

![Postman successful POST response](screenshots/post-success.png)

### Validation error — 400 Bad Request

![Postman validation error response](screenshots/validation-error.png)

## Database

The database schema and migration files are included in the `prisma/` directory. Prisma migrations allow the PostgreSQL schema to be set up on another machine.

## Author

Developed as a placement drive management project for GNDEC Ludhiana.
