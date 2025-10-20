import React from 'react';
import './CategoryList.css';
import { CategoryDistribution } from '../types';

interface CategoryListProps {
  categories: CategoryDistribution[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="category-list-container">
      <div className="category-list-header">
        <h2>📂 Categories</h2>
        {selectedCategory && (
          <button 
            className="clear-filter-btn"
            onClick={() => onSelectCategory(null)}
          >
            Clear Filter
          </button>
        )}
      </div>
      
      <div className="category-list">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className={`category-item ${selectedCategory === cat.category ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.category === selectedCategory ? null : cat.category)}
          >
            <div className="category-name">{cat.category}</div>
            <div className="category-count">{cat.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

