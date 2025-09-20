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
  created_at: string;
  updated_at: string;
  super_user?: boolean;
  twitter_handle?: string;
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

  const signUp = async (email: string, password: string, displayName: string, twitterHandle?: string) => {
    console.log("🔑 useAuth: signUp called");
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      console.log("🔗 useAuth: Redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
            twitter_handle: twitterHandle
          }
        }
      });
      
      console.log("📊 useAuth: SignUp response data:", data);
      console.log("⚠️ useAuth: SignUp response error:", error);
      
      if (error) {
        console.error("❌ useAuth: SignUp error:", error);
        throw error;
      }
      
      return { data, error };
    } catch (error: any) {
      console.error("💥 useAuth: signUp exception:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("🔑 useAuth: signIn called");
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("📊 useAuth: SignIn response data:", data);
      console.log("⚠️ useAuth: SignIn response error:", error);
      
      if (error) {
        console.error("❌ useAuth: SignIn error:", error);
        throw error;
      }
      
      return { data, error };
    } catch (error: any) {
      console.error("💥 useAuth: signIn exception:", error);
      throw error;
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
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };
};