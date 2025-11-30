export interface Letter {
  id: string;
  char: string;
  correctIndex: number; // The index where this letter SHOULD be
  example: string; // e.g. "Anar"
  exampleHindi: string; // e.g. "अनार"
}

export interface LevelData {
  id: string;
  title: string;
  category: 'Vowels' | 'Consonants' | 'Combined';
  description: string;
  letters: string[];
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
