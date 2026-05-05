'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.scrollWrapper}>
        <button 
          className={`${styles.filterBtn} ${activeCategory === 'All' ? styles.active : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All Games
        </button>
        {categories.map((category) => (
          <button 
            key={category}
            className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
