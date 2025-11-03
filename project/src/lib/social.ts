import { supabase } from './supabase';
import { Profile } from '../types';

export const socialService = {
  async getFollowers(userId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('follows')
      .select('follower:profiles(*)')
      .eq('following_id', userId);

    if (error) throw error;
    return (data || []).map((f: any) => f.follower) as unknown as Profile[];
  },

  async getFollowing(userId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('follows')
      .select('following:profiles(*)')
      .eq('follower_id', userId);

    if (error) throw error;
    return (data || []).map((f: any) => f.following) as unknown as Profile[];
  },

  async getFollowersCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId);

    if (error) throw error;
    return count || 0;
  },

  async getFollowingCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', userId);

    if (error) throw error;
    return count || 0;
  },

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async toggleFollow(followerId: string, followingId: string): Promise<boolean> {
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    const isCurrentlyFollowing = await this.isFollowing(followerId, followingId);

    if (isCurrentlyFollowing) {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId);

      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('follows')
        .insert({
          follower_id: followerId,
          following_id: followingId,
        });

      if (error) throw error;
      return true;
    }
  },
};
