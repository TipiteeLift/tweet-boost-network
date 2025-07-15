-- Add super_user flag to profiles table for special privileges
ALTER TABLE public.profiles 
ADD COLUMN super_user BOOLEAN DEFAULT FALSE;

-- Grant super user status to @about_crypto account
UPDATE public.profiles 
SET super_user = TRUE 
WHERE handle = '@about_crypto';

-- Create index for faster super user queries
CREATE INDEX idx_profiles_super_user ON public.profiles(super_user) WHERE super_user = TRUE;