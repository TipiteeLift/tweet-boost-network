
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityFilters } from "./CommunityFilters";
import { StatisticsGrid } from "./StatisticsGrid";
import { InfiniteScrollFeed } from "./InfiniteScrollFeed";
import { SocialShare } from "./SocialShare";
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
  
  const { profile } = useAuth();
  
  const { tweets, loading, interactions, handleInteraction } = useTweets(activeFilter);
  const { user } = useAuth();
  
  // Use prop interactions if provided, otherwise use hook interactions
  const currentInteractions = propInteractions || interactions;

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Header with Share Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Discover and engage with the crypto community</p>
        </div>
        
        {profile && (
          <SocialShare 
            type="points" 
            trigger={
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Progress
              </Button>
            }
          />
        )}
      </div>

      {/* Statistics Grid - Only the 4 boxes */}
      <StatisticsGrid />

      {/* Filters */}
      <CommunityFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterChange={setActiveFilter} 
        activeFilter={activeFilter} 
      />

      {/* Tweet Feed with Infinite Scroll */}
      <InfiniteScrollFeed 
        community={activeFilter} 
        searchTerm={searchTerm}
      />
    </div>
  );
};
