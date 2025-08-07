# 💻 Full Stack Developer Assessment – Next.js Project

This is a **Next.js** project bootstrapped with `create-next-app`.  
It includes **solutions to 10 full-stack assessment problems**, covering:

- ✅ Frontend logic  
- ✅ API integration  
- ✅ Authentication  
- ✅ File handling  
- ✅ Theme support  
- ✅ State management — **all without third-party UI libraries**

---

## 🚀 Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open your browser and visit: http://localhost:3000

## 🧩 Project Features (Assessment Solutions)

### ✅ 1. Convert Numbers to Roman Numerals
JavaScript logic to convert numbers from 1–100 into Roman numerals. Handles edge cases like IV, IX, XL, etc.  
📍 **Located at**: `utils/romanConverter.js`

### ✅ 2. Pagination using DummyJSON API
Fetches 10 products per page from: `https://dummyjson.com/products?limit=10&skip=0`  
Supports Next/Previous navigation with dynamic URL updates  
📍 **Located at**: `pages/products/index.js`

### ✅ 3. Debounced Search (OpenLibrary / DummyJSON)
Search input debounced by 1 second. Live suggestions fetched via API. Results shown in a dropdown.  
📍 **Located at**: `components/DebouncedSearch.js`

### ✅ 4. API Rate Limiting (Custom Logic)
Limits each IP to 10 requests/minute using a custom `Map()` store. Responds with HTTP 429 on exceeding.  
📍 **Located at**: `pages/api/limited.js`

### ✅ 5. Auth with Role-Based Access (NextAuth.js)
Sign in/out using NextAuth. Supports roles: admin, user.  
Protected Pages:  
- `/admin` → Admin only  
- `/dashboard` → Admin or User  

📍 **Located at**:  
- `pages/api/auth/[...nextauth].js`  
- `pages/admin.js`, `pages/dashboard.js`

### ✅ 6. Infinite Scroll Product List
Loads products on scroll (no buttons). Powered by IntersectionObserver.  
📍 **Located at**: `pages/products/productsInfinite.js`

### ✅ 7. Toast Notification System (No Libraries)
Supports success, error, and info. Auto-dismiss after 3s + manual close (✕).  
📍 **Located at**:  
- `components/ToastContext.js`  
- `pages/toast/ToastNotification.js`

### ✅ 8. Nested Comment Section
Users can add comments and nested replies. Renders recursively with infinite depth. Mocked in-memory storage.  
📍 **Located at**: `pages/comment/comments.js`

### ✅ 9. Light / Dark Theme Toggle
Switch between dark/light themes. Stored in localStorage. Global CSS-based class toggling.  
📍 **Located at**:  
- `components/ThemeToggle.js`  
- `context/ThemeContext.js`

### ✅ 10. File Upload with Live Preview
Preview image on file select. Upload to `/public/uploads` via API. No libraries used.  
📍 **Located at**:  
- `pages/upload/upload.js`  
- `pages/api/upload.js`


## 🌐 API Routes

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| GET    | /api/limited    | Rate-limited endpoint (10/min)  |
| POST   | /api/upload     | Image upload handler            |
| GET    | /api/auth/*     | NextAuth.js endpoints           |

---

## 🔐 Auth Protected Pages (RBAC)

| Page        | Role Required |
|-------------|----------------|
| /admin      | admin only     |
| /dashboard  | admin or user  |

---

## 📦 Tech Stack

- Next.js  
- React  
- Tailwind CSS (optional)  
- NextAuth.js  
- Vanilla JS (no UI libraries)

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth Docs](https://next-auth.js.org/)
- [DummyJSON API](https://dummyjson.com)
- [Open Library API](https://openlibrary.org/developers/api)

---

## 🚀 Deploy on Vercel

Easiest way to deploy your Next.js app is with [Vercel](https://vercel.com):

```bash
# Install globally (if needed)
npm i -g vercel

# Then deploy
vercel
```

---

## 📄 License

MIT License © 2025 Jitendra kumar