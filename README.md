# ServeHub — React Frontend

A full React frontend for the Service Provider Marketplace API.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (runs on :3000, proxies API to :5000)
npm run dev
```

> Make sure your backend is running on port 5000 first.

## 📁 Structure

```
src/
├── api/
│   └── axios.js          # Axios with auto token refresh
├── context/
│   └── AuthContext.jsx   # Global auth state + login/logout
├── components/
│   ├── UI.jsx            # Btn, Input, Card, Modal, Badge, etc.
│   └── Sidebar.jsx       # Shared sidebar with nav + logout
├── pages/
│   ├── auth/
│   │   ├── Login.jsx     # Provider + Admin login (tabbed)
│   │   └── Register.jsx  # 3-step provider registration
│   ├── provider/
│   │   ├── Layout.jsx    # Sidebar wrapper
│   │   ├── Dashboard.jsx # Stats + service preview
│   │   ├── Services.jsx  # Full CRUD for services
│   │   ├── Portfolio.jsx # Upload/delete portfolio images
│   │   └── Profile.jsx   # Edit profile + change password
│   └── admin/
│       ├── Layout.jsx    # Admin sidebar wrapper
│       ├── Dashboard.jsx # Platform stats + recent providers
│       ├── Providers.jsx # Full provider management table
│       └── Admins.jsx    # Admin account management
└── App.jsx               # Router with protected routes
```

## 🔐 Auth Flow

- Login stores `accessToken`, `refreshToken`, `user`, and `role` in localStorage
- Axios interceptor auto-refreshes expired tokens
- Routes are protected by role: `provider`, `admin`, `superadmin`
- Deactivated accounts are blocked with a clear error message

## 🗺 Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login for providers + admins |
| `/register` | Public | 3-step provider registration |
| `/provider` | Provider | Dashboard with stats |
| `/provider/services` | Provider | Add/edit/delete services |
| `/provider/portfolio` | Provider | Upload portfolio images |
| `/provider/profile` | Provider | Edit profile + avatar |
| `/admin` | Admin | Platform stats |
| `/admin/providers` | Admin | Approve/deactivate providers |
| `/admin/admins` | Superadmin | Manage admin accounts |

## 🧰 Tech Stack

| Lib | Purpose |
|-----|---------|
| React 18 | UI framework |
| React Router 6 | Client-side routing |
| Axios | HTTP client + interceptors |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Vite | Build tool |

## 🎨 Design

- **Font**: Syne (headings) + DM Sans (body)
- **Color**: Warm off-white background with terracotta accent
- **Admin**: Blue accent variant
- No CSS framework — all styles inline with CSS variables for easy theming

## 🔧 Customization

Change the API base URL in `vite.config.js`:
```js
proxy: {
  '/api': { target: 'http://your-backend-url:5000' }
}
```

Change theme colors in `src/index.css` `:root` block.
