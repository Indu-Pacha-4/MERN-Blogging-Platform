# BlogHub - Modern Blogging Platform

A beautiful, fully-functional blogging platform built with React, TypeScript, Tailwind CSS, and Supabase. Share your ideas with stunning animations, real-time interactions, and seamless user experience.

## Features

### User Authentication
- Sign up and login with email/password
- Secure JWT-based authentication via Supabase
- Profile management with avatar and bio
- Persistent session management

### Blog Management
- Create, read, update, and delete blog posts
- Rich content support with category tags
- Featured posts carousel
- Search and filter posts by category
- View full post details with comments and likes

### Social Features
- Like and unlike posts
- Real-time comment system
- User profiles with post history
- Follow/unfollow users
- View follower and following counts
- Track total likes received

### Design & UX
- Modern, responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Dark/light theme toggle with persistent storage
- Beautiful gradient UI with glassmorphism effects
- Accessible and intuitive navigation
- Loading states and error handling

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Lucide React** - Icons

### Backend
- **Supabase** - PostgreSQL database + Auth
- **Row Level Security (RLS)** - Data protection

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   └── PostCard.tsx
├── context/          # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── lib/              # Service functions
│   ├── supabase.ts
│   ├── auth.ts
│   ├── posts.ts
│   └── social.ts
├── pages/            # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── CreatePost.tsx
│   ├── Profile.tsx
│   └── PostDetail.tsx
├── types/            # TypeScript interfaces
│   └── index.ts
└── App.tsx           # Main app with routing
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account with database credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# .env file should already be configured with:
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

### Creating an Account
1. Click "Sign Up" on the navbar
2. Enter your email, password, username, and full name
3. You'll be redirected to your dashboard

### Writing a Post
1. Click "Write" in the navbar or the "Write New Post" button
2. Fill in the title, excerpt, category, and content
3. Click "Publish Post" to save

### Interacting with Posts
- **Like/Unlike** - Click the heart icon on any post
- **Comment** - Navigate to post details and add comments
- **Share Profile** - Click on author avatar to view their profile
- **Follow** - Click the follow button on someone's profile

### Customizing Your Profile
1. Go to your profile by clicking your avatar
2. Click "Edit Profile" to update name, bio, and avatar

### Switching Themes
- Click the sun/moon icon in the navbar to toggle between light and dark modes
- Your preference is automatically saved

## Key Pages

### Home (`/`)
- Landing page with hero section
- Latest blog posts feed
- Featured posts section

### Login (`/login`)
- Email and password authentication
- Link to signup for new users

### Signup (`/signup`)
- Create new account
- Set username and full name
- Link to login for existing users

### Dashboard (`/dashboard`)
- View all your published posts
- Quick access to write new posts
- Edit or delete existing posts

### Create Post (`/create`)
- Rich form for creating new posts
- Title, excerpt, category, and content fields
- Save as draft or publish immediately

### Profile (`/profile/:username`)
- User profile information
- Post count, followers, following
- List of user's posts
- Follow/unfollow button
- Edit profile button for own profile

### Post Detail (`/post/:id`)
- Full post content and metadata
- Comment section
- Like counter
- Edit/delete options for post author
- Comment management

## Database Schema

### Tables
- **profiles** - User profile information and preferences
- **posts** - Blog posts with content and metadata
- **comments** - Comments on posts
- **likes** - Post likes (one per user per post)
- **follows** - Follow relationships between users

All tables have Row Level Security (RLS) enabled to ensure users can only access and modify their own data.

## Authentication

The app uses Supabase's built-in authentication with email/password signup and login. Sessions are automatically managed through JWT tokens stored in the browser.

## Styling

The app uses Tailwind CSS with a teal-to-blue gradient color scheme. Dark mode is fully supported and automatically persisted.

Color Palette:
- Primary: Teal (#14b8a6) → Blue (#3b82f6)
- Neutral: Gray scale with light and dark variants
- Success: Green
- Error: Red

## Performance

- Lazy loading of components
- Optimized image loading with fallback avatars
- Efficient database queries with proper indexing
- Cached authentication state
- Smooth animations with GPU acceleration

## Security

- Row Level Security (RLS) policies on all tables
- Secure password hashing via Supabase
- Protected API routes with authentication checks
- CORS-safe Supabase integration
- XSS protection through React's built-in escaping

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Image upload support
- Search functionality
- Trending posts
- User notifications
- Email notifications
- Social sharing
- Advanced post analytics
- User badges and achievements

## Troubleshooting

### Build Fails
```bash
npm run build --verbose
```

### Database Connection Issues
- Verify `.env` file has correct Supabase credentials
- Check Supabase project is active and database is running

### Authentication Issues
- Clear browser cache and localStorage
- Check email/password are correct
- Verify user account exists

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code documentation
3. Check Supabase documentation for database-related issues

---

**Built with ❤️ using React, TypeScript, and Supabase**
