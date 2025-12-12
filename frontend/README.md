# 📇 Contact Manager - Fullstack Web Application

Aplikasi manajemen kontak berbasis web dengan fitur CRUD lengkap (Create, Read, Update, Delete). Dibangun menggunakan React.js untuk frontend dan Express.js + MySQL untuk backend.

![Contact Manager](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ **Create Contact** - Tambah kontak baru dengan validasi
- ✅ **Read Contact** - Lihat daftar semua kontak dalam bentuk tabel
- ✅ **Update Contact** - Edit informasi kontak yang sudah ada
- ✅ **Delete Contact** - Hapus kontak dengan konfirmasi
- ✅ **Search** - Cari kontak berdasarkan nama, email, atau nomor telepon
- ✅ **Validation** - Validasi input di frontend dan backend (Zod)
- ✅ **Responsive Design** - Tampilan optimal di desktop dan mobile
- ✅ **Real-time Updates** - Data otomatis refresh setelah CRUD operation

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18.2.0) - UI Library
- **Vite** (v5.0.8) - Build Tool & Dev Server
- **Axios** (v1.6.2) - HTTP Client
- **TailwindCSS** (v3.3.6) - CSS Framework

### Backend
- **Node.js** (v16+) - JavaScript Runtime
- **Express.js** (v4.18.2) - Web Framework
- **MySQL** (v8.0+) - Database
- **Zod** (v3.22.4) - Schema Validation
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **dotenv** (v16.3.1) - Environment Variables

### Development Tools
- **npm** - Package Manager
- **Postman** - API Testing (Optional)
- **Git** - Version Control

---

## 📦 Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

### 1. Node.js & npm
- **Download:** https://nodejs.org/
- **Versi Minimum:** Node.js v16.x, npm v8.x
- **Recommended:** Node.js v18.x atau v20.x (LTS)

**Cek versi:**
```bash
node --version
npm --version
```

