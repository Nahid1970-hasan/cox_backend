# Node.js + MySQL Backend

A clean, MVC-structured REST API built with **Node.js**, **Express**, and **MySQL** (`mysql2`).
Includes user management with **roles**, **password hashing** (bcrypt), and Django-style URL paths.

## Project Structure

```
node-mysql-backend/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── server.js
├── config/
│   └── db.js
├── uploads/                 (auto-created on first upload, gitignored)
├── routes/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   ├── clientRoutes.js
│   ├── blogRoutes.js
│   ├── invoiceRoutes.js
│   ├── companyInfoRoutes.js
│   ├── contactRoutes.js
│   └── uploadRoutes.js
├── controllers/
│   ├── userController.js
│   ├── projectController.js
│   ├── clientController.js
│   ├── blogController.js
│   ├── invoiceController.js
│   ├── companyInfoController.js
│   ├── contactController.js
│   └── uploadController.js
└── models/
    ├── userModel.js
    ├── projectModel.js
    ├── clientModel.js
    ├── blogModel.js
    ├── invoiceModel.js
    ├── companyInfoModel.js
    └── contactModel.js
```

## Prerequisites

- Node.js v16+
- MySQL Server

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure your database in `.env`:

   ```env
   PORT=5000

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=node_mysql_backend
   ```

3. Create the database in MySQL:

   ```sql
   CREATE DATABASE node_mysql_backend;
   ```

   The `users` table is auto-created on server start.

4. Run the server:

   ```bash
   npm run dev    # with nodemon
   npm start      # production
   ```

## Database Schema – `users`

| Column      | Type                                                  | Notes                |
| ----------- | ----------------------------------------------------- | -------------------- |
| id          | INT, PK, AUTO_INCREMENT                               |                      |
| name        | VARCHAR(100)                                          | required             |
| email       | VARCHAR(150)                                          | required, **unique** |
| password    | VARCHAR(255)                                          | bcrypt hashed        |
| phone       | VARCHAR(20)                                           | nullable             |
| age         | INT                                                   | nullable             |
| role        | ENUM('admin', 'manager', 'staff', 'user')             | default `user`       |
| is_active   | TINYINT(1)                                            | default `1`          |
| created_at  | TIMESTAMP                                             | default `now()`      |
| updated_at  | TIMESTAMP                                             | auto-updated         |

> If you previously created a `users` table with the simpler schema, drop it first so the new one is created on startup:
> `DROP TABLE users;`

## Database Schema – `projects`

| Column      | Type            | Notes                |
| ----------- | --------------- | -------------------- |
| project_id  | INT, PK, AUTO_INCREMENT |              |
| name        | VARCHAR(200)    | required             |
| url         | VARCHAR(500)    | nullable             |
| img         | VARCHAR(500)    | nullable (image URL) |
| date        | DATE            | nullable, `YYYY-MM-DD` |
| is_active   | TINYINT(1)      | default `1` (used by public dashboard) |
| created_at  | TIMESTAMP       | default `now()`      |
| updated_at  | TIMESTAMP       | auto-updated         |

## API Endpoints

Base URL: `http://localhost:5000`

### List / Create

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| GET    | `/api/dashboarduser/`     | List all users                   |
| POST   | `/api/dashboarduser/`     | Create a user                    |
| GET    | `/api/alluser/`           | List all users                   |
| POST   | `/api/alluser/`           | Create a user                    |
| GET    | `/api/addusers/`          | List all users                   |
| POST   | `/api/addusers/`          | Create a user                    |

### Detail / Update / Delete

| Method     | Endpoint                          | Description                       |
| ---------- | --------------------------------- | --------------------------------- |
| GET        | `/api/alluser/:id/`               | Get one user (for edit modal etc) |
| PUT/PATCH  | `/api/alluser/:id/`               | Update a user                     |
| GET        | `/api/updateusers/:id/`           | Get one user                      |
| PUT/PATCH  | `/api/updateusers/:id/`           | Update a user                     |
| PUT/PATCH  | `/api/updateusers/:id/role/`      | Update **only** a user's role     |
| DELETE     | `/api/deleteusers/:id/`           | Delete a user                     |

### Request Body

