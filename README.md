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

## Folder Structure

```aiignore
src/
├── app/                        # App-wide configuration & bootstrapping
│   ├── App.tsx                 # Root React app, React Router setup
│   ├── routes/                 # Central route definitions
│   ├── providers/              # Context providers (Apollo, Auth, Theme, etc.)
│   └── store/                  # Zustand/Redux global state (UI state only)
│
├── assets/                     # Static assets (images, icons, fonts)
│   ├── icons/                  
│   ├── images/
│   └── styles/                 # Global styles (tailwind.css, tokens, fonts)
│
├── components/                 # Reusable, generic UI components (not feature-specific)
│   ├── ui/                     # shadcn/ui wrappers (Button, Card, Modal, etc.)
│   ├── layout/                 # Layout components (Sidebar, Navbar, Footer)
│   ├── forms/                  # Generic form elements (Input, Select, DatePicker)
│   └── feedback/               # Alerts, Toasts, Spinners
│
├── features/                   # Feature-based modules (Domain-driven design)
│   ├── products/
│   │   ├── api/                # GraphQL queries, mutations, fragments
│   │   ├── components/         # Feature-specific UI (ProductCard, ProductForm)
│   │   ├── hooks/              # Custom hooks (useProductActions, useProductFilters)
│   │   ├── pages/              # Routed pages (ProductListPage, ProductDetailPage)
│   │   └── types/              # Feature-specific types/interfaces
│   │
│   ├── categories/
│   ├── brands/
│   ├── suppliers/
│   ├── inventory/
│   ├── purchase/
│   ├── sales/
│   ├── employees/
│   ├── finance/
│   └── reports/
│
├── graphql/                    # Shared GraphQL utilities (codegen output here)
│   ├── generated/              # Auto-generated hooks/types from schema
│   ├── fragments/              # Shared fragments across features
│   └── client.ts               # Apollo/URQL client config
│
├── hooks/                      # Global hooks (useAuth, useTheme, useMediaQuery)
│
├── lib/                        # Cross-cutting utilities
│   ├── auth/                   # Clerk/Auth0 wrappers
│   ├── apollo/                 # Apollo links, error handling
│   ├── validations/            # Zod/Yup schemas
│   ├── constants/              # App-wide constants
│   ├── helpers/                # Date, currency, formatting helpers
│   └── config.ts               # Env variables typed & validated
│
├── types/                      # Global TypeScript types (DTOs, shared enums)
│
├── index.tsx                   # Entry point (ReactDOM.createRoot)
└── main.tsx                    # Bootstrapping (providers, StrictMode, Router)

```
