import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center justify-center text-center py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-teal-50 to-transparent dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />

      <motion.div
        className="relative z-10 max-w-3xl px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Share Your <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">Ideas</span> With The World
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Write. Connect. Inspire. Your story deserves to be heard — one blog at a time.
        </motion.p>

        <motion.button
          onClick={() => navigate(isAuthenticated ? '/create' : '/signup')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-xl font-semibold hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {isAuthenticated ? 'Start Writing' : 'Get Started'}
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};
