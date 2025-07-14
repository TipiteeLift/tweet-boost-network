-- Fix Function Search Path Vulnerability
-- Update the update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Update the update_tweet_engagement_counts function with secure search_path
CREATE OR REPLACE FUNCTION public.update_tweet_engagement_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment the appropriate count
    IF NEW.interaction_type = 'like' THEN
      UPDATE public.tweets SET likes_count = likes_count + 1 WHERE id = NEW.tweet_id;
    ELSIF NEW.interaction_type = 'comment' THEN
      UPDATE public.tweets SET comments_count = comments_count + 1 WHERE id = NEW.tweet_id;
    ELSIF NEW.interaction_type = 'share' THEN
      UPDATE public.tweets SET shares_count = shares_count + 1 WHERE id = NEW.tweet_id;
    END IF;
    
    -- Update user points
    UPDATE public.profiles 
    SET points = points + NEW.points_earned 
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Fix Auth OTP Long Expiry - Set OTP expiry to 5 minutes (300 seconds)
UPDATE auth.config 
SET 
  otp_exp = 300,
  email_otp_exp = 300,
  sms_otp_exp = 300
WHERE true;