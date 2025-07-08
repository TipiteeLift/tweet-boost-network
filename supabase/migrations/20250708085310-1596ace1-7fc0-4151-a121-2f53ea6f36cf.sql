-- Add foreign key relationship between tweets and profiles
ALTER TABLE public.tweets 
ADD CONSTRAINT tweets_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Insert sample profiles for the tweet authors
INSERT INTO public.profiles (user_id, display_name, handle, avatar_url, bio, points, level) VALUES 
('11111111-1111-1111-1111-111111111111', 'About Crypto', '@about_crypto', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'Sharing the latest in crypto and blockchain technology', 150, 2),
('22222222-2222-2222-2222-222222222222', 'Crypto Alpha', '@cryptoalpha', 'https://images.unsplash.com/photo-1494790108755-2616c668830a?w=100&h=100&fit=crop&crop=face', 'Finding the best crypto opportunities', 200, 3),
('33333333-3333-3333-3333-333333333333', 'DeFi Explorer', '@defiexplorer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 'Exploring the world of decentralized finance', 300, 4);

-- Insert sample tweets including the provided links
INSERT INTO public.tweets (user_id, content, community, tags, likes_count, comments_count, shares_count, is_hot, points_value) VALUES 
('11111111-1111-1111-1111-111111111111', 'https://x.com/about_crypto/status/1942196667664478479', 'InfoFi', ARRAY['#InfoFi', '#Crypto', '#Alpha'], 156, 23, 45, true, 5),
('11111111-1111-1111-1111-111111111111', 'https://x.com/about_crypto/status/1941928598140604841', 'DeFi', ARRAY['#DeFi', '#Blockchain', '#Web3'], 89, 12, 28, false, 4),
('22222222-2222-2222-2222-222222222222', 'https://x.com/cryptoalpha/status/1942000000000000000', 'Airdrops', ARRAY['#Airdrops', '#Alpha'], 234, 45, 67, true, 5),
('33333333-3333-3333-3333-333333333333', 'https://x.com/defiexplorer/status/1941000000000000000', 'DeFi', ARRAY['#DeFi', '#Yield'], 345, 56, 89, false, 4),
('22222222-2222-2222-2222-222222222222', 'https://x.com/cryptoalpha/status/1940000000000000000', 'InfoFi', ARRAY['#InfoFi', '#Data'], 123, 34, 23, true, 5);