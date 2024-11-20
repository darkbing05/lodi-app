# Lodi Platform

Music library subscription platform with unlimited downloads.

## Setup Progress

### Database Schema (Supabase)
```sql
-- User profiles with roles
create type user_role as enum ('user', 'musician', 'admin');

create table profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  avatar_url text,
  role user_role default 'user',
  updated_at timestamp with time zone,
  primary key (id)
);

-- Music tracks
create table tracks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  file_url text not null,
  preview_url text,
  category text,
  user_id uuid references auth.users,
  created_at timestamp with time zone default now()
);

-- Subscriptions
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  plan text not null check (plan in ('monthly', 'yearly', 'lifetime')),
  status text default 'active',
  created_at timestamp with time zone default now()
);

-- New user trigger
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Implemented Features
1. Authentication
   - Google OAuth integration
   - Protected routes with middleware
   - Session management
   - Role-based access control

2. Dashboard
   - User profile display
   - Stats overview (total tracks, uploads, plays)
   - Recent tracks list
   - Role-specific UI elements
   - Music player integration

### Project Structure
```
src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── library/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── AuthForm.tsx
│   ├── navigation/
│   │   └── Header.tsx
│   ├── player/
│   │   └── MusicPlayer.tsx
│   └── upload/
│       └── TrackUpload.tsx
├── lib/
│   ├── supabase.ts
│   └── store.ts
└── types/
    └── index.ts
```

### Dependencies
```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "*",
    "@supabase/auth-ui-react": "*",
    "@supabase/auth-ui-shared": "*",
    "@supabase/supabase-js": "*",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "react-player": "*",
    "zustand": "*"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

### Next Steps
- [ ] Implement music upload for musicians/admins
- [ ] Add music library browsing and search
- [ ] Set up subscription system
- [ ] Integrate PayMongo
- [ ] Add download functionality
- [ ] Implement user playlists

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- PayMongo (pending)