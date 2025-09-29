/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Edit, Trash2, Plus, BookOpen, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Deck } from "@/types/flashcard";

const MyDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = () => {
    const savedDecks = JSON.parse(localStorage.getItem("studynow-decks") || "[]");
    setDecks(savedDecks.map((deck: any) => ({
      ...deck,
      createdAt: new Date(deck.createdAt),
      lastStudied: deck.lastStudied ? new Date(deck.lastStudied) : undefined
    })));
  };

  const deleteDeck = (deckId: string) => {
    const updatedDecks = decks.filter(deck => deck.id !== deckId);
    setDecks(updatedDecks);
    localStorage.setItem("studynow-decks", JSON.stringify(updatedDecks));
    
    toast({
      title: "Deck Deleted",
      description: "The deck has been successfully removed."
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (decks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">No Decks Yet</h2>
          <p className="text-muted-foreground mb-8">
            Create your first flashcard deck to start studying!
          </p>
          <Link to="/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Deck
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Decks</h1>
          <p className="text-muted-foreground">
            You have {decks.length} deck{decks.length !== 1 ? "s" : ""} ready for study
          </p>
        </div>
        <Link to="/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Deck
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card key={deck.id} className="card-shadow glow-effect hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="line-clamp-2">{deck.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {deck.description || "No description"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="secondary" className="gap-1">
                    <BookOpen className="w-3 h-3" />
                    {deck.cards.length} cards
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(deck.createdAt)}
                  </div>
                </div>

                {deck.lastStudied && (
                  <p className="text-xs text-muted-foreground">
                    Last studied: {formatDate(deck.lastStudied)}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => navigate(`/study/${deck.id}`)}
                  >
                    <Play className="w-4 h-4" />
                    Study
                  </Button>
                  <Button variant="outline" size="sm"
                    onClick={() => navigate(`/create?id=${deck.id}`)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteDeck(deck.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyDecks;

