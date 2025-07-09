import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, Hash, ExternalLink, Clock, Heart, Repeat, MessageCircle, Bookmark } from "lucide-react";

interface TweetComposerFormProps {
  tweetUrl: string;
  setTweetUrl: (url: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCommunity: string;
  setSelectedCommunity: (community: string) => void;
  periodHours: number;
  setPeriodHours: (hours: number) => void;
  preferredInteractions: string[];
  setPreferredInteractions: React.Dispatch<React.SetStateAction<string[]>>;
  isValidTwitterUrl: (url: string) => boolean;
  userPoints: number;
}

export const TweetComposerForm = ({
  tweetUrl,
  setTweetUrl,
  selectedTags,
  setSelectedTags,
  selectedCommunity,
  setSelectedCommunity,
  periodHours,
  setPeriodHours,
  preferredInteractions,
  setPreferredInteractions,
  isValidTwitterUrl,
  userPoints
}: TweetComposerFormProps) => {
  const suggestedTags = ["#InfoFi", "#DeFi", "#Web3", "#Crypto", "#Blockchain", "#Alpha"];
  const communities = ["InfoFi", "Airdrops", "DeFi", "NFTs", "Gaming"];
  const periods = [
    { hours: 2, label: "2 hours", icon: Clock },
    { hours: 24, label: "1 day", icon: Clock },
    { hours: 72, label: "3 days", icon: Clock }
  ];

  const interactions = [
    { id: "like", label: "Likes", icon: Heart, color: "text-red-500" },
    { id: "retweet", label: "Retweets", icon: Repeat, color: "text-green-500" },
    { id: "comment", label: "Comments", icon: MessageCircle, color: "text-blue-500" },
    { id: "bookmark", label: "Bookmarks", icon: Bookmark, color: "text-yellow-500" }
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleInteraction = (interactionId: string) => {
    setPreferredInteractions(prev => 
      prev.includes(interactionId)
        ? prev.filter(i => i !== interactionId)
        : [...prev, interactionId]
    );
  };

  return (
    <div className="space-y-4">
      {/* Requirements Check */}
      <Card className={userPoints >= 10 ? "border-success" : "border-warning"}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Points Required: 10</span>
            <span className={`text-sm font-medium ${userPoints >= 10 ? 'text-success' : 'text-warning'}`}>
              {userPoints >= 10 ? '✅ Ready!' : `Need ${10 - userPoints} more points`}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Tweet Submission */}
      <div className="space-y-4">
        {/* Community Selection */}
        <div>
          <label className="text-sm font-medium">Community</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {communities.map((community) => (
              <Button
                key={community}
                variant={selectedCommunity === community ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCommunity(community)}
              >
                {community}
              </Button>
            ))}
          </div>
        </div>

        {/* Tweet URL Input */}
        <div>
          <label className="text-sm font-medium">Twitter/X Link</label>
          <div className="relative mt-2">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="https://x.com/username/status/123456789"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              className="pl-10"
            />
            {tweetUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => window.open(tweetUrl, '_blank')}
                disabled={!isValidTwitterUrl(tweetUrl)}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          {tweetUrl && !isValidTwitterUrl(tweetUrl) && (
            <p className="text-sm text-destructive mt-1">
              Please enter a valid Twitter/X link
            </p>
          )}
        </div>

        {/* Period Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Campaign Duration</label>
          <RadioGroup 
            value={periodHours.toString()} 
            onValueChange={(value) => setPeriodHours(parseInt(value))}
            className="flex flex-wrap gap-4"
          >
            {periods.map((period) => (
              <div key={period.hours} className="flex items-center space-x-2">
                <RadioGroupItem value={period.hours.toString()} id={`period-${period.hours}`} />
                <Label htmlFor={`period-${period.hours}`} className="flex items-center space-x-1 cursor-pointer">
                  <period.icon className="w-4 h-4" />
                  <span>{period.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Preferred Interactions */}
        <div>
          <label className="text-sm font-medium mb-3 block">Preferred Interactions</label>
          <div className="grid grid-cols-2 gap-3">
            {interactions.map((interaction) => (
              <div key={interaction.id} className="flex items-center space-x-3">
                <Checkbox
                  id={interaction.id}
                  checked={preferredInteractions.includes(interaction.id)}
                  onCheckedChange={() => toggleInteraction(interaction.id)}
                />
                <Label htmlFor={interaction.id} className="flex items-center space-x-2 cursor-pointer">
                  <interaction.icon className={`w-4 h-4 ${interaction.color}`} />
                  <span>{interaction.label}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Tags */}
        <div>
          <label className="text-sm font-medium">Suggested Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Tags Preview */}
        {selectedTags.length > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Selected tags:</div>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preferred Interactions Preview */}
        {preferredInteractions.length > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Targeting these interactions:</div>
            <div className="flex flex-wrap gap-2">
              {preferredInteractions.map((interactionId) => {
                const interaction = interactions.find(i => i.id === interactionId);
                return interaction ? (
                  <Badge key={interactionId} variant="secondary" className="text-xs flex items-center space-x-1">
                    <interaction.icon className={`w-3 h-3 ${interaction.color}`} />
                    <span>{interaction.label}</span>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};