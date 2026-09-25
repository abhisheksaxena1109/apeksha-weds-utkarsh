# Wedding RSVP Website

A floral, elegant wedding site with a single RSVP tab and a simple guest form.

## Tech stack

- Next.js
- Vercel hosting
- Supabase database (free tier)

## Project setup

1. Install dependencies:
   npm install
2. Copy environment variables:
   copy .env.example .env.local
3. Add your Supabase project URL and anon key to .env.local.
4. Start the app:
   npm run dev
5. Open http://localhost:3000

## Supabase setup (free)

1. Create a free Supabase account at https://supabase.com
2. Create a new project.
3. Open SQL Editor and run:

```sql
create table if not exists wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  attendance text not null default 'attending',
  guest_count int not null default 1,
  dietary_notes text default '',
  created_at timestamptz not null default now()
);
```

4. In your project settings, get the project URL and anon key.
5. Add them to .env.local.

## Vercel deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add the same environment variables in Vercel project settings.
4. Deploy.

## Future enhancements

- Add ceremony details and gallery page
- Add guest dashboard with RSVP stats
- Add admin login for managing attendees
- Add custom invitation link per guest
- Add email confirmation through Resend or Postmark

## Notes

This is a basic version designed for free hosting and a simple RSVP workflow.
