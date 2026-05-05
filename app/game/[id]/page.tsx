'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { getGameById, fetchGames, Game } from '@/lib/api';
import { Maximize, Share2, Heart, Flag, ExternalLink } from 'lucide-react';
import styles from '@/styles/GamePlay.module.css';

const GamePlayPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGameData() {
      if (typeof id === 'string') {
        const gameData = await getGameById(id);
        setGame(gameData);
        
        const allGames = await fetchGames();
        setRelatedGames(allGames.filter(g => g.id !== id).slice(0, 8));
        setIsLoading(false);
      }
    }
    loadGameData();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <Navbar />
        <div className={styles.loader}>Loading Masterpiece...</div>
        <Footer />
      </div>
    );
  }

  if (!game) {
    return (
      <div className={styles.errorWrapper}>
        <Navbar />
        <div className={styles.error}>Game not found</div>
        <Footer />
      </div>
    );
  }

  const openFullscreen = () => {
    window.open(game.url, '_blank');
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container">
        <div className={styles.contentLayout}>
          <div className={styles.mainContent}>
            {/* Top Ad Unit */}
            <div className={styles.adPlaceholderTop}>
              <span>ADVERTISEMENT</span>
            </div>

            <div className={styles.gameContainer}>
              <div className={styles.iframeWrapper} style={{ aspectRatio: game.isPortrait ? '9/16' : '16/9' }}>
                <iframe 
                  src={game.url} 
                  frameBorder="0" 
                  allowFullScreen
                  title={game.name}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
                ></iframe>
              </div>
              
              <div className={styles.controls}>
                <div className={styles.gameInfo}>
                  <h1>{game.name}</h1>
                  <p>{game.categories.join(' • ')}</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={openFullscreen} title="Open in Full Window"><ExternalLink size={20} /></button>
                  <button title="Favorite"><Heart size={20} /></button>
                  <button title="Share"><Share2 size={20} /></button>
                  <button title="Report"><Flag size={20} /></button>
                </div>
              </div>
            </div>

            {game.source === 'gamezop' && (
              <div className={styles.iframeWarning}>
                <p>Having trouble loading the game? <a href={game.url} target="_blank" rel="noopener noreferrer">Click here to play in a new window</a>.</p>
              </div>
            )}

            <div className={styles.detailsSection}>
              <div className={styles.description}>
                <h2>About this Game</h2>
                <p>{game.description}</p>
                {game.instructions && (
                  <>
                    <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.1rem' }}>How to Play</h3>
                    <p>{game.instructions}</p>
                  </>
                )}
              </div>
              <div className={styles.tags}>
                {game.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.adPlaceholderSide}>
              <span>ADVERTISEMENT</span>
            </div>
            
            <div className={styles.relatedHeader}>
              <h3>Related Games</h3>
            </div>
            <div className={styles.relatedGrid}>
              {relatedGames.map(g => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GamePlayPage;
