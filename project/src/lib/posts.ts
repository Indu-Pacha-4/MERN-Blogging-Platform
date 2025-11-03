import { supabase } from './supabase';
import { Post, Comment } from '../types';

export const postsService = {
  async getPosts(limit = 10, offset = 0): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return (data || []) as Post[];
  },

  async getFeaturedPosts(limit = 3): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count)
      `)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Post[];
  },

  async getPost(id: string, userId?: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count),
        comments(count)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    let isLiked = false;
    if (userId) {
      const { data: likeData } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', userId)
        .maybeSingle();
      isLiked = !!likeData;
    }

    return { ...data, is_liked: isLiked } as Post;
  },

  async getUserPosts(userId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count)
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Post[];
  },

  async createPost(authorId: string, title: string, content: string, excerpt: string, category: string): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        author_id: authorId,
        title,
        content,
        excerpt,
        category,
      })
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count)
      `)
      .maybeSingle();

    if (error) throw error;
    return data as Post;
  },

  async updatePost(id: string, updates: Partial<Post>): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url),
        likes(count)
      `)
      .maybeSingle();

    if (error) throw error;
    return data as Post;
  },

  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getComments(postId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Comment[];
  },

  async createComment(postId: string, authorId: string, content: string): Promise<Comment> {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_id: authorId,
        content,
      })
      .select(`
        *,
        author:profiles(id, username, full_name, avatar_url)
      `)
      .maybeSingle();

    if (error) throw error;
    return data as Comment;
  },

  async deleteComment(id: string): Promise<void> {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async toggleLike(postId: string, userId: string): Promise<boolean> {
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existingLike) {
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
      return false;
    } else {
      await supabase
        .from('likes')
        .insert({
          post_id: postId,
          user_id: userId,
        });
      return true;
    }
  },

  async getLikesCount(postId: string): Promise<number> {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) throw error;
    return count || 0;
  },
};
