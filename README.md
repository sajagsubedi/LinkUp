# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Structure:

where2go/
├── public/                             # Static assets
│   ├── favicon.ico                     # App favicon
│   ├── logo.png                        # Where2GO logo (compass-styled)
│   └── images/                         # Static images for landing page
│       ├── hero-bg.jpg                 # Hero section background
│       └── testimonials/                # Placeholder testimonial images
├── src/
│   ├── assets/                         # Dynamic assets
│   │   ├── icons/                      # SVG icons (e.g., calendar, briefcase)
│   │   └── images/                     # Default images (e.g., for events, clubs)
│   ├── components/                     # React components
│   │   ├── ui/                         # Shadcn/UI components (via CLI)
│   │   │   ├── button.jsx              # Shadcn/UI Button component
│   │   │   ├── card.jsx                # Shadcn/UI Card component
│   │   │   ├── dropdown-menu.jsx       # Shadcn/UI Dropdown for filters
│   │   │   ├── input.jsx               # Shadcn/UI Input for search
│   │   │   ├── form.jsx                # Shadcn/UI Form for admin inputs
│   │   │   ├── modal.jsx               # Shadcn/UI Modal for details
│   │   │   └── badge.jsx               # Shadcn/UI Badge for statuses
│   │   ├── common/                     # Shared app-specific components
│   │   │   ├── Navbar.jsx              # User navbar (uses ui/button, ui/dropdown-menu)
│   │   │   ├── Footer.jsx              # Shared footer
│   │   │   └── SearchBar.jsx           # Search component (uses ui/input)
│   │   ├── user/                       # User-specific components
│   │   │   ├── EventCard.jsx           # Event card (uses ui/card, ui/button)
│   │   │   ├── InternshipCard.jsx      # Horizontal internship card (uses ui/card)
│   │   │   ├── ClubCard.jsx            # Club card (uses ui/card, ui/button)
│   │   │   └── MentorCard.jsx          # Mentor card (uses ui/card, ui/badge)
│   │   ├── admin/                      # Admin-specific components
│   │   │   ├── AdminNavbar.jsx         # Admin dashboard navbar (uses ui/button)
│   │   │   ├── EventForm.jsx           # Event CRUD form (uses ui/form, ui/input)
│   │   │   ├── InternshipForm.jsx      # Internship CRUD form (uses ui/form)
│   │   │   ├── ClubForm.jsx            # Club CRUD form (uses ui/form)
│   │   │   └── MentorForm.jsx          # Mentor CRUD form (uses ui/form, ui/badge)
│   │   └── layouts/                    # Layout components
│   │       ├── UserLayout.jsx          # Wrapper for user pages (navbar, footer)
│   │       └── AdminLayout.jsx         # Wrapper for admin dashboard
│   ├── pages/                          # Route-specific page components
│   │   ├── LandingPage.jsx             # Public landing page (uses ui/card, ui/button)
│   │   ├── LoginPage.jsx               # Login for users/admins (uses ui/form, ui/input)
│   │   ├── SignupPage.jsx              # User sign-up (uses ui/form, ui/input)
│   │   ├── AdminContactPage.jsx        # Admin contact form (uses ui/form)
│   │   ├── user/                       # User-facing pages
│   │   │   ├── HomePage.jsx            # User home (uses ui/card for quick links)
│   │   │   ├── EventsPage.jsx          # Events list with filters (uses ui/dropdown-menu)
│   │   │   ├── InternshipsPage.jsx     # Internships list (uses ui/dropdown-menu)
│   │   │   ├── ClubsPage.jsx           # Clubs list (uses ui/dropdown-menu)
│   │   │   ├── MentorshipPage.jsx      # Mentors list (uses ui/dropdown-menu, ui/badge)
│   │   │   └── ProfilePage.jsx         # User profile/settings (uses ui/form)
│   │   ├── admin/                      # Admin dashboard pages
│   │   │   ├── AdminHomePage.jsx       # Admin dashboard (uses ui/card)
│   │   │   ├── AdminPurposeSelect.jsx  # Purpose selection modal (uses ui/modal)
│   │   │   ├── AdminEventsPage.jsx     # Manage events (uses EventForm)
│   │   │   ├── AdminInternshipsPage.jsx# Manage internships (uses InternshipForm)
│   │   │   ├── AdminClubsPage.jsx      # Manage clubs (uses ClubForm)
│   │   │   └── AdminMentorsPage.jsx    # Manage mentors (uses MentorForm)
│   ├── hooks/                          # Custom React hooks
│   │   ├── useAuth.js                  # Supabase auth state (login, signup, logout)
│   │   ├── useEvents.js                # Fetch/manage events from Supabase
│   │   ├── useInternships.js           # Fetch/manage internships
│   │   ├── useClubs.js                 # Fetch/manage clubs
│   │   ├── useMentors.js               # Fetch/manage mentors
│   │   ├── useGeolocation.js           # Geolocation for location-based filtering
│   │   └── useRealtime.js              # Supabase real-time subscriptions
│   ├── services/                       # Supabase API calls
│   │   ├── supabaseClient.js           # Initialize Supabase client
│   │   ├── auth.js                     # Auth functions (login, signup, logout)
│   │   ├── events.js                   # CRUD for events (Supabase queries)
│   │   ├── internships.js              # CRUD for internships
│   │   ├── clubs.js                    # CRUD for clubs
│   │   ├── mentors.js                  # CRUD for mentors
│   │   └── storage.js                  # Image uploads (e.g., event posters, mentor profiles)
│   ├── utils/                          # Utility functions
│   │   ├── constants.js                # App constants (e.g., event types, expertise areas)
│   │   ├── formatters.js               # Date, location formatting
│   │   └── validators.js               # Form input validation (e.g., for admin forms)
│   ├── styles/                         # Tailwind CSS and global styles
│   │   ├── globals.css                 # Tailwind imports and custom styles
│   │   └── tailwind.config.js          # Tailwind configuration
│   ├── App.jsx                         # Main app component (routes setup)
│   ├── main.jsx                        # Vite entry point
│   └── vite.config.js                  # Vite configuration
├── .env                                # Environment variables (Supabase URL, anon key)
├── package.json                        # Dependencies (react, supabase, shadcn-ui, tailwind)
├── postcss.config.js                   # PostCSS for Tailwind
├── tailwind.config.js                  # Tailwind configuration (Shadcn/UI compatible)
├── vite.config.js                      # Vite setup with React plugin
└── README.md                           # Project documentation