**Create** (`POST`):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "phone": "+8801712345678",
  "age": 28,
  "role": "staff",
  "is_active": true
}
```

**Update** (`PUT`/`PATCH`) — send only the fields you want to change.

**Update Role** (`PUT/PATCH /api/updateusers/:id/role/`):

```json
{ "role": "admin" }
```

Allowed roles: `admin`, `manager`, `staff`, `user`.

### Example: create user

```bash
curl -X POST http://localhost:5000/api/addusers/ \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John\",\"email\":\"john@example.com\",\"password\":\"secret123\",\"role\":\"staff\"}"
```

### Example: change role

```bash
curl -X PATCH http://localhost:5000/api/updateusers/1/role/ \
  -H "Content-Type: application/json" \
  -d "{\"role\":\"admin\"}"
```

### Example: delete user

```bash
curl -X DELETE http://localhost:5000/api/deleteusers/1/
```

## Database Schema – `clients`

| Column      | Type            | Notes                |
| ----------- | --------------- | -------------------- |
| client_id   | INT, PK, AUTO_INCREMENT |              |
| client_name | VARCHAR(150)    | required             |
| address     | VARCHAR(500)    | nullable             |
| phone_no    | VARCHAR(30)     | nullable             |
| email       | VARCHAR(150)    | nullable, **unique** |
| img         | VARCHAR(500)    | nullable (logo / image URL) |
| is_active   | TINYINT(1)      | default `1` (used by public dashboard) |
| created_at  | TIMESTAMP       | default `now()`      |
| updated_at  | TIMESTAMP       | auto-updated         |

## Database Schema – `blogs`

| Column      | Type            | Notes                |
| ----------- | --------------- | -------------------- |
| blog_id     | INT, PK, AUTO_INCREMENT |              |
| title       | VARCHAR(255)    | required             |
| description | TEXT            | nullable             |
| img         | VARCHAR(500)    | nullable (image URL) |
| author      | VARCHAR(150)    | nullable             |
| date        | DATE            | nullable, `YYYY-MM-DD` |
| is_active   | TINYINT(1)      | default `1` (used by public dashboard) |
| created_at  | TIMESTAMP       | default `now()`      |
| updated_at  | TIMESTAMP       | auto-updated         |

## Database Schema – `billing_invoices`

| Column          | Type                                                              | Notes                          |
| --------------- | ----------------------------------------------------------------- | ------------------------------ |
| invoice_id      | INT, PK, AUTO_INCREMENT                                           |                                |
| invoice_number  | VARCHAR(50)                                                       | required, **unique**, auto-generated if omitted |
| client_id       | INT                                                               | optional reference             |
| client_name     | VARCHAR(150)                                                      | required                       |
| client_email    | VARCHAR(150)                                                      | nullable                       |
| client_phone    | VARCHAR(30)                                                       | nullable                       |
| client_address  | VARCHAR(500)                                                      | nullable                       |
| issue_date      | DATE                                                              | nullable, `YYYY-MM-DD`         |
| due_date        | DATE                                                              | nullable, `YYYY-MM-DD`         |
| items           | JSON                                                              | array of line items            |
| subtotal        | DECIMAL(12,2)                                                     | auto-computed from items       |
| tax_rate        | DECIMAL(5,2)                                                      | percentage, default `0`        |
| tax_amount      | DECIMAL(12,2)                                                     | auto-computed                  |
| discount        | DECIMAL(12,2)                                                     | default `0`                    |
| total           | DECIMAL(12,2)                                                     | auto-computed                  |
| status          | ENUM('draft','sent','paid','overdue','cancelled')                 | default `draft`                |
| notes           | TEXT                                                              | nullable                       |
| created_at      | TIMESTAMP                                                         | default `now()`                |
| updated_at      | TIMESTAMP                                                         | auto-updated                   |

> Each `items` element should look like `{ "description": "...", "quantity": 1, "unit_price": 100 }`. The server computes `amount = quantity * unit_price` and totals automatically.

## Database Schema – `company_info`

| Column        | Type            | Notes                |
| ------------- | --------------- | -------------------- |
| com_id        | INT, PK, AUTO_INCREMENT |              |
| company_name  | VARCHAR(200)    | required             |
| logo          | VARCHAR(500)    | nullable (image URL) |
| email         | VARCHAR(150)    | nullable             |
| phone         | VARCHAR(30)     | nullable             |
| address       | VARCHAR(500)    | nullable             |
| website       | VARCHAR(255)    | nullable             |
| about         | TEXT            | nullable             |
| is_active     | TINYINT(1)      | default `1`          |
| created_at    | TIMESTAMP       | default `now()`      |
| updated_at    | TIMESTAMP       | auto-updated         |

## Database Schema – `contacts`

| Column      | Type            | Notes                |
| ----------- | --------------- | -------------------- |
| contact_id  | INT, PK, AUTO_INCREMENT |              |
| name        | VARCHAR(150)    | required             |
| email       | VARCHAR(150)    | required             |
| phone       | VARCHAR(30)     | nullable             |
| subject     | VARCHAR(255)    | nullable             |
| message     | TEXT            | required             |
| is_read     | TINYINT(1)      | default `0`          |
| created_at  | TIMESTAMP       | default `now()`      |
| updated_at  | TIMESTAMP       | auto-updated         |

## Project Endpoints

Base URL: `http://localhost:5000`

