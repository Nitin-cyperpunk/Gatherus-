event-board/
├── public/                       # Static files (logos, icons, images)
├── src/
│   ├── app/                      # Next.js App Router pages (or routes)
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home feed
│   │   ├── events/
│   │   │   ├── page.tsx          # List/search events
│   │   │   └── [id]/page.tsx     # Single event details
│   │   ├── profile/
│   │   │   └── [username]/page.tsx
│   │   └── admin/                # Event manager dashboard
│   │       ├── page.tsx
│   │       └── new/page.tsx      # Create event
│   │
│   ├── components/               # Reusable UI pieces
│   │   ├── ui/                   # Buttons, inputs, modals, etc.
│   │   ├── cards/                # EventCard, ProfileCard, etc.
│   │   └── navigation/           # Header, Footer, Sidebar
│   │
│   ├── features/                 # Domain logic grouped by feature
│   │   ├── events/
│   │   │   ├── api.ts            # Fetch / CRUD for events
│   │   │   ├── hooks.ts          # React Query hooks
│   │   │   └── types.ts          # Event types/interfaces
│   │   ├── users/
│   │   │   ├── api.ts
│   │   │   ├── hooks.ts
│   │   │   └── types.ts
│   │   └── auth/
│   │       ├── api.ts
│   │       └── hooks.ts
│   │
│   ├── lib/                      # Config & helpers
│   │   ├── supabase.ts           # Supabase/Firebase client
│   │   ├── analytics.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── styles/
│   │   └── globals.css           # Tailwind base + custom styles
│   │
│   ├── hooks/                    # Generic hooks (e.g., useMediaQuery)
│   └── types/                    # Global TS types
│
├── .env.local                    # Environment variables
├── package.json
├── tailwind.config.js
└── tsconfig.json
