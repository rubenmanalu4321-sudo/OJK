# Project Sertifikasi BNSP - Pengembangan Web dengan Node.js dan React

Project latihan sesuai Tugas Praktik Demonstrasi:
- Backend Express.js CRUD Data Siswa
- Frontend React.js CRUD
- MySQL
- Axios
- Bootstrap
- Git/GitHub

## Struktur
- `backend/` API Express + MySQL
- `frontend/` React + Bootstrap + Axios
- `database.sql` database dan contoh SQL

## Jalankan
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Buka frontend di `http://localhost:3000`.

## API
GET    /api/siswa
GET    /api/siswa/:id
POST   /api/siswa
PUT    /api/siswa/:id
DELETE /api/siswa/:id

## Git
```bash
git init
git add .
git commit -m "initial project"
git branch -M main
git remote add origin https://github.com/USERNAME/data-siswa-backend.git
git push -u origin main
```
Untuk frontend, buat repository terpisah sesuai instruksi tugas.