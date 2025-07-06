-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create tweets table
CREATE TABLE public.tweets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  community TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  shares_count INTEGER NOT NULL DEFAULT 0,
  is_hot BOOLEAN DEFAULT false,
  points_value INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tweets
ALTER TABLE public.tweets ENABLE ROW LEVEL SECURITY;

-- Create policies for tweets
CREATE POLICY "Tweets are viewable by everyone" 
ON public.tweets 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own tweets" 
ON public.tweets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tweets" 
ON public.tweets 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create user interactions table
CREATE TABLE public.user_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tweet_id UUID NOT NULL REFERENCES public.tweets(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'comment', 'share')),
  points_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, tweet_id, interaction_type)
);

-- Enable RLS on user_interactions
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_interactions
CREATE POLICY "Users can view their own interactions" 
ON public.user_interactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interactions" 
ON public.user_interactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tweets_updated_at
BEFORE UPDATE ON public.tweets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update tweet engagement counts
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
$$ LANGUAGE plpgsql;

-- Create trigger for engagement count updates
CREATE TRIGGER update_engagement_counts
AFTER INSERT ON public.user_interactions
FOR EACH ROW
EXECUTE FUNCTION public.update_tweet_engagement_counts();