### 2. MySQL
- **Download:** https://dev.mysql.com/downloads/mysql/
- **Alternative:** XAMPP (https://www.apachefriends.org/)
- **Versi Minimum:** MySQL 8.0+

**Cek instalasi:**
```bash
mysql --version
```

### 3. Git (Optional)
- **Download:** https://git-scm.com/
- Untuk clone repository dan version control

### 4. Text Editor
- **VS Code** (Recommended): https://code.visualstudio.com/
- Atau text editor lainnya

---

## 🚀 Installation

### Step 1: Clone atau Download Project

**Option A: Clone dengan Git**
```bash
git clone https://github.com/username/contact-manager.git
cd contact-manager
```

**Option B: Download Manual**
- Download ZIP dari repository
- Extract ke folder pilihan Anda

---

### Step 2: Setup Database

1. **Buka MySQL:**
```bash
mysql -u root -p
# Masukkan password MySQL Anda
```

2. **Jalankan Script SQL:**
```sql
-- Buat database
CREATE DATABASE IF NOT EXISTS contact_manager;

-- Gunakan database
USE contact_manager;

-- Buat tabel contacts
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO contacts (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '+62812345678', 'Jl. Sudirman No. 123, Jakarta'),
('Jane Smith', 'jane.smith@email.com', '+62823456789', 'Jl. Thamrin No. 456, Jakarta'),
('Michael Brown', 'michael.brown@email.com', '+62834567890', 'Jl. Gatot Subroto No. 789, Jakarta');
```

3. **Verifikasi:**
```sql
SELECT * FROM contacts;
EXIT;
```

---

### Step 3: Setup Backend

1. **Masuk ke folder backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

Dependencies yang akan terinstall:
- express (Web framework)
- mysql2 (MySQL driver)
- dotenv (Environment variables)
- cors (CORS handling)
- zod (Validation)
- nodemon (Auto-restart server)

3. **Buat file `.env`:**
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

4. **Edit file `.env`:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=contact_manager
PORT=5000
```

**⚠️ PENTING:** Sesuaikan `DB_PASSWORD` dengan password MySQL Anda!

---

### Step 4: Setup Frontend

1. **Buka terminal baru, masuk ke folder frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

Dependencies yang akan terinstall:
- react & react-dom (UI library)
- axios (HTTP client)
- vite (Build tool)
- tailwindcss (CSS framework)

**Proses instalasi memakan waktu 2-5 menit.**

---

## ⚙️ Configuration

### Backend Configuration (`.env`)

File `.env` di folder `backend/`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=contact_manager

# Server Configuration
PORT=5000
```

### Frontend Configuration

File `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:5000/api/contacts';
```

**⚠️ Catatan:** Jika backend menggunakan port lain, update URL di sini.

---

## 🎮 Running the Application

### Menjalankan Backend

1. **Buka terminal di folder `backend/`:**
```bash
cd backend
npm run dev
```

2. **Output yang benar:**
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

**⚠️ JANGAN CLOSE TERMINAL INI!** Backend harus tetap running.

3. **Test Backend:**

Buka browser: `http://localhost:5000`

Atau test dengan Postman:
```
GET http://localhost:5000/api/contacts
```

---

### Menjalankan Frontend

1. **Buka terminal BARU, masuk ke folder `frontend/`:**
```bash
cd frontend
npm run dev
```

2. **Output yang benar:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**⚠️ JANGAN CLOSE TERMINAL INI!** Frontend harus tetap running.

3. **Buka Aplikasi:**

Buka browser: **http://localhost:5173**

---

### Menjalankan Keduanya

**Anda perlu 2 terminal yang running:**

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Output: Server running on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:5173/
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/contacts
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/contacts` | Get all contacts | - |
| GET | `/api/contacts/:id` | Get contact by ID | - |
| POST | `/api/contacts` | Create new contact | JSON |
| PUT | `/api/contacts/:id` | Update contact | JSON |
| DELETE | `/api/contacts/:id` | Delete contact | - |

### Request & Response Examples

#### 1. GET All Contacts
```bash
GET http://localhost:5000/api/contacts
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@email.com",
      "phone": "+62812345678",
      "address": "Jl. Sudirman No. 123, Jakarta",
      "created_at": "2025-12-03T10:30:00.000Z",
      "updated_at": "2025-12-03T10:30:00.000Z"
    }
  ]
}
```

#### 2. POST Create Contact
```bash
POST http://localhost:5000/api/contacts
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@email.com",
  "phone": "+62898765432",
  "address": "Jakarta"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "id": 4,
    "name": "Alice Johnson",
    "email": "alice@email.com",
    "phone": "+62898765432",
    "address": "Jakarta"
  }
}
```

#### 3. PUT Update Contact
```bash
PUT http://localhost:5000/api/contacts/1
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@email.com"
}
```

#### 4. DELETE Contact
```bash
DELETE http://localhost:5000/api/contacts/1
```

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 📁 Project Structure

```
contact-manager/
│
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection
│   ├── controllers/
│   │   └── contactController.js # CRUD logic
│   ├── routes/
│   │   └── contactRoutes.js     # API routes
│   ├── validations/
│   │   └── contactValidation.js # Zod validation schemas
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js           # Axios API calls
│   │   ├── App.jsx              # Main component
│   │   ├── index.css            # Tailwind CSS
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/
│   └── schema.sql               # Database schema
│
├── .gitignore
└── README.md                    # This file
```

---

## 📸 Screenshots

### Main Interface
![Main Interface](screenshots/main.png)

### Add Contact Form
![Add Contact](screenshots/add-contact.png)

### Contact List Table
![Contact List](screenshots/contact-list.png)

---

## 🧪 Testing

### Manual Testing

1. **Test Create:**
   - Klik form "Add Contact"
   - Isi Name, Phone, Email
   - Klik "Add"
   - Kontak baru muncul di table

2. **Test Search:**
   - Ketik di search bar
   - Table filter real-time

3. **Test Edit:**
   - Klik button "Edit" (hijau)
   - Form terisi dengan data
   - Ubah data
   - Klik "Update"

4. **Test Delete:**
   - Klik button "Delete" (merah)
   - Konfirmasi muncul
   - Klik OK
   - Kontak terhapus

### API Testing dengan Postman

1. Import collection atau test manual
2. Test semua endpoints (GET, POST, PUT, DELETE)
3. Verifikasi response sesuai dokumentasi

---

## 🐛 Troubleshooting

### Backend Issues

#### ❌ Error: "Cannot connect to MySQL"
**Solution:**
```bash
# Cek MySQL service running
# Windows:
net start MySQL80

