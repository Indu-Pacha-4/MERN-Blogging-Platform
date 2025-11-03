import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsService } from '../lib/posts';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadPosts = async () => {
      try {
        if (user) {
          const data = await postsService.getUserPosts(user.id);
          setPosts(data);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Dashboard</h1>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              <Plus size={20} />
              Write New Post
            </motion.button>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Posts ({posts.length})
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">You haven't written any posts yet.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/create')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
              >
                <Plus size={20} />
                Write Your First Post
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