| Method     | Endpoint                                   | Description                          |
| ---------- | ------------------------------------------ | ------------------------------------ |
| GET        | `/api/projectdashboard/`                   | List all projects                    |
| POST       | `/api/projectdashboard/`                   | Create a project                     |
| GET        | `/api/project_public_dashboard/`           | List **active** projects only        |
| GET        | `/api/projectall/:projectId/`              | Get one project                      |
| PUT/PATCH  | `/api/projectall/:projectId/`              | Update a project                     |
| GET        | `/api/add_project/`                        | List projects                        |
| POST       | `/api/add_project/`                        | Create a project                     |
| GET        | `/api/update_project/:projectId/`          | Get one project                      |
| PUT/PATCH  | `/api/update_project/:projectId/`          | Update a project                     |
| DELETE     | `/api/delete_project/:projectId/`          | Delete a project                     |

### Project request body

```json
{
  "name": "Cox Hotel Booking",
  "url": "https://example.com/cox",
  "img": "https://cdn.example.com/cox.png",
  "date": "2026-05-17",
  "is_active": true
}
```

### Examples

```bash
curl -X POST http://localhost:5000/api/add_project/ \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Cox Hotel\",\"url\":\"https://example.com\",\"img\":\"https://cdn.example.com/p.png\",\"date\":\"2026-05-17\"}"

curl http://localhost:5000/api/projectdashboard/

curl http://localhost:5000/api/project_public_dashboard/

curl -X PATCH http://localhost:5000/api/update_project/1/ \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Cox Hotel v2\"}"

curl -X DELETE http://localhost:5000/api/delete_project/1/
```

## Client Endpoints

Base URL: `http://localhost:5000`

| Method     | Endpoint                                 | Description                          |
| ---------- | ---------------------------------------- | ------------------------------------ |
| GET        | `/api/clientdashboard/`                  | List all clients                     |
| POST       | `/api/clientdashboard/`                  | Create a client                      |
| GET        | `/api/client_public_dashboard/`          | List **active** clients only         |
| GET        | `/api/clientall/:clientId/`              | Get one client                       |
| PUT/PATCH  | `/api/clientall/:clientId/`              | Update a client                      |
| GET        | `/api/add_client/`                       | List clients                         |
| POST       | `/api/add_client/`                       | Create a client                      |
| GET        | `/api/update_client/:clientId/`          | Get one client                       |
| PUT/PATCH  | `/api/update_client/:clientId/`          | Update a client                      |
| DELETE     | `/api/delete_client/:clientId/`          | Delete a client                      |

### Client request body

```json
{
  "client_name": "Acme Corp",
  "address": "123 Main St, Cox's Bazar",
  "phone_no": "+8801712345678",
  "email": "contact@acme.com",
  "is_active": true
}
```

### Examples

