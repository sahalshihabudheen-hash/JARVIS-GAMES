'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import GameCard from '@/components/GameCard';
import CategoryFilter from '@/components/CategoryFilter';
import Footer from '@/components/Footer';
import { fetchGames, Game } from '@/lib/api';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      const allGames = await fetchGames();
      setGames(allGames);
      setFilteredGames(allGames);
      setIsLoading(false);
    }
    loadGames();
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(g => 
        g.categories.some(c => c.toLowerCase() === category.toLowerCase())
      ));
    }
  };

  const categories = Array.from(new Set(games.flatMap(g => g.categories))).sort();

  return (
    <main className={styles.main}>
      <Navbar />
      
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="animate-fade-in">Premium Gaming <span>Hub</span></h1>
            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Play the world's best free HTML5 games. Instant access to high-quality titles like Football Legends, Ludo Star, and more!
            </p>
          </div>
        </div>
      </header>

      <section className={styles.catalogSection}>
        <div className="container">
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />

          {isLoading ? (
            <div className={styles.loader}>Loading Premium Games...</div>
          ) : (
            <div className={styles.grid}>
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
          
          {!isLoading && filteredGames.length === 0 && (
            <div className={styles.noResults}>
              No games found in this category.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
