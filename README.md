# Tickitz Frontend
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)
<br>
Project frontend untuk aplikasi Tickitz — antarmuka pengguna berbasis Vite + React.

## Tech Stacks
- [![React](https://img.shields.io/badge/React-v18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
- [![Vite](https://img.shields.io/badge/Vite-v4.0.0-blueviolet?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Recharts](https://img.shields.io/badge/Recharts-latest-orange)](https://recharts.org/)

## Description & Features
- Single Page Application untuk membeli tiket bioskop.
- Fitur utama: daftar film, detail film, pemesanan kursi, pembayaran, halaman profil, dan dashboard admin (manajemen film).

## Logo
<p align="center">
  <img src="./src/assets/logo.png" width="200" alt="Tickitz Logo" />
</p>

## How to Setup
1. Pastikan Node.js (v16+) dan npm terpasang.
2. Salin variabel environment jika diperlukan (lihat file `.env.example` jika tersedia).

## Quickstart
```bash
# masuk ke folder frontend
cd tickitz-frontend

# install dependencies
npm install

# jalankan development server
npm run dev

# build untuk production
npm run build
```

## Design Philosophy
- Simple and component-driven: tiap UI dipisah menjadi komponen kecil dan dapat diuji.
- Mobile-first responsivity dan fokus pada UX untuk proses booking cepat.

## Preview

### Home Page
![Home](./src/assets/home.png)

### Movie Detail
![Movie Detail](./src/assets/movie-detail.png)

### Admin Dashboard
![Admin Dashboard](./src/assets/admin-dashboard.png)

## How to Contribute
- Fork repository, buat branch fitur, lalu buat pull request.
- Ikuti konvensi commit dan code style yang ada.

## License
This project is licensed under the MIT License

## Related Project
[Backend](https://github.com/anggavb/tickitz-backend.git)