```bash
curl -X POST http://localhost:5000/api/add_client/ \
  -H "Content-Type: application/json" \
  -d "{\"client_name\":\"Acme Corp\",\"address\":\"123 Main St\",\"phone_no\":\"+8801712345678\",\"email\":\"contact@acme.com\"}"

curl http://localhost:5000/api/clientdashboard/

curl http://localhost:5000/api/client_public_dashboard/

curl -X PATCH http://localhost:5000/api/update_client/1/ \
  -H "Content-Type: application/json" \
  -d "{\"phone_no\":\"+8801999999999\"}"

curl -X DELETE http://localhost:5000/api/delete_client/1/
```

## Blog Endpoints

Base URL: `http://localhost:5000`

| Method     | Endpoint                              | Description                          |
| ---------- | ------------------------------------- | ------------------------------------ |
| GET        | `/api/blogs_public_dashboard/`        | List **active** blogs only           |
| GET        | `/api/blogdashboard/`                 | List all blogs                       |
| POST       | `/api/blogdashboard/`                 | Create a blog                        |
| GET        | `/api/blogall/:blogId/`               | Get one blog                         |
| PUT/PATCH  | `/api/blogall/:blogId/`               | Update a blog                        |
| GET        | `/api/blog_image/:blogId/`            | Get only the blog image info         |
| GET        | `/api/add_blog/`                      | List blogs                           |
| POST       | `/api/add_blog/`                      | Create a blog                        |
| GET        | `/api/update_blog/:blogId/`           | Get one blog                         |
| PUT/PATCH  | `/api/update_blog/:blogId/`           | Update a blog                        |
| DELETE     | `/api/delete_blog/:blogId/`           | Delete a blog                        |

### Blog request body

```json
{
  "title": "Top 5 places in Cox's Bazar",
  "description": "Detailed travel guide...",
  "img": "https://cdn.example.com/blog1.png",
  "author": "Nahid",
  "date": "2026-05-17",
  "is_active": true
}
```

### `blog_image` response

```json
{
  "success": true,
  "data": {
    "blog_id": 1,
    "title": "Top 5 places in Cox's Bazar",
    "img": "https://cdn.example.com/blog1.png"
  }
}
```

### Examples

```bash
curl -X POST http://localhost:5000/api/add_blog/ \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Top 5 places\",\"description\":\"...\",\"img\":\"https://cdn.example.com/b.png\",\"author\":\"Nahid\",\"date\":\"2026-05-17\"}"

curl http://localhost:5000/api/blogdashboard/

curl http://localhost:5000/api/blogs_public_dashboard/

curl http://localhost:5000/api/blog_image/1/

curl -X PATCH http://localhost:5000/api/update_blog/1/ \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Updated title\"}"

curl -X DELETE http://localhost:5000/api/delete_blog/1/
```

## Billing Invoice Endpoints

Base URL: `http://localhost:5000`

| Method     | Endpoint                                  | Description                                  |
| ---------- | ----------------------------------------- | -------------------------------------------- |
| GET        | `/api/invoices/`                          | List all invoices                            |
| POST       | `/api/invoices/`                          | Create an invoice                            |
| GET        | `/api/invoice_generate/`                  | Same as `GET /api/invoices/`                 |
| POST       | `/api/invoice_generate/`                  | Same as `POST /api/invoices/`                |
| GET        | `/api/invoice_generate/:invoiceId/`       | **Download/preview invoice as PDF**          |
| GET        | `/api/invoices/:invoiceId/`               | Get one invoice                              |
| PUT/PATCH  | `/api/invoices/:invoiceId/`               | Update an invoice                            |
| GET        | `/api/add_invoice/`                       | List invoices                                |
| POST       | `/api/add_invoice/`                       | Create an invoice                            |
| GET        | `/api/update_invoice/:invoiceId/`         | Get one invoice                              |
| PUT/PATCH  | `/api/update_invoice/:invoiceId/`         | Update an invoice                            |
| DELETE     | `/api/delete_invoice/:invoiceId/`         | Delete an invoice                            |

### Create invoice request body

```json
{
  "client_name": "Acme Corp",
  "client_email": "billing@acme.com",
  "client_phone": "+8801712345678",
  "client_address": "123 Main St, Cox's Bazar",
  "issue_date": "2026-05-17",
  "due_date": "2026-06-01",
  "items": [
    { "description": "Web design", "quantity": 1, "unit_price": 50000 },
    { "description": "Hosting (1 yr)", "quantity": 1, "unit_price": 8000 }
  ],
  "tax_rate": 5,
  "discount": 1000,
  "status": "draft",
  "notes": "Pay via bKash / bank transfer."
}
```

