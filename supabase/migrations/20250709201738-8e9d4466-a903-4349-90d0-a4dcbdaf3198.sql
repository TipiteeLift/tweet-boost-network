-- Add period and interaction preferences fields to tweets table
ALTER TABLE public.tweets 
ADD COLUMN period_hours INTEGER DEFAULT 24 CHECK (period_hours IN (2, 24, 72)),
ADD COLUMN preferred_interactions TEXT[] DEFAULT ARRAY['like']::TEXT[] CHECK (preferred_interactions <@ ARRAY['like', 'retweet', 'comment', 'bookmark']::TEXT[]);