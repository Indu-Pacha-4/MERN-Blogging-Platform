import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../lib/auth';
import { postsService } from '../lib/posts';
import { socialService } from '../lib/social';
import { Post, Profile as ProfileType } from '../types';
import { PostCard } from '../components/PostCard';
import { motion } from 'framer-motion';
import { UserPlus, UserMinus } from 'lucide-react';

export const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!username) return;
        const prof = await authService.getProfileByUsername(username);
        if (!prof) {
          navigate('/');
          return;
        }
        setProfile(prof);

        const userPosts = await postsService.getUserPosts(prof.id);
        setPosts(userPosts);

        const followersCount = await socialService.getFollowersCount(prof.id);
        setFollowers(followersCount);

        const followingCount = await socialService.getFollowingCount(prof.id);
        setFollowing(followingCount);

        if (user && user.id !== prof.id) {
          const follows = await socialService.isFollowing(user.id, prof.id);
          setIsFollowing(follows);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username, user, navigate]);

  const handleFollowToggle = async () => {
    if (!user || !profile) return;
    try {
      const newFollowing = await socialService.toggleFollow(user.id, profile.id);
      setIsFollowing(newFollowing);
      setFollowers(prev => newFollowing ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Profile not found</p>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white mb-8 shadow-xl"
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex items-start gap-6">
              <img
                src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                alt={profile.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{profile.full_name || profile.username}</h1>
                <p className="text-lg opacity-90 mb-4">@{profile.username}</p>
                {profile.bio && <p className="text-lg leading-relaxed">{profile.bio}</p>}
              </div>
            </div>

            {isOwnProfile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile/edit')}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Edit Profile
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold">{posts.length}</p>
              <p className="opacity-90">Posts</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{followers}</p>
              <p className="opacity-90">Followers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{following}</p>
              <p className="opacity-90">Following</p>
            </div>
          </div>
        </motion.div>

        {!isOwnProfile && user && (
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollowToggle}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                isFollowing
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserMinus size={20} />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Follow
                </>
              )}
            </motion.button>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Posts</h2>
          {posts.length > 0 ? (
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
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              {isOwnProfile ? 'You haven\'t written any posts yet.' : 'No posts from this user.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
