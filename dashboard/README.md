# Job Queue Dashboard

React + Vite dashboard for the BullMQ email queue API.

## Stack

- React
- Vite
- TailwindCSS
- TanStack Query
- Socket.IO Client
- React Router
- shadcn/ui-style local components
- Recharts

## Run

```bash
npm install
npm run dev
```

By default the Vite dev server proxies `/api` and `/socket.io` to `http://localhost:4000`.
Set `VITE_API_BASE_URL` or `VITE_SOCKET_URL` if the API runs elsewhere.
