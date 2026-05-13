# 📖 Technical Documentation — Netflix Clone (React)

> Full component-level documentation for the Netflix Clone frontend project.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Entry Points](#2-entry-points)
3. [Global Styles](#3-global-styles)
4. [Routing (App.jsx)](#4-routing-appjsx)
5. [Firebase Configuration](#5-firebase-configuration)
6. [Pages](#6-pages)
   - [Home](#61-home-page)
   - [Login](#62-login-page)
   - [Player](#63-player-page)
7. [Components](#7-components)
   - [Navbar](#71-navbar)
   - [TitleCards](#72-titlecards)
   - [Footer](#73-footer)
8. [Assets & Static Data](#8-assets--static-data)
9. [Environment Variables](#9-environment-variables)
10. [Known Issues & Improvements](#10-known-issues--improvements)

---

## 1. Architecture Overview

```
User Browser
     │
     ▼
index.html  ──►  main.jsx  ──►  App.jsx (Router)
                                      │
                     ┌────────────────┼──────────────────┐
                     ▼                ▼                   ▼
                  Home             Login              Player
                     │
          ┌──────────┼───────────┐
          ▼          ▼           ▼
        Navbar   TitleCards   Footer
```

The app is a **Single Page Application (SPA)** using React Router v6. All navigation happens client-side with no full page reloads. Firebase handles authentication; Firestore is initialized for future data persistence.

---

## 2. Entry Points

### `index.html`

Standard Vite HTML shell. The single `<div id="root">` is where React mounts. The module script at `/src/main.jsx` bootstraps the app.

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

---

### `src/main.jsx`

React DOM entry point. Wraps the entire app in `<StrictMode>` for development warnings.

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Key points:**
- `StrictMode` double-invokes effects during development to surface side-effect bugs — this is expected behavior, not a bug.
- Global CSS (`index.css`) is imported here, making it available across the entire app.

---

## 3. Global Styles

### `src/index.css`

Applies CSS resets and base typography universally.

| Rule | Value | Purpose |
|------|-------|---------|
| `margin`, `padding` | `0` | Remove browser defaults |
| `box-sizing` | `border-box` | Padding included in width calculations |
| `background-color` | `black` | Netflix dark theme base |
| `color` | `white` | Default text color |
| `font-family` | `'Poppins'` | Loaded from Google Fonts |

---

## 4. Routing (App.jsx)

### `src/App.jsx`

Defines all client-side routes using React Router v6's `<Routes>` and `<Route>`.

```jsx
<BrowserRouter>
  <Routes>
    <Route path='/'           element={<Home />} />
    <Route path='/login'      element={<Login />} />
    <Route path='/player/:id' element={<Player />} />
  </Routes>
</BrowserRouter>
```

### Route Table

| Path | Component | Access |
|------|-----------|--------|
| `/` | `Home` | Public (should be protected post-auth) |
| `/login` | `Login` | Public |
| `/player/:id` | `Player` | Public (should be protected post-auth) |

### URL Parameters

- `/player/:id` — The `:id` segment is a dynamic parameter representing the title/movie ID. It is accessible in the `Player` component via React Router's `useParams()` hook.

> **Improvement:** Add a `<PrivateRoute>` wrapper to redirect unauthenticated users from `/` and `/player/:id` to `/login`.

---

## 5. Firebase Configuration

### `src/firebase.js`

Initializes the Firebase app with environment-based config and exports `auth` and `db` for use across components.

```js
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);       // Firebase Authentication instance
const db   = getFirestore(app);  // Firestore Database instance
```

### Exports

| Export | Type | Use |
|--------|------|-----|
| `auth` | `Auth` | Sign in, sign up, sign out, observe auth state |
| `db` | `Firestore` | Read/write user data (watchlist, preferences) |

> ⚠️ **Security:** Never hardcode Firebase keys. Always use `import.meta.env.VITE_*` variables sourced from a `.env` file. The `.env` file must **not** be committed to version control.

---

## 6. Pages

### 6.1 Home Page

**File:** `src/pages/Home/Home.jsx`

The root landing page. Renders in this order:

```
<Navbar />            ← Fixed top navigation
<div.hero>
  <img.banner-img />  ← Full-width hero background image
  <div.hero-caption>
    <img.caption-img />   ← Title logo overlay
    <p />                 ← Description text
    <div.hero-btns>       ← Play + More Info buttons
    <TitleCards />        ← "Popular on Netflix" row (no title prop)
  </div>
</div>
<div.more-cards>
  <TitleCards title="Blockbuster Movies" />
  <TitleCards title="Only on Netflix" />
  <TitleCards title="Upcoming" />
  <TitleCards title="Top Picks for You" />
</div>
<Footer />
```

**CSS highlights (`Home.css`):**
- Hero image uses `mask-image: linear-gradient(to right, transparent, black 75%)` — fades the right edge to black, creating a dramatic fade-out effect.
- `.hero-caption` is `position: absolute` over the banner at the bottom.
- Buttons use `inline-flex` with gap for icon+label alignment.

---

### 6.2 Login Page

**File:** `src/pages/Login/Login.jsx`

Handles both **Sign In** and **Sign Up** modes via a single state toggle.

#### State

```jsx
const [signState, setSignState] = useState("Sign In")
// Possible values: "Sign In" | "Sign Up"
```

#### Conditional Rendering

- When `signState === "Sign Up"`, a **Name** input is shown above Email.
- The form button label and heading `<h1>` match `signState`.
- The toggle link at the bottom switches between modes.

#### Form Fields

| Field | Type | Shown When |
|-------|------|------------|
| Name | `text` | Sign Up only |
| Email | `email` | Always |
| Password | `password` | Always |

> **Improvement:** Wire the form's `onSubmit` to Firebase's `createUserWithEmailAndPassword` (Sign Up) and `signInWithEmailAndPassword` (Sign In). Add loading state and error display.

**CSS highlights (`Login.css`):**
- Background is a full-height image with a dark overlay via `linear-gradient(#0000007e, #0000007e)`.
- Login form card is max `450px` wide, centered with `margin: auto`.
- Netflix red (`#e50914`) is used for the submit button.

---

### 6.3 Player Page

**File:** `src/pages/Player/Player.jsx`

Displays an embedded YouTube video player and metadata below it.

```jsx
<div className='player'>
  <img src={back_arrow_icon} />          {/* Back navigation */}
  <iframe src='https://www.youtube.com/embed/ZONX0eBiw0g'
    width='90%' height='90%' title='trailer' />
  <div className="player-info">
    <p>Published Date</p>
    <p>Name</p>
    <p>Type</p>
  </div>
</div>
```

**Current State:** The video URL and metadata are **hardcoded**. The `:id` from the URL is not yet used.

**CSS highlights (`Player.css`):**
- `.player` is `height: 100vh`, `flex-direction: column`, `justify-content: center` — vertically and horizontally centered.
- Back arrow is `position: absolute` at `top: 20px; left: 20px`.
- `.player-info` uses `justify-content: space-between` to spread the three metadata fields.

> **Improvement:**
> 1. Use `useParams()` to get `:id` from the route.
> 2. Fetch video details (YouTube embed URL, title, release date, type) from an API (TMDB or IMDB).
> 3. Wire the back arrow's `onClick` to `useNavigate()(-1)` for browser history navigation.

---

## 7. Components

### 7.1 Navbar

**File:** `src/components/Navbar/Navbar.jsx`

#### Scroll Behavior

Uses a `ref` on the navbar `div` and a `scroll` event listener to toggle a background class:

```jsx
const navRef = useRef();

useEffect(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navRef.current.classList.add('nav-dark')
    } else {
      navRef.current.classList.remove('nav-dark')
    }
  })
}, [])
```

| Scroll Position | Navbar Class | Background |
|-----------------|--------------|------------|
| `scrollY <= 80` | (default) | Gradient transparent → transparent |
| `scrollY > 80` | `.nav-dark` | Solid `#141414` |

> **Improvement:** The event listener is never removed. Return a cleanup function from `useEffect`:
> ```js
> return () => window.removeEventListener('scroll', handler)
> ```

#### Structure

```
.navbar
├── .navbar-left
│   ├── <img> Netflix logo
│   └── <ul> Nav links (Home, TV Shows, Movies...)
└── .navbar-right
    ├── Search icon
    ├── "Children" text
    ├── Bell icon
    └── .navbar-profile
        ├── Profile image
        ├── Caret icon
        └── .dropdown (hover-revealed "Sign Out" option)
```

**CSS highlights:**
- Navbar is `position: fixed` and full-width, so it overlays the page content with `z-index: 1`.
- The dropdown is `display: none` by default, revealed on `.navbar-profile:hover` via CSS.

---

### 7.2 TitleCards

**File:** `src/components/TitleCards/TitleCards.jsx`

Renders a horizontally scrollable row of content cards.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Popular on Netflix"` | Row heading |
| `category` | `string` | — | Intended for API filtering (not yet implemented) |

#### Mouse-Wheel Horizontal Scroll

```jsx
const cardsRef = useRef();

useEffect(() => {
  const handleWheel = (event) => {
    cardsRef.current.scrollLeft += event.deltaY;
  };
  cardsRef.current.addEventListener('wheel', handleWheel);
}, []);
```

Translates vertical mouse-wheel input into horizontal scroll on the card list — a common Netflix UX pattern.

> **Improvement:** Add cleanup to remove the event listener:
> ```js
> return () => cardsRef.current.removeEventListener('wheel', handleWheel)
> ```

#### Data Source

Currently reads from `../../assets/cards/Cards_data.js` — a local static array. The commented-out code shows the intended integration with the **IMDB RapidAPI** (`imdb236.p.rapidapi.com`).

```jsx
{cards_data.map((card, index) => (
  <div className='card' key={index}>
    <img src={card.image} alt="" />
    <p>{card.name}</p>
  </div>
))}
```

> **Improvement:**
> - Replace static data with a live API (TMDB recommended).
> - Make cards clickable — navigate to `/player/:id` on click using `useNavigate`.

---

### 7.3 Footer

**File:** `src/components/Footer/Footer.jsx`

Static footer component with social media icons and a link grid.

#### Social Icons

Renders four platform icons: YouTube, Twitter, Instagram, Facebook. Currently decorative (no `href`).

#### Links Grid

12 links rendered in a 4-column CSS Grid (`grid-template-columns: auto auto auto auto`).

> **Minor bug:** `Footer.css` has a typo — `font-size: 14pxf` on `.copyright-text`. The `f` at the end makes this declaration invalid, so it falls back to the browser default.

---

## 8. Assets & Static Data

All static assets live in `src/assets/`:

| Asset | Description |
|-------|-------------|
| `logo.png` | Netflix "N" logo |
| `hero_banner.jpg` | Home page hero background |
| `hero_title.png` | Title overlay image on hero |
| `play_icon.png` | Play button icon |
| `info_icon.png` | More Info button icon |
| `back_arrow_icon.png` | Player page back arrow |
| `profile_img.png` | Navbar profile avatar |
| `search_icon.svg` | Navbar search icon |
| `bell_icon.svg` | Navbar notification icon |
| `caret_icon.svg` | Navbar profile dropdown caret |
| `youtube_icon.png` | Footer YouTube icon |
| `twitterr_icon.png` | Footer Twitter icon |
| `instagram_icon.png` | Footer Instagram icon |
| `facebook_icon.png` | Footer Facebook icon |
| `background_bannerone.jpg` | Login page background |
| `cards/Cards_data.js` | Static array of card objects |

### `Cards_data.js` Shape

```js
// Expected shape of each card object
{
  image: "<path or URL to card image>",
  name: "<show or movie name>"
}
```

---

## 9. Environment Variables

All Firebase configuration is injected at build time via Vite's `import.meta.env`.

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firestore project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

Create a `.env` file at the project root and populate these. Vite automatically exposes variables prefixed with `VITE_` to the client bundle.

---

## 10. Known Issues & Improvements

| # | Location | Issue | Suggested Fix |
|---|----------|-------|---------------|
| 1 | `Navbar.jsx` | Scroll listener never cleaned up | Return cleanup in `useEffect` |
| 2 | `TitleCards.jsx` | Wheel listener never cleaned up | Return cleanup in `useEffect` |
| 3 | `Player.jsx` | Video URL and metadata hardcoded | Use `useParams()` + API fetch |
| 4 | `Player.jsx` | Back arrow has no `onClick` | Use `useNavigate()(-1)` |
| 5 | `Login.jsx` | Form not wired to Firebase Auth | Call `signIn/createUser` on submit |
| 6 | `App.jsx` | No protected routes | Add `<PrivateRoute>` HOC |
| 7 | `Footer.css` | Typo `14pxf` in `copyright-text` | Fix to `14px` |
| 8 | `firebase.js` | `auth` and `db` not exported | Add `export { auth, db }` |
| 9 | `TitleCards.jsx` | Static card data | Integrate TMDB / IMDB API |
| 10 | General | No error boundaries | Add React Error Boundary component |

---

*Documentation generated for the Netflix Clone React project. All Netflix trademarks and branding are property of Netflix, Inc. This project is educational only.*
