import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityFilters } from "./CommunityFilters";
import { StatisticsGrid } from "./StatisticsGrid";
import { WeeklyEngagementChart } from "./WeeklyEngagementChart";
import { Heart, MessageCircle, Share, MoreHorizontal, Star, Flame, Loader2 } from "lucide-react";
import { useTweets } from "@/hooks/useTweets";
import { useAuth } from "@/hooks/useAuth";

interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  community: string;
  timestamp: string;
  tags: string[];
  isHot?: boolean;
  points?: number;
}

interface TweetFeedProps {
  onInteraction?: (tweetId: string, type: 'like' | 'comment' | 'share') => void;
  interactions?: Record<string, { liked: boolean; commented: boolean; shared: boolean }>;
}

const mockTweets: Tweet[] = [
  {
    id: "1",
    author: "Crypto Developer",
    handle: "@cryptodev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Just discovered an amazing InfoFi project that tracks social sentiment in real-time. The future of information finance is here! 🚀 This could revolutionize how we value and monetize social data.",
    likes: 2847,
    comments: 28,
    shares: 65,
    community: "InfoFi",
    timestamp: "2h",
    tags: ["#InfoFi", "#Web3", "#DataEconomy"],
    isHot: true,
    points: 5
  },
  {
    id: "2",
    author: "Airdrop Alpha",
    handle: "@airdropalpha",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c668830a?w=100&h=100&fit=crop&crop=face",
    content: "Major DeFi protocol announcing airdrop eligibility snapshot next week! Users with 100+ transactions on their platform are eligible. Don't miss out! 💰",
    likes: 5234,
    comments: 73,
    shares: 145,
    community: "Airdrops",
    timestamp: "4h",
    tags: ["#Airdrops", "#DeFi", "#Alpha"],
    points: 4
  },
  {
    id: "3",
    author: "DeFi Maximalist",
    handle: "@defimaxi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "The yield farming opportunities in this market are insane. Just found a 200% APY pool that's actually sustainable. Research is key! 📊",
    likes: 8921,
    comments: 156,
    shares: 234,
    community: "DeFi",
    timestamp: "6h",
    tags: ["#DeFi"],
    isHot: true,
    points: 5
  }
];

export const TweetFeed = ({ onInteraction, interactions: propInteractions }: TweetFeedProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { tweets, loading, interactions, handleInteraction } = useTweets(activeFilter);
  const { user } = useAuth();
  
  // Use prop interactions if provided, otherwise use hook interactions
  const currentInteractions = propInteractions || interactions;

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Discover and engage with the crypto community</p>
      </div>

      {/* Statistics Grid */}
      <StatisticsGrid />

      {/* Weekly Engagement Chart */}
      <WeeklyEngagementChart />

      {/* Filters */}
      <CommunityFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterChange={setActiveFilter} 
        activeFilter={activeFilter} 
      />

      {/* Tweet Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading tweets...</span>
          </div>
        ) : tweets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tweets found. {user ? 'Be the first to post!' : 'Sign in to see tweets.'}</p>
          </div>
        ) : (
          tweets.map((tweet) => {
            const tweetInteractions = currentInteractions[tweet.id] || { liked: false, commented: false, shared: false };
            
            return (
              <Card key={tweet.id} className="p-4">
                <CardContent className="p-0">
                  <div className="flex space-x-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                      {tweet.avatar ? (
                        <img 
                          src={tweet.avatar} 
                          alt={`${tweet.author} avatar`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold">
                          {tweet.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{tweet.author}</span>
                          <span className="text-muted-foreground text-sm">{tweet.handle}</span>
                          <span className="text-muted-foreground text-sm">•</span>
                          <span className="text-muted-foreground text-sm">{tweet.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {tweet.isHot && (
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
                              <Flame className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          {tweet.points && (
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                              <Star className="w-3 h-3 mr-1" />
                              {tweet.points}pts
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-sm mb-3 leading-relaxed">{tweet.content}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tweet.tags.map((tag, index) => (
                          <span key={index} className="text-primary text-sm hover:underline cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Engagement Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-pink-500 ${tweetInteractions.liked ? 'text-pink-500' : ''}`}
                            onClick={() => {
                              if (user) {
                                const handler = onInteraction || handleInteraction;
                                handler(tweet.id, 'like');
                              }
                            }}
                            disabled={!user}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${tweetInteractions.liked ? 'fill-current' : ''}`} />
                            {tweet.likes}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-blue-500 ${tweetInteractions.commented ? 'text-blue-500' : ''}`}
                            onClick={() => {
                              if (user) {
                                const handler = onInteraction || handleInteraction;
                                handler(tweet.id, 'comment');
                              }
                            }}
                            disabled={!user}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {tweet.comments}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-green-500 ${tweetInteractions.shared ? 'text-green-500' : ''}`}
                            onClick={() => {
                              if (user) {
                                const handler = onInteraction || handleInteraction;
                                handler(tweet.id, 'share');
                              }
                            }}
                            disabled={!user}
                          >
                            <Share className="w-4 h-4 mr-1" />
                            {tweet.shares}
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>+{tweet.points}pts per action</span>
                          <Button variant="link" size="sm" className="text-xs h-auto p-0">
                            View on X
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};