The server returns the saved invoice with `invoice_number`, `subtotal`, `tax_amount`, and `total` filled in automatically.

### Examples

```bash
curl -X POST http://localhost:5000/api/add_invoice/ \
  -H "Content-Type: application/json" \
  -d "{\"client_name\":\"Acme Corp\",\"items\":[{\"description\":\"Web\",\"quantity\":1,\"unit_price\":50000}],\"tax_rate\":5}"

curl http://localhost:5000/api/invoices/

curl http://localhost:5000/api/invoices/1/

curl -X PATCH http://localhost:5000/api/update_invoice/1/ \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"paid\"}"

curl -X DELETE http://localhost:5000/api/delete_invoice/1/

# Download PDF (writes invoice.pdf next to the cwd):
curl -L -o invoice.pdf http://localhost:5000/api/invoice_generate/1/
```

Open `invoice.pdf` to see a styled, printable invoice with header, billing-to block, line-item table, subtotal/tax/discount/total, and notes.

## Company Info Endpoints

Base URL: `http://localhost:5000`

| Method     | Endpoint                                  | Description                          |
| ---------- | ----------------------------------------- | ------------------------------------ |
| GET        | `/api/companyinfo/`                       | List all company info records        |
| POST       | `/api/companyinfo/`                       | Create a company info record         |
| GET        | `/api/companyinfo/:comId/`                | Get one company info                 |
| PUT/PATCH  | `/api/companyinfo/:comId/`                | Update a company info                |
| GET        | `/api/add_companyinfo/`                   | List company info records            |
| POST       | `/api/add_companyinfo/`                   | Create a company info record         |
| GET        | `/api/update_companyinfo/:comId/`         | Get one company info                 |
| PUT/PATCH  | `/api/update_companyinfo/:comId/`         | Update a company info                |
| DELETE     | `/api/delete_companyinfo/:comId/`         | Delete a company info                |

### Company info request body

```json
{
  "company_name": "Cox Hotel Ltd.",
  "logo": "https://cdn.example.com/logo.png",
  "email": "info@coxhotel.com",
  "phone": "+8801712345678",
  "address": "Sea Beach Road, Cox's Bazar",
  "website": "https://coxhotel.com",
  "about": "Premium beachfront hotel in Cox's Bazar.",
  "is_active": true
}
```

### Examples

```bash
curl -X POST http://localhost:5000/api/add_companyinfo/ \
  -H "Content-Type: application/json" \
  -d "{\"company_name\":\"Cox Hotel Ltd.\",\"email\":\"info@coxhotel.com\",\"phone\":\"+8801712345678\"}"

curl http://localhost:5000/api/companyinfo/

curl http://localhost:5000/api/companyinfo/1/

curl -X PATCH http://localhost:5000/api/update_companyinfo/1/ \
  -H "Content-Type: application/json" \
  -d "{\"phone\":\"+8801999999999\"}"

curl -X DELETE http://localhost:5000/api/delete_companyinfo/1/
```

## Contact Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint                              | Description                          |
| ------ | ------------------------------------- | ------------------------------------ |
| GET    | `/api/contacts/`                      | List all contact submissions         |
| POST   | `/api/contacts/`                      | Submit a contact form                |
| GET    | `/api/save_contacts/`                 | List all contact submissions         |
| POST   | `/api/save_contacts/`                 | Submit a contact form (alias)        |
| DELETE | `/api/delete_contacts/:contactId/`    | Delete a contact submission          |

### Contact request body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+8801712345678",
  "subject": "Inquiry about hotel booking",
  "message": "Hi, I'd like to know your room rates for July."
}
```

`name`, `email`, and `message` are required.

### Examples

```bash
curl -X POST http://localhost:5000/api/save_contacts/ \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John\",\"email\":\"john@example.com\",\"subject\":\"Hi\",\"message\":\"Hello there\"}"

curl http://localhost:5000/api/contacts/

