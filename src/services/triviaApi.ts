import { TriviaQuestion } from '../types';

const BASE_URL = 'https://opentdb.com';

/**
 * Fetches trivia questions from the Open Trivia DB API
 * @param amount - Number of questions to fetch (max 50 per request)
 * @returns Promise with array of trivia questions
 */
export const fetchQuestions = async (amount: number = 50): Promise<TriviaQuestion[]> => {
  const validAmount = Math.min(Math.max(amount, 1), 50);
  const url = `${BASE_URL}/api.php?amount=${validAmount}`;

  try {
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response_code === 0) {
      return data.results;
    } else if (data.response_code === 1) {
      console.warn('No results found for the given parameters');
      return [];
    } else {
      throw new Error(`API Error: Invalid parameters (code: ${data.response_code})`);
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

