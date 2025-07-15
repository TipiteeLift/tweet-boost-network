import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Processing auth callback...');
        
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('AuthCallback: Session error:', sessionError);
          setError(`Authentication failed: ${sessionError.message}`);
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        if (session) {
          console.log('AuthCallback: Authentication successful, redirecting to dashboard...');
          navigate('/');
        } else {
          console.log('AuthCallback: No session found, redirecting to home...');
          navigate('/');
        }
      } catch (error: any) {
        console.error('AuthCallback: Unexpected error:', error);
        setError('An unexpected error occurred during authentication');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-destructive animate-pulse mx-auto mb-4" />
          <p className="text-destructive-foreground mb-2">Authentication Error</p>
          <p className="text-muted-foreground text-sm">{error}</p>
          <p className="text-muted-foreground text-xs mt-2">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;