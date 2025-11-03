import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postsService } from '../lib/posts';
import { Post, Comment } from '../types';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Trash2, Edit } from 'lucide-react';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) return;
        const postData = await postsService.getPost(id, user?.id);
        setPost(postData);
        if (postData) {
          const postComments = await postsService.getComments(id);
          setComments(postComments);
          setIsLiked(postData.is_liked || false);
          setLikesCount(postData.likes_count || 0);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, user]);

  const handleLike = async () => {
    if (!user || !post) return;
    try {
      const newLiked = await postsService.toggleLike(post.id, user.id);
      setIsLiked(newLiked);
      setLikesCount(prev => newLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post || !commentText.trim()) return;

    try {
      const newComment = await postsService.createComment(post.id, user.id, commentText);
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await postsService.deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!post || !confirm('Are you sure you want to delete this post?')) return;
    try {
      await postsService.deletePost(post.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="aspect-video bg-gradient-to-br from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900" />

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Link to={`/profile/${post.author?.username}`} className="flex items-center gap-4 hover:opacity-80 transition">
                <img
                  src={post.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.username}`}
                  alt={post.author?.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{post.author?.full_name || post.author?.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </Link>

              {user?.id === post.author_id && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/post/${post.id}/edit`)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-400"
                  >
                    <Edit size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleDeletePost}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            <div className="flex items-center gap-8 py-8 border-t border-b border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition"
              >
                <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? 'text-red-500' : ''} />
                <span className="text-lg">{likesCount}</span>
              </motion.button>

              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MessageCircle size={24} />
                <span className="text-lg">{comments.length}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>

              {user && (
                <form onSubmit={handleAddComment} className="mb-8">
                  <div className="flex gap-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        rows={3}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={!commentText.trim()}
                        className="mt-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                      >
                        Post Comment
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {comments.map((comment, idx) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3 flex-1">
                        <img
                          src={comment.author?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author?.username}`}
                          alt={comment.author?.username}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <Link to={`/profile/${comment.author?.username}`} className="font-semibold text-gray-900 dark:text-white hover:text-teal-600 transition">
                            {comment.author?.full_name || comment.author?.username}
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                      </div>

                      {user?.id === comment.author_id && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 p-2"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {comments.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
