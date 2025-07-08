
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Hash, X, Loader2, ExternalLink } from "lucide-react";
import { useTweets } from "@/hooks/useTweets";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface TweetComposerProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
}

export const TweetComposer = ({ isOpen, onClose, userPoints }: TweetComposerProps) => {
  const [tweetUrl, setTweetUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState("InfoFi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { submitTweet } = useTweets();
  const { refreshProfile } = useAuth();
  const { toast } = useToast();

  const canSubmit = tweetUrl.trim().length > 0 && userPoints >= 10 && isValidTwitterUrl(tweetUrl);

  const suggestedTags = ["#InfoFi", "#DeFi", "#Web3", "#Crypto", "#Blockchain", "#Alpha"];
  const communities = ["InfoFi", "Airdrops", "DeFi", "NFTs", "Gaming"];

  function isValidTwitterUrl(url: string): boolean {
    const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/;
    return twitterRegex.test(url);
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await submitTweet(
        tweetUrl, 
        selectedCommunity, 
        selectedTags
      );
      
      toast({
        title: "Success!",
        description: result.message,
      });
      
      // Refresh user profile to update points
      refreshProfile();
      
      // Reset form and close
      onClose();
      setTweetUrl("");
      setSelectedTags([]);
      setSelectedCommunity("InfoFi");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Submit Tweet Link</span>
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

          {/* Tweet Submission */}
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
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              canSubmit ? 'Submit Tweet Link' : 'Invalid URL or Need More Points'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
