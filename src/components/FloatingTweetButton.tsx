import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TweetComposer } from "./TweetComposer";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const FloatingTweetButton = () => {
  const [isTweetComposerOpen, setIsTweetComposerOpen] = useState(false);
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsTweetComposerOpen(true)}
        disabled={profile.points < 10}
      >
        <Plus className="w-6 h-6" />
      </Button>
      
      <TweetComposer 
        isOpen={isTweetComposerOpen}
        onClose={() => setIsTweetComposerOpen(false)}
        userPoints={profile.points}
      />
    </>
  );
};