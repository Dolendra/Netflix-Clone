# 🎬 Netflix Clone — React Frontend

A pixel-perfect, fully responsive **Netflix Clone** built with **React + Vite**, featuring Firebase authentication, dynamic routing, and a rich UI that mirrors the real Netflix experience.

---

## 📸 Preview

| Home Page | Player Page | Login Page |
|-----------|-------------|------------|
| Hero banner, TitleCards, Navbar | YouTube embed with back nav | Sign In / Sign Up form |

---

## 🚀 Features

- 🔐 **Firebase Auth** — Sign In & Sign Up with persistent sessions
- 🎥 **Video Player** — Embedded YouTube trailer player with back navigation
- 🧭 **React Router** — Seamless page transitions (`/`, `/login`, `/player/:id`)
- 📜 **Dynamic Navbar** — Transparent → solid background on scroll
- 🃏 **TitleCards** — Horizontally scrollable movie/show cards with mouse-wheel support
- 🦶 **Footer** — Social links, sitemap, and copyright
- 🌙 **Dark Theme** — Full black/dark UI consistent with Netflix branding
- ⚡ **Vite** — Lightning-fast development and build tooling

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Firebase (Auth + Firestore) | Authentication & database |
| CSS Modules | Component-scoped styling |
| Google Fonts (Poppins) | Typography |

---

## 📁 Project Structure

```
netflix-clone/
├── public/
├── src/
│   ├── assets/                  # Images, icons, static card data
│   │   └── cards/
│   │       └── Cards_data.js
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── TitleCards/
│   │   │   ├── TitleCards.jsx
│   │   │   └── TitleCards.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   └── Player/
│   │       ├── Player.jsx
│   │       └── Player.css
│   ├── firebase.js              # Firebase config & initialization
│   ├── App.jsx                  # Root component with routes
│   ├── main.jsx                 # React DOM entry point
│   └── index.css                # Global styles
├── index.html
├── .env                         # Firebase secrets (not committed)
├── .gitignore
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn
- A Firebase project ([console.firebase.google.com](https://console.firebase.google.com))

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a project.
2. Enable **Authentication** → **Email/Password** provider.
3. Enable **Firestore Database** (for future user data).
4. Copy your Firebase config values into `.env` as shown above.

---

## 📄 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🗺️ Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Main landing page |
| `/login` | `Login` | Sign In / Sign Up page |
| `/player/:id` | `Player` | Video player for a title |

---

## 🔮 Roadmap

- [ ] Connect TitleCards to TMDB / IMDB API
- [ ] Implement Firebase user sessions & protected routes
- [ ] Add "My List" functionality with Firestore
- [ ] Search functionality
- [ ] Responsive mobile layout

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📝 License

This project is for **educational purposes only**. Netflix branding, logos, and trademarks belong to Netflix, Inc.

---

## 👨‍💻 Author

Built with ❤️ — inspired by Netflix's UI.
