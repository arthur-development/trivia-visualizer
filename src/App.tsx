import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { TriviaQuestion, CategoryDistribution, DifficultyDistribution } from './types';
import { fetchQuestions } from './services/triviaApi';
import CategoryList from './components/CategoryList';
import CategoryChart from './components/CategoryChart';
import DifficultyChart from './components/DifficultyChart';
import StatsCards from './components/StatsCards';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const questionsData = await fetchQuestions(50);
        setQuestions(questionsData);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Failed to load data. Please try again.';
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredQuestions = useMemo(() => {
    if (!selectedCategory) return questions;
    return questions.filter(q => q.category === selectedCategory);
  }, [questions, selectedCategory]);

  const categoryDistribution: CategoryDistribution[] = useMemo(() => {
    const distribution = questions.reduce((acc, question) => {
      const category = question.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [questions]);

  const filteredCategoryDistribution: CategoryDistribution[] = useMemo(() => {
    const distribution = filteredQuestions.reduce((acc, question) => {
      const category = question.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredQuestions]);

  const difficultyDistribution: DifficultyDistribution[] = useMemo(() => {
    const distribution = filteredQuestions.reduce((acc, question) => {
      const difficulty = question.difficulty;
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const order = ['easy', 'medium', 'hard'];
    return order
      .filter(diff => distribution[diff])
      .map(difficulty => ({ 
        difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1), 
        count: distribution[difficulty] 
      }));
  }, [filteredQuestions]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading trivia data...</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
            Fetching from Open Trivia DB...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button 
            onClick={handleRetry}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Trivia Visualizer</h1>
      </header>

      <main className="app-main">
        <StatsCards 
          totalQuestions={questions.length}
          totalCategories={categoryDistribution.length}
          filteredQuestions={filteredQuestions.length}
          selectedCategory={selectedCategory}
        />

        <div className="content-grid">
          <div className="sidebar">
            <CategoryList 
              categories={categoryDistribution}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          <div className="charts-container">
            <div className="chart-card">
              <h2>Questions by Category</h2>
              <CategoryChart data={filteredCategoryDistribution} />
            </div>

            <div className="chart-card">
              <h2>Questions by Difficulty</h2>
              <DifficultyChart data={difficultyDistribution} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

