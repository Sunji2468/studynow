export interface Flashcard {
  id: string;
  front: string;
  back: string;
  createdAt: Date;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  lastStudied?: Date;
}

export interface StudySession {
  deckId: string;
  currentCardIndex: number;
  correctCount: number;
  totalCount: number;
  startTime: Date;
}