# Quick Start Guide

## 30 Second Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Server runs at: `http://localhost:5173`

## First Time Users

### Create an Account
1. Click **Sign Up** in navbar
2. Fill in your details:
   - Full Name: Your name
   - Username: Unique identifier (e.g., `johndoe`)
   - Email: Your email address
   - Password: Secure password
3. Click **Create Account**

### Write Your First Post
1. Click **Write** in navbar
2. Fill in the form:
   - **Title**: Post headline
   - **Excerpt**: Brief summary (optional)
   - **Category**: Choose from 7 categories
   - **Content**: Your full post text
3. Click **Publish Post**

### Explore Features
- **Home**: Browse all posts with smooth animations
- **Dashboard**: View your published posts
- **Profile**: Visit your profile by clicking your avatar
- **Dark Mode**: Toggle theme with sun/moon icon in navbar

## Common Tasks

### Like a Post
Click the heart icon on any post card

### Comment on a Post
1. Click on a post to view details
2. Scroll to comments section
3. Write your comment
4. Click **Post Comment**

### Follow a User
1. Visit their profile from any post
2. Click the **Follow** button

### Edit Your Profile
1. Go to your profile (click avatar)
2. Click **Edit Profile** button
3. Update your information

### Sign Out
Click **Sign Out** button in navbar

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Go Home | `/` → Home |
| Dashboard | Click navbar Dashboard |
| Create Post | `/create` |
| Search Profile | `/profile/:username` |

## Troubleshooting

### Can't Log In?
- Double-check email address
- Verify password is correct
- Ensure account exists

### Posts Not Loading?
- Check internet connection
- Refresh page
- Clear browser cache

### Dark Mode Not Saving?
- Check browser cookies are enabled
- Try clearing localStorage: `localStorage.clear()`

### Build Fails?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## File Structure

```
project/
├── src/
│   ├── components/     # UI components
│   ├── context/        # Auth & Theme contexts
│   ├── lib/            # Service functions
│   ├── pages/          # Page components
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies
└── README.md           # Full documentation
```

## Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

## Environment Setup

The app is pre-configured with Supabase credentials in `.env`:

```
VITE_SUPABASE_URL=https://qoujchsukmgrmtzrwldt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

No additional setup needed!

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Supabase** - Database & Auth
- **Lucide React** - Icons

## Need Help?

- Check README.md for detailed documentation
- Review component structure in src/
- Inspect browser console for errors
- Check Supabase dashboard for database issues

---

Happy blogging! 🚀
