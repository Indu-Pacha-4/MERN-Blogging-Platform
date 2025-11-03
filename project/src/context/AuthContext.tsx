import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { AuthUser, Profile } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const prof = await authService.getProfile(currentUser.id);
          setProfile(prof);
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const currentUser = { id: session.user.id, email: session.user.email || '' };
        setUser(currentUser);
        const prof = await authService.getProfile(currentUser.id);
        setProfile(prof);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signup = async (email: string, password: string, username: string, fullName: string) => {
    const { user: newUser, profile: newProfile } = await authService.signup(email, password, username, fullName);
    setUser(newUser);
    setProfile(newProfile);
  };

  const login = async (email: string, password: string) => {
    const newUser = await authService.login(email, password);
    setUser(newUser);
    const prof = await authService.getProfile(newUser.id);
    setProfile(prof);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('Not authenticated');
    const updated = await authService.updateProfile(user.id, updates);
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAuthenticated: !!user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
