import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Hash, Smile, Calendar, X } from "lucide-react";

interface TweetComposerProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
}

export const TweetComposer = ({ isOpen, onClose, userPoints }: TweetComposerProps) => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState("InfoFi");

  const maxChars = 280;
  const remainingChars = maxChars - content.length;
  const canSubmit = content.trim().length > 0 && userPoints >= 10;

  const suggestedTags = ["#InfoFi", "#DeFi", "#Web3", "#Crypto", "#Blockchain", "#Alpha"];
  const communities = ["InfoFi", "Airdrops", "DeFi", "NFTs", "Gaming"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (canSubmit) {
      try {
        // Simulate API call
        const tweetData = {
          content: content + ' ' + selectedTags.join(' '),
          community: selectedCommunity,
          tags: selectedTags,
          timestamp: new Date().toISOString()
        };
        
        // Here you would submit to your backend/API
        console.log("Submitting tweet:", tweetData);
        
        // Show success message
        alert("Tweet submitted successfully! You earned 10 points.");
        
        onClose();
        setContent("");
        setSelectedTags([]);
        setSelectedCommunity("InfoFi");
      } catch (error) {
        console.error("Error submitting tweet:", error);
        alert("Failed to submit tweet. Please try again.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Submit Tweet</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-success/10 text-success">
                {userPoints} points
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
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

          {/* Tweet Composer */}
          <div className="space-y-3">
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

            {/* Tweet Content */}
            <div>
              <Textarea
                placeholder="What's happening in crypto?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-24 resize-none"
                maxLength={maxChars}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" disabled>
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
                <span className={`text-sm ${remainingChars < 20 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {remainingChars}
                </span>
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
          </div>

          {/* Submit Button */}
          <Button 
            className="w-full" 
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {canSubmit ? 'Submit Tweet' : 'Need More Points'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};