import React from 'react';
import './StatsCards.css';

interface StatsCardsProps {
  totalQuestions: number;
  totalCategories: number;
  filteredQuestions: number;
  selectedCategory: string | null;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  totalQuestions, 
  totalCategories, 
  filteredQuestions,
  selectedCategory 
}) => {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <h3>{totalQuestions}</h3>
          <p>Total Questions</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">📁</div>
        <div className="stat-info">
          <h3>{totalCategories}</h3>
          <p>Categories</p>
        </div>
      </div>
      
      {selectedCategory ? (
        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-info">
            <h3>{filteredQuestions}</h3>
            <p>Filtered Questions</p>
          </div>
        </div>
      ) : (
        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <div className="stat-info">
            <h3>All Data</h3>
            <p>No Filter Applied</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCards;

