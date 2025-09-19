import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Trophy } from "lucide-react";
import { FlashcardComponent } from "@/components/FlashcardComponent";
import { useToast } from "@/hooks/use-toast";
import { Deck } from "@/types/flashcard";

const StudySession = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deck, setDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [startTime] = useState(new Date());

  useEffect(() => {
    if (!deckId) return;
    
    const savedDecks = JSON.parse(localStorage.getItem("studynow-decks") || "[]");
    const foundDeck = savedDecks.find((d: Deck) => d.id === deckId);
    
    if (!foundDeck) {
      toast({
        title: "Deck Not Found",
        description: "The requested deck could not be found.",
        variant: "destructive"
      });
      navigate("/decks");
      return;
    }
    
    setDeck(foundDeck);
  }, [deckId, navigate, toast]);

  const handleNext = () => {
    if (!deck) return;
    
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      completeSession();
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const markCorrect = () => {
    setCorrectCount(correctCount + 1);
    handleNext();
  };

  const markIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    handleNext();
  };

  const completeSession = () => {
    if (!deck) return;
    
    // Update last studied date
    const savedDecks = JSON.parse(localStorage.getItem("studynow-decks") || "[]");
    const updatedDecks = savedDecks.map((d: Deck) => 
      d.id === deck.id ? { ...d, lastStudied: new Date().toISOString() } : d
    );
    localStorage.setItem("studynow-decks", JSON.stringify(updatedDecks));
    
    setSessionComplete(true);
    
    toast({
      title: "Session Complete!",
      description: `You got ${correctCount} out of ${correctCount + incorrectCount} cards correct.`
    });
  };

  const restartSession = () => {
    setCurrentCardIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSessionComplete(false);
  };

  const getScorePercentage = () => {
    const total = correctCount + incorrectCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 0;
  };

  if (!deck) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading deck...</p>
      </div>
    );
  }

  if (sessionComplete) {
    const percentage = getScorePercentage();
    const studyTime = Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60);

    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="card-shadow">
          <CardHeader>
            <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Session Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">{incorrectCount}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Overall Score</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="text-sm text-muted-foreground">
              Study time: {studyTime} minute{studyTime !== 1 ? "s" : ""}
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate("/decks")} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Decks
              </Button>
              <Button onClick={restartSession} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Study Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentCardIndex + 1) / deck.cards.length) * 100;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={() => navigate("/decks")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Decks
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{deck.title}</h1>
          <p className="text-muted-foreground">
            Card {currentCardIndex + 1} of {deck.cards.length}
          </p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="w-3 h-3 text-success" />
            {correctCount}
          </Badge>
          <Badge variant="outline" className="gap-1 ml-2">
            <XCircle className="w-3 h-3 text-destructive" />
            {incorrectCount}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Flashcard */}
      <FlashcardComponent
        card={deck.cards[currentCardIndex]}
        showNavigation={false}
        className="mb-8"
      />

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
        >
          Previous
        </Button>
        
        <Button
          variant="outline"
          onClick={markIncorrect}
          className="gap-2 text-destructive hover:text-destructive"
        >
          <XCircle className="w-4 h-4" />
          Incorrect
        </Button>
        
        <Button
          onClick={markCorrect}
          className="gap-2 bg-gradient-to-r from-success to-success/80"
        >
          <CheckCircle className="w-4 h-4" />
          Correct
        </Button>
      </div>
    </div>
  );
};

export default StudySession;