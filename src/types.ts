export interface Category {
  id: number;
  name: string;
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoryDistribution {
  category: string;
  count: number;
}

export interface DifficultyDistribution {
  difficulty: string;
  count: number;
}

