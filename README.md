# Tickitz Frontend

<p align="center">
  <img src="./src/assets/logo.png" alt="Tickitz Logo" width="250"/>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)
<br>
Frontend application for Tickitz, an online movie ticket booking platform. This application allows users to browse movies, view schedules, select seats, make bookings, and manage their accounts through an intuitive and responsive interface.

## Tech Stacks

- [![React](https://img.shields.io/badge/React-v18.2.0-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-v7.0.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-latest-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
- [![Axios](https://img.shields.io/badge/Axios-latest-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
- [![SweetAlert2](https://img.shields.io/badge/SweetAlert2-latest-FF69B4)](https://sweetalert2.github.io/)

## Design Philosophy

The frontend is built with a focus on:

- User-friendly experience
- Responsive design across devices
- Component reusability
- Maintainable code structure
- Efficient state management
- Scalable feature development

## Features

- User Authentication (Login & Register)
- Browse Movies
- View Movie Details
- Search Movies
- Ticket Booking
- Seat Selection
- Payment Integration
- User Profile Management
- Booking History
- Admin Dashboard
- Movie Management
- Responsive Design

## How to Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-organization/tickitz-frontend.git
cd tickitz-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the `.env` file or create one in the project root:

```bash
cp .env.example .env
```

Then set the backend API URL:

```env
VITE_API_URL=http://localhost:8081
```

### 4. Run Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:5173
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/
├── components/
├── config/
├── context/
├── data/
├── hooks/
├── layouts/
├── pages/
├── redux/
├── styles/
├── utils/
├── AppRouter.jsx
└── main.jsx
```

## Preview

### Home Page
![Home](./src/assets/home.png)

### Movie Detail
![Movie Detail](./src/assets/movie-detail.png)

### Admin Dashboard
![Admin Dashboard](./src/assets/admin-dashboard.png)

## How to Contribute

1. Fork this repository.
2. Clone your fork.

```bash
git clone https://github.com/your-username/tickitz-frontend.git
```

3. Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes.

5. Commit your changes.

```bash
git commit -m "feat: add movie management page"
```

6. Push your branch.

```bash
git push origin feature/your-feature-name
```

7. Create a Pull Request.

## License

This project is licensed under the MIT License.

## Related Projects

[Backend](https://github.com/anggavb/tickitz-backend.git)