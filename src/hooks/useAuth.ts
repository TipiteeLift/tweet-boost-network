import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  handle: string;
  avatar_url?: string;
  bio?: string;
  points: number;
  level: number;
}

interface TodayStats {
  likes: number;
  comments: number;
  shares: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todayStats, setTodayStats] = useState<TodayStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🚀 useAuth: Initializing auth...");
    console.log("📍 Current URL:", window.location.href);
    console.log("🌍 Origin:", window.location.origin);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("🔍 useAuth: Initial session check:", { session: !!session, error });
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("👤 useAuth: Found existing user:", session.user.email);
        fetchProfile();
      } else {
        console.log("🚫 useAuth: No existing session found");
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`🔄 useAuth: Auth state changed - Event: ${event}`);
        console.log("📊 Session data:", {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
          accessToken: session?.access_token ? "present" : "missing",
        });
        console.log("🌐 Current URL during auth change:", window.location.href);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log("✅ useAuth: User authenticated, fetching profile...");
          await fetchProfile();
        } else {
          console.log("❌ useAuth: User signed out, clearing profile...");
          setProfile(null);
          setTodayStats(null);
          setLoading(false);
        }
      }
    );

    return () => {
      console.log("🧹 useAuth: Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-profile');
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data.profile);
      setTodayStats(data.today_stats);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithX = async () => {
    console.log("🔑 useAuth: Starting Twitter OAuth sign-in...");
    const redirectTo = window.location.origin;
    console.log("📍 Redirect URL:", redirectTo);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter_oauth2' as any,
        options: {
          redirectTo: redirectTo
        },
      });
      
      console.log("📤 OAuth response:", { data, error });
      
      if (error) {
        console.error('❌ useAuth: OAuth error:', error);
        return { error };
      }
      
      console.log("✅ useAuth: OAuth initiated successfully");
      return { data, error: null };
    } catch (error) {
      console.error('💥 useAuth: Sign in exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log("🚪 useAuth: Starting sign out...");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ useAuth: Sign out error:', error);
        throw error;
      }
      console.log("✅ useAuth: Sign out successful");
    } catch (error) {
      console.error('💥 useAuth: Sign out exception:', error);
      throw error;
    }
  };

  const refreshProfile = () => {
    if (user) {
      fetchProfile();
    }
  };

  return {
    user,
    profile,
    todayStats,
    loading,
    signInWithX,
    signOut,
    refreshProfile,
  };
};