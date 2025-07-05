import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MoreHorizontal, Star, Flame } from "lucide-react";

interface Tweet {
  id: string;
  author: string;
  handle: string;
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
  onInteraction: (tweetId: string, type: 'like' | 'comment' | 'share') => void;
  interactions: Record<string, { liked: boolean; commented: boolean; shared: boolean }>;
}

const mockTweets: Tweet[] = [
  {
    id: "1",
    author: "Crypto Developer",
    handle: "@cryptodev",
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

const filterButtons = [
  { label: "All", active: true },
  { label: "#InfoFi", active: false },
  { label: "#Airdrops", active: false },
  { label: "#DeFi", active: false },
  { label: "#NFTs", active: false },
  { label: "#Gaming", active: false },
  { label: "Advanced", active: false, variant: "premium" as const }
];

export const TweetFeed = ({ onInteraction, interactions }: TweetFeedProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Discover and engage with the crypto community</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm text-muted-foreground mr-2">Filter:</span>
          {filterButtons.map((filter, index) => (
            <Button
              key={index}
              variant={filter.active ? "default" : filter.variant === "premium" ? "secondary" : "outline"}
              size="sm"
              className={filter.variant === "premium" ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" : ""}
              onClick={() => setActiveFilter(filter.label)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tweet Feed */}
      <div className="space-y-4">
        {mockTweets.map((tweet) => {
          const tweetInteractions = interactions[tweet.id] || { liked: false, commented: false, shared: false };
          
          return (
            <Card key={tweet.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {tweet.author.split(' ').map(n => n[0]).join('')}
                    </span>
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
                          onClick={() => onInteraction(tweet.id, 'like')}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${tweetInteractions.liked ? 'fill-current' : ''}`} />
                          {tweet.likes}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-muted-foreground hover:text-blue-500 ${tweetInteractions.commented ? 'text-blue-500' : ''}`}
                          onClick={() => onInteraction(tweet.id, 'comment')}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {tweet.comments}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-muted-foreground hover:text-green-500 ${tweetInteractions.shared ? 'text-green-500' : ''}`}
                          onClick={() => onInteraction(tweet.id, 'share')}
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
        })}
      </div>
    </div>
  );
};