# Mac:
brew services start mysql

# Linux:
sudo systemctl start mysql
```

#### ❌ Error: "Port 5000 already in use"
**Solution:**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

#### ❌ Error: "Database connection failed"
**Solution:**
- Cek credentials di `.env`
- Pastikan database `contact_manager` sudah dibuat
- Test login manual: `mysql -u root -p`

---

### Frontend Issues

#### ❌ Error: "Failed to fetch contacts"
**Solution:**
- Pastikan backend running di port 5000
- Cek URL di `src/services/api.js`
- Buka console browser (F12) untuk lihat error detail

#### ❌ Error: "Port 5173 already in use"
**Solution:**
```bash
# Kill process
# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

#### ❌ Styling tidak muncul (Tailwind)
**Solution:**
```bash
# Restart dev server
# Ctrl+C, then:
npm run dev

# Hard refresh browser:
# Ctrl + Shift + R
```

---

## 🎯 Development Guidelines

### Adding New Features

1. Backend: Tambahkan controller → routes → validation
2. Frontend: Update API service → Update UI component
3. Test di Postman
4. Test di browser
5. Commit changes

### Code Style

- Use ES6+ syntax
- Use async/await for promises
- Use meaningful variable names
- Add comments for complex logic
- Follow existing folder structure

---

## 📝 Environment Variables

### Backend `.env`

```env
# Required
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=contact_manager
PORT=5000

# Optional (for future features)
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 🚢 Deployment

### Backend Deployment Options

- **Railway:** https://railway.app/
- **Render:** https://render.com/
- **Heroku:** https://heroku.com/
- **VPS:** DigitalOcean, AWS, etc.

### Frontend Deployment Options

- **Vercel:** https://vercel.com/ (Recommended)
- **Netlify:** https://netlify.com/
- **GitHub Pages:** https://pages.github.com/

### Database Deployment

- **PlanetScale:** Free MySQL hosting
- **Railway:** MySQL addon
- **AWS RDS:** Production-grade

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**[Your Name]**
- Class: 12 - Fullstack Web Developer
- School: Sekolah Developer Indonesia
- Year: 2025

---

## 🙏 Acknowledgments

- React.js Team
- Express.js Team
- TailwindCSS Team
- Vite Team
- Sekolah Developer Indonesia

---

## 📞 Support

Jika ada pertanyaan atau masalah:

1. Baca dokumentasi ini dengan teliti
2. Cek section [Troubleshooting](#troubleshooting)
3. Buka issue di GitHub repository
4. Contact: [your-email@example.com]

---

## 🎓 Learning Resources

- **React:** https://react.dev/
- **Express:** https://expressjs.com/
- **MySQL:** https://dev.mysql.com/doc/
- **TailwindCSS:** https://tailwindcss.com/docs
- **Vite:** https://vitejs.dev/

---

## 📌 Notes

- Minimal CRUD harus berfungsi agar aplikasi dapat digunakan
- Pastikan backend running sebelum menjalankan frontend
- Gunakan port default (5000 & 5173) untuk menghindari konflik
- Backup database secara berkala untuk development

---

## ✅ Quick Start Checklist

- [ ] Node.js & npm terinstall
- [ ] MySQL terinstall & running
- [ ] Database `contact_manager` sudah dibuat
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] File `.env` sudah dikonfigurasi
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Browser buka http://localhost:5173
- [ ] Aplikasi berfungsi dengan baik

---

**Built with ❤️ using React + Express + MySQL**

**Last Updated:** December 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready