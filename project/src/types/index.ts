export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string;
  avatar_url: string | null;
  theme_preference: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured: boolean;
  category: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
}
