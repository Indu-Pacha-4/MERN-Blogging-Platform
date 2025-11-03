import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const { profile, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg" />
          BlogHub
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition">
                Dashboard
              </Link>
              <Link to="/create" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
                Write
              </Link>
              <Link to={`/profile/${profile?.username}`} className="flex items-center gap-2">
                <img
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username}`}
                  alt={profile?.username}
                  className="w-8 h-8 rounded-full"
                />
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="text-sm">Sign Out</span>
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
                Sign Up
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
              </motion.button>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3"
          >
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-700 dark:text-gray-300">Dashboard</Link>
                <Link to="/create" className="block py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 rounded-lg">Write</Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 py-2">
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2">Login</Link>
                <Link to="/signup" className="block py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 rounded-lg">Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
