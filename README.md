
# 🎯 MCQ Test Platform — Admin Portal

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Local%2FAtlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> A full-featured MCQ test management system with a public test interface and a protected admin portal.

[🚀 Quick Start](#-quick-start) • [📁 Structure](#-project-structure) • [🔐 Admin Login](#-admin-login) • [🛣️ API Routes](#-api-routes) • [⚠️ Troubleshooting](#-troubleshooting)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Admin Login | JWT + Cookie-based secure admin authentication |
| 📚 Subjects | Add, update, delete subjects |
| 📝 Tests | Create and manage MCQ tests |
| ❓ Questions | Manage questions per test |
| 📊 Attempts | Track student test attempts |
| 📈 Statistics | View platform-wide stats |
| 🌐 Public Portal | Students take tests without login |

---

## 📁 Project Structure

```bash
Babamosie-ADMIN-PORTAL/
├── 📂 admin/              # Admin frontend HTML pages
├── 📂 public/             # Public test interface
├── 📂 src/
│   ├── 📂 config/         # DB connection
│   ├── 📂 middleware/     # JWT auth middleware
│   ├── 📂 models/         # Mongoose models
│   ├── 📂 routes/         # API route handlers
│   ├── 📂 scripts/        # Utility scripts
│   └── 📂 services/       # Business logic
├── 📄 .env                # Environment variables (never commit!)
├── 📄 .gitignore
├── 📄 package.json
└── 📄 server.js           # App entry point
```

---

## 🚀 Quick Start

### 1. Clone or download the project

```bash
git clone <your-repo-url>
cd babamosie-admin-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Copy this into a new `.env` file at the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/mcq_test_platform
JWT_SECRET=this-is-a-long-random-secret-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> 💡 For other laptops, use [MongoDB Atlas](https://www.mongodb.com/atlas) free tier and replace `MONGODB_URI` with the Atlas connection string.

### 4. Start MongoDB (Windows)

```cmd
net start MongoDB
```

Verify connection:

```cmd
mongosh mongodb://127.0.0.1:27017
```

### 5. Run the server

```bash
node server.js
```

With auto-reload:

```bash
npx nodemon server.js
```

---

## 🌐 URLs

| Page | URL |
|---|---|
| 🏠 Home | `http://localhost:3000/` |
| 🔐 Admin Login | `http://localhost:3000/admin/login.html` |

---

## 🔐 Admin Login

Default credentials from `.env`:

```txt
Username: admin
Password: admin123
```

> ⚠️ Change these values before deploying.

---

## 🛣️ API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Admin login |
| `POST` | `/api/admin/logout` | Admin logout |
| `GET` | `/api/admin/me` | Get current admin info |
| `GET/POST` | `/api/subjects` | Subjects CRUD |
| `GET/POST` | `/api/tests` | Tests CRUD |
| `GET/POST` | `/api/questions` | Questions CRUD |
| `GET/POST` | `/api/attempts` | Attempts tracking |
| `GET` | `/api/stats` | Platform statistics |

---

## 🗃️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Auth:** JWT + Cookie Parser
- **Database:** MongoDB (local or Atlas)
- **CORS:** Enabled with credentials
- **Frontend:** Static HTML in `/admin` and `/public`

---

## ⚠️ Troubleshooting

<details>
<summary>❌ Invalid credentials on another laptop</summary>

**Reason:** `.env` file is missing or MongoDB admin user not seeded.

**Fix:**
1. Make sure `.env` exists in the project root.
2. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` match what you are typing.
3. Restart the server after editing `.env`.
4. Add debug logs inside your login route:

```js
console.log("BODY:", req.body);
console.log("ENV USER:", process.env.ADMIN_USERNAME);
console.log("ENV PASS:", process.env.ADMIN_PASSWORD);
```

</details>

<details>
<summary>❌ MongoDB not working on another laptop</summary>

**Option 1 — Install MongoDB locally on Windows:**

```cmd
winget install -e --id MongoDB.Server
winget install MongoDB.mongosh
net start MongoDB
```

**Option 2 — Use MongoDB Atlas (recommended for sharing):**

Replace `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/mcq_test_platform
```

</details>

<details>
<summary>❌ rm not recognized on Windows</summary>

Use CMD:

```cmd
rmdir /s /q .git
```

Or PowerShell:

```powershell
Remove-Item -Recurse -Force .git
```

</details>

<details>
<summary>❌ Server starts but login still fails</summary>

Your login route may still be doing `Admin.findOne()` from MongoDB.
Replace it with direct `.env` comparison to remove the database dependency:

```js
if (
  username.trim() !== process.env.ADMIN_USERNAME ||
  password.trim() !== process.env.ADMIN_PASSWORD
) {
  return res.status(401).json({ error: "Invalid credentials" });
}
```

</details>

---

## 📦 .env.example

Share this file with collaborators instead of the real `.env`:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## 🔒 Security Notes

- ✅ `.env` is already in `.gitignore` — never push it to GitHub
- 🔑 Change `JWT_SECRET` to a long random string in production
- 🔒 Change `ADMIN_PASSWORD` before deploying publicly
- 🌐 Use HTTPS and `secure: true` in cookie options for production

---

## 📄 License

MIT — Free to use and modify.

---

<div align="center">
Made with ❤️ by <b>Babamosie</b>
</div>
```