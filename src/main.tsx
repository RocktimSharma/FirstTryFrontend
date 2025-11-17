import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@app/App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

import {ExtendedToaster} from "@components/extensions/toaster.tsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
        >
            <App />
            <ExtendedToaster position="top-right" />
        </ClerkProvider>
    </StrictMode>,
)
