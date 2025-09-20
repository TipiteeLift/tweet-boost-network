-- Add twitter_handle column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN twitter_handle text;

-- Add constraint to ensure twitter_handle follows proper format
ALTER TABLE public.profiles 
ADD CONSTRAINT twitter_handle_format 
CHECK (twitter_handle IS NULL OR twitter_handle ~ '^@[a-zA-Z0-9_]{1,15}$');