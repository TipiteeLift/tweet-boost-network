-- Update the handle_new_user function to safely parse JSON and include master user logic
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'pg_temp'
AS $function$
DECLARE
  display_name_val text;
  handle_val text;
  avatar_url_val text;
  is_master_user boolean;
BEGIN
  -- Check if this is the master account
  is_master_user := NEW.email = 'thomaspetitcopy@gmail.com';
  
  -- Safely extract values from raw_user_meta_data with error handling
  BEGIN
    display_name_val := COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      NEW.raw_user_meta_data->>'name', 
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1),
      'User'
    );
  EXCEPTION WHEN OTHERS THEN
    display_name_val := COALESCE(split_part(NEW.email, '@', 1), 'User');
  END;

  BEGIN
    handle_val := COALESCE(
      '@' || (NEW.raw_user_meta_data->>'username'),
      '@' || (NEW.raw_user_meta_data->>'user_name'),
      '@' || split_part(NEW.email, '@', 1),
      '@user' || substr(NEW.id::text, 1, 8)
    );
  EXCEPTION WHEN OTHERS THEN
    handle_val := COALESCE('@' || split_part(NEW.email, '@', 1), '@user' || substr(NEW.id::text, 1, 8));
  END;

  BEGIN
    avatar_url_val := NEW.raw_user_meta_data->>'avatar_url';
  EXCEPTION WHEN OTHERS THEN
    avatar_url_val := NULL;
  END;

  -- Insert the new profile with master user logic
  INSERT INTO public.profiles (
    user_id, 
    display_name, 
    handle, 
    avatar_url,
    points, 
    level,
    super_user
  )
  VALUES (
    NEW.id,
    display_name_val,
    handle_val,
    avatar_url_val,
    CASE WHEN is_master_user THEN 1000 ELSE 100 END,
    CASE WHEN is_master_user THEN 10 ELSE 1 END,
    is_master_user
  );
  
  RETURN NEW;
END;
$function$;