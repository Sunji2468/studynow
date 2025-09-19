import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Deck, Flashcard } from "@/types/flashcard";

const CreateDeck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [cards, setCards] = useState<Omit<Flashcard, "id" | "createdAt">[]>([
    { front: "", back: "" },
    { front: "", back: "" }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const removeCard = (index: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const updateCard = (index: number, field: "front" | "back", value: string) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const saveDeck = () => {
    if (!deckTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a deck title.",
        variant: "destructive"
      });
      return;
    }

    const validCards = cards.filter(card => card.front.trim() && card.back.trim());
    
    if (validCards.length === 0) {
      toast({
        title: "Error", 
        description: "Please create at least one complete flashcard.",
        variant: "destructive"
      });
      return;
    }

    const newDeck: Deck = {
      id: Date.now().toString(),
      title: deckTitle.trim(),
      description: deckDescription.trim(),
      cards: validCards.map(card => ({
        ...card,
        id: Date.now().toString() + Math.random(),
        createdAt: new Date()
      })),
      createdAt: new Date()
    };

    // Save to localStorage (in a real app, this would be API call)
    const existingDecks = JSON.parse(localStorage.getItem("studynow-decks") || "[]");
    localStorage.setItem("studynow-decks", JSON.stringify([...existingDecks, newDeck]));

    toast({
      title: "Success!",
      description: `"${deckTitle}" has been created with ${validCards.length} cards.`
    });

    navigate("/decks");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Deck</h1>
        <p className="text-muted-foreground">Build your personalized flashcard collection</p>
      </div>

      {/* Deck Info */}
      <Card className="card-shadow mb-8">
        <CardHeader>
          <CardTitle>Deck Information</CardTitle>
          <CardDescription>Give your deck a title and optional description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Deck Title</Label>
            <Input
              id="title"
              placeholder="e.g., Spanish Vocabulary, Biology Chapter 1"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this deck covers..."
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Flashcards */}
      <Card className="card-shadow mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Flashcards
            <Button onClick={addCard} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Card
            </Button>
          </CardTitle>
          <CardDescription>Create your flashcards with questions and answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cards.map((card, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Card {index + 1}</h4>
                  {cards.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCard(index)}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`front-${index}`}>Front (Question)</Label>
                    <Textarea
                      id={`front-${index}`}
                      placeholder="Enter the question or term..."
                      value={card.front}
                      onChange={(e) => updateCard(index, "front", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`back-${index}`}>Back (Answer)</Label>
                    <Textarea
                      id={`back-${index}`}
                      placeholder="Enter the answer or definition..."
                      value={card.back}
                      onChange={(e) => updateCard(index, "back", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button onClick={saveDeck} className="gap-2">
          <Save className="w-4 h-4" />
          Save Deck
        </Button>
      </div>
    </div>
  );
};

export default CreateDeck;