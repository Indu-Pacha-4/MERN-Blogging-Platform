import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '../types';
import { postsService } from '../lib/posts';
import { useAuth } from '../context/AuthContext';

interface PostCardProps {
  post: Post;
  onLikeChange?: (postId: string, liked: boolean) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLikeChange }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const newLiked = await postsService.toggleLike(post.id, user.id);
      setIsLiked(newLiked);
      setLikesCount(prev => newLiked ? prev + 1 : prev - 1);
      onLikeChange?.(post.id, newLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
    >
      <Link to={`/post/${post.id}`} className="block group cursor-pointer">
        <div className="aspect-video bg-gradient-to-br from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.username}`}
              alt={post.author?.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">{post.author?.full_name || post.author?.username}</p>
              <p className="text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
            {post.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {post.excerpt || post.content.substring(0, 100).replace(/<[^>]*>/g, '')}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <motion.button
          onClick={handleLike}
          disabled={loading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition disabled:opacity-50"
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'text-red-500' : ''} />
          <span className="text-sm">{likesCount}</span>
        </motion.button>

        <Link to={`/post/${post.id}`} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition">
          <MessageCircle size={18} />
          <span className="text-sm">{post.comments_count || 0}</span>
        </Link>
      </div>
    </motion.article>
  );
};
