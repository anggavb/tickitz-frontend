# Tickitz Frontend

<p align="center">
  <img src="./src/assets/logo.png" alt="Tickitz Logo" width="250"/>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/license/mit)

Tickitz Frontend is a React application for an online movie ticket booking platform. Users can browse movies, view schedules, select seats, complete the order payment flow, and manage their profiles. Admin users can manage movies, cinema schedules, and dashboard data.

## Preview

### Home Page

![Home](./src/assets/home.png)

### Movie Detail

![Movie Detail](./src/assets/movie-detail.png)

### Admin Dashboard

![Admin Dashboard](./src/assets/admin-dashboard.png)

## Design Philosophy

The frontend is built with a focus on:

- User-friendly experience
- Responsive design across devices
- Component reusability
- Maintainable code structure
- Efficient state management
- Scalable feature development

## Tech Stack

- [![React](https://img.shields.io/badge/React-v19.2.6-blue?logo=react&logoColor=white)](https://react.dev/)
- [![Vite](https://img.shields.io/badge/Vite-v8.0.12-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-v2.12.0-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
- [![React Router](https://img.shields.io/badge/React_Router-v7.17.0-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
- [![Axios](https://img.shields.io/badge/Axios-v1.17.0-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
- [![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7.77.0-FF69B4?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
- [![Recharts](https://img.shields.io/badge/Recharts-v3.8.1-00C4CC?logo=recharts&logoColor=white)](https://recharts.org/)
- [![SweetAlert2](https://img.shields.io/badge/SweetAlert2-v11.26.25-FF69B4?logo=sweetalert2&logoColor=white)](https://sweetalert2.github.io/)

## Features

- Authentication flow: sign up, activation, sign in, forgot password, and reset password
- Movie browsing, search, and movie detail pages
- Seat booking and order payment method selection
- Ticket result page and booking history
- User profile settings
- Admin dashboard, movie management, and cinema schedule management
- Responsive layout for desktop and mobile screens

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- Running Tickitz backend API

## Getting Started

Clone the repository:

```bash
git clone https://github.com/anggavb/tickitz-frontend.git
cd tickitz-frontend
```

Install dependencies:

```bash
npm ci
```

Create the local environment file:

```bash
cp .env.example .env
```

Set the backend API URL in `.env`:

```env
VITE_APP_TITLE=Tickitz
VITE_API_URL=http://localhost:8081
```

Start the development server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run lint
```

Run ESLint checks.

```bash
npm run build
```

Create a production build in `dist/`.

```bash
npm run preview
```

Serve the production build locally for preview.

## Environment Variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `VITE_APP_TITLE` | No | `My App` | Browser document title prefix used by the app. |
| `VITE_API_URL` | No | `/api` | Backend API base URL used by the shared Axios client. |

Use `VITE_API_URL=http://localhost:8081` for local development when the backend runs directly on port `8081`. Use `/api` when serving through the included Nginx reverse proxy.

## Production Build

Build the app:

```bash
npm run build
```

Preview the generated build:

```bash
npm run preview
```

## Docker

Build the Docker image:

```bash
docker build \
  --build-arg VITE_APP_TITLE=Tickitz \
  --build-arg VITE_API_URL=/api \
  -t tickitz-frontend .
```

Run the container:

```bash
docker run --rm -p 8080:80 tickitz-frontend
```

The container serves the app with Nginx and proxies `/api/` requests to `http://backend:8081/`.

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

## Quality Checks

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Contributing

1. Fork this repository.
2. Clone your fork.

```bash
git clone https://github.com/your-username/tickitz-frontend.git
```

3. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes.
5. Run the quality checks.
6. Commit your changes.

```bash
git commit -m "feat: add movie management page"
```

7. Push your branch.

```bash
git push origin feature/your-feature-name
```

8. Create a pull request.

## Related Projects

- [Tickitz Backend](https://github.com/anggavb/tickitz-backend.git)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
