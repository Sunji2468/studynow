import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Flashcard } from "@/types/flashcard";

interface FlashcardProps {
  card: Flashcard;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
  className?: string;
}

export const FlashcardComponent = ({ 
  card, 
  onNext, 
  onPrevious, 
  showNavigation = true,
  className = "" 
}: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext?.();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious?.();
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          {/* Front */}
          <Card className="flashcard-face card-shadow glow-effect">
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-lg font-medium text-center leading-relaxed">
                  {card.front}
                </p>
              </div>
              <div className="flex items-center justify-center p-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Click to flip
                </span>
              </div>
            </div>
          </Card>

          {/* Back */}
          <Card className="flashcard-face flashcard-back card-shadow -mt-72">
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-lg font-medium text-center leading-relaxed">
                  {card.back}
                </p>
              </div>
              <div className="flex items-center justify-center p-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Click to flip
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-center gap-4">
          {onPrevious && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {onNext && (
            <Button onClick={handleNext}>
              Next Card
            </Button>
          )}
        </div>
      )}
    </div>
  );
};