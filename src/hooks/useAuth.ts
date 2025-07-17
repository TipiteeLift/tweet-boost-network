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
    console.log("🔑 === TWITTER OAUTH DEBUG SESSION ===");
    console.log("🌐 Current URL:", window.location.href);
    console.log("🏠 Origin:", window.location.origin);
    console.log("📦 Supabase Project URL:", "https://govrjacwazjfzvvkbenq.supabase.co");
    console.log("📱 User Agent:", navigator.userAgent);
    console.log("🕐 Timestamp:", new Date().toISOString());
    
    try {
      // Strategy 1: Use current origin
      console.log("\n🎯 STRATEGY 1: Current Origin Redirect");
      const strategy1 = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      console.log("📊 Strategy 1 Result:");
      console.log("  Data:", strategy1.data);
      console.log("  Error:", strategy1.error);
      console.log("  URL Generated:", strategy1.data?.url);
      
      if (!strategy1.error) {
        console.log("✅ Strategy 1 SUCCESS - Redirecting...");
        return strategy1;
      }
      
      // Strategy 2: Explicit Lovable URL
      if (strategy1.error?.message?.includes('requested path is invalid')) {
        console.log("\n🎯 STRATEGY 2: Explicit Lovable URL");
        const strategy2 = await supabase.auth.signInWithOAuth({
          provider: 'twitter',
          options: {
            redirectTo: 'https://de3708c3-6dd3-42ff-984f-b8acafc95676.lovableproject.com/'
          }
        });
        
        console.log("📊 Strategy 2 Result:");
        console.log("  Data:", strategy2.data);
        console.log("  Error:", strategy2.error);
        console.log("  URL Generated:", strategy2.data?.url);
        
        if (!strategy2.error) {
          console.log("✅ Strategy 2 SUCCESS - Redirecting...");
          return strategy2;
        }
        
        // Strategy 3: No redirect (let Supabase handle it)
        console.log("\n🎯 STRATEGY 3: No Redirect Options");
        const strategy3 = await supabase.auth.signInWithOAuth({
          provider: 'twitter'
        });
        
        console.log("📊 Strategy 3 Result:");
        console.log("  Data:", strategy3.data);
        console.log("  Error:", strategy3.error);
        console.log("  URL Generated:", strategy3.data?.url);
        
        if (!strategy3.error) {
          console.log("✅ Strategy 3 SUCCESS - Redirecting...");
          return strategy3;
        }
        
        // Strategy 4: Alternative redirect formats
        console.log("\n🎯 STRATEGY 4: Alternative Redirect Formats");
        const alternativeUrls = [
          'https://de3708c3-6dd3-42ff-984f-b8acafc95676.lovableproject.com',
          window.location.origin + '/',
          window.location.href,
        ];
        
        for (const url of alternativeUrls) {
          console.log(`  Trying URL: ${url}`);
          const strategyResult = await supabase.auth.signInWithOAuth({
            provider: 'twitter',
            options: { redirectTo: url }
          });
          
          console.log(`  Result for ${url}:`, { 
            hasError: !!strategyResult.error, 
            errorMsg: strategyResult.error?.message 
          });
          
          if (!strategyResult.error) {
            console.log(`✅ SUCCESS with URL: ${url}`);
            return strategyResult;
          }
        }
        
        console.log("❌ All strategies failed");
        return strategy3; // Return the last attempt
      }
      
      return strategy1;
      
    } catch (error: any) {
      console.error('\n💥 === CRITICAL EXCEPTION ===');
      console.error('Type:', typeof error);
      console.error('Message:', error?.message);
      console.error('Name:', error?.name);
      console.error('Code:', error?.code);
      console.error('Status:', error?.status);
      console.error('Stack:', error?.stack);
      console.error('Full Object:', JSON.stringify(error, null, 2));
      console.error('=== END EXCEPTION ===\n');
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