curl -X DELETE http://localhost:5000/api/delete_contacts/1/
```

## Authentication

JWT-based auth. The default admin is auto-created from `.env` on first startup.

### Default credentials (change in `.env`)

| Field    | Value                       |
| -------- | --------------------------- |
| Email    | `admin@coxsolution.com`     |
| Password | `admin123`                  |

### Auth endpoints

| Method | Endpoint                            | Auth   | Description                       |
| ------ | ----------------------------------- | ------ | --------------------------------- |
| POST   | `/api/login`                        | none   | Login (alias: `/api/auth/login`, `/api/signin`) |
| POST   | `/api/register`                     | none   | Register a new user (alias: `/api/auth/register`, `/api/signup`) |
| GET    | `/api/me`                           | Bearer | Current logged-in user (alias: `/api/auth/me`, `/api/profile`) |
| POST   | `/api/logout`                       | none   | Stateless — client just discards token |

### Login request

```json
{ "email": "admin@coxsolution.com", "password": "admin123" }
```

`username` is also accepted as an alias for `email`:

```json
{ "username": "admin@coxsolution.com", "password": "admin123" }
```

### Login response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
  "data": {
    "id": 1,
    "name": "Admin",
    "email": "admin@coxsolution.com",
    "role": "admin",
    "is_active": 1
  }
}
```

### Calling protected routes

Send the token as `Authorization: Bearer <token>`:

```bash
curl http://localhost:5000/api/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
```

## CORS

Configured via `CORS_ORIGINS` in `.env` (comma-separated allowlist):

```env
CORS_ORIGINS=https://cox-solution-admin.vercel.app,http://localhost:3000,http://localhost:5173,http://localhost:8080
```

The Vercel admin frontend (`https://cox-solution-admin.vercel.app`) is allowed by default. Add more origins by editing `.env` and restarting the server. Use `*` to allow all origins (not recommended for production).

## File Upload Endpoints

Files are saved to `./uploads/` on disk and served statically at `http://localhost:5000/uploads/<filename>`.

| Method | Endpoint                | Description                                          |
| ------ | ----------------------- | ---------------------------------------------------- |
| POST   | `/api/upload/`          | Upload **one** file (form field name: `file`)        |
| POST   | `/api/upload/multiple/` | Upload up to **10** files (form field name: `files`) |

- Max file size: **10 MB** per file
- Sent as `multipart/form-data`
- Returns the uploaded file's public URL — use that URL as the value of `img`/`logo` when creating/updating projects, blogs, clients, or company info.

### Single upload response

```json
{
  "success": true,
  "data": {
    "filename": "logo-1715942400000-123456789.png",
    "originalname": "logo.png",
    "mimetype": "image/png",
    "size": 24576,
    "path": "/uploads/logo-1715942400000-123456789.png",
    "url": "http://localhost:5000/uploads/logo-1715942400000-123456789.png"
  }
}
```

### Examples

Upload a single image:

```bash
curl -X POST http://localhost:5000/api/upload/ \
  -F "file=@./logo.png"
```

Upload multiple files:

```bash
curl -X POST http://localhost:5000/api/upload/multiple/ \
  -F "files=@./pic1.jpg" \
  -F "files=@./pic2.jpg"
```

### Use the uploaded URL across resources

After uploading, take the returned `url` and put it in any of these fields:

| Resource       | Field name | Endpoint to update                         |
| -------------- | ---------- | ------------------------------------------ |
| Project        | `img`      | `POST /api/add_project/` or `PATCH /api/update_project/:id/` |
| Blog           | `img`      | `POST /api/add_blog/` or `PATCH /api/update_blog/:id/` |
| Client         | `img`      | `POST /api/add_client/` or `PATCH /api/update_client/:id/` |
| Company info   | `logo`     | `POST /api/add_companyinfo/` or `PATCH /api/update_companyinfo/:id/` |

Two-step example (upload then attach to a blog):

```bash
URL=$(curl -s -X POST http://localhost:5000/api/upload/ -F "file=@./cover.png" | jq -r '.data.url')

curl -X POST http://localhost:5000/api/add_blog/ \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Beach guide\",\"img\":\"$URL\",\"author\":\"Nahid\"}"
```

## Response Shape

All endpoints return JSON in a consistent shape:

```json
{ "success": true, "data": { ... }, "message": "...", "count": 0 }
```

Passwords are **never** returned in any response.
