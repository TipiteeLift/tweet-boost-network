
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { TweetComposerForm } from "./TweetComposerForm";
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
  const [periodHours, setPeriodHours] = useState(24);
  const [preferredInteractions, setPreferredInteractions] = useState<string[]>(["like"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { submitTweet } = useTweets();
  const { refreshProfile } = useAuth();
  const { toast } = useToast();

  const canSubmit = tweetUrl.trim().length > 0 && userPoints >= 10 && isValidTwitterUrl(tweetUrl) && preferredInteractions.length > 0;

  function isValidTwitterUrl(url: string): boolean {
    const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/;
    return twitterRegex.test(url);
  }


  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await submitTweet(
        tweetUrl, 
        selectedCommunity, 
        selectedTags,
        periodHours,
        preferredInteractions
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
      setPeriodHours(24);
      setPreferredInteractions(["like"]);
      
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Submit Tweet Link</span>
            <Badge variant="secondary" className="bg-success/10 text-success">
              {userPoints} points
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <TweetComposerForm
            tweetUrl={tweetUrl}
            setTweetUrl={setTweetUrl}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCommunity={selectedCommunity}
            setSelectedCommunity={setSelectedCommunity}
            periodHours={periodHours}
            setPeriodHours={setPeriodHours}
            preferredInteractions={preferredInteractions}
            setPreferredInteractions={setPreferredInteractions}
            isValidTwitterUrl={isValidTwitterUrl}
            userPoints={userPoints}
          />

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
              canSubmit ? 'Submit Tweet Link' : 'Complete form & Need 10 Points'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
