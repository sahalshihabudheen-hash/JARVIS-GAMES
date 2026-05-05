'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Game } from '@/lib/api';
import styles from '@/styles/GameCard.module.css';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  // Generate some random-ish stats for GameDistribution games if not available
  const displayRating = (game as any).rating || (4.5 + Math.random() * 0.5).toFixed(1);
  const displayPlays = (game as any).gamePlays 
    ? `${((game as any).gamePlays / 1000).toFixed(1)}k` 
    : `${(10 + Math.random() * 90).toFixed(1)}k`;

  return (
    <motion.div 
      className={styles.cardWrapper}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Link href={`/game/${game.id}`} className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image 
            src={game.thumbnail} 
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
          <div className={styles.overlay}>
            <div className={styles.playBtn}>
              <Play fill="white" size={24} />
            </div>
          </div>
          <div className={styles.categoryBadge}>
            {game.categories[0] || 'Game'}
          </div>
        </div>
        
        <div className={styles.details}>
          <h3 className={styles.title}>{game.name}</h3>
          <div className={styles.meta}>
            <div className={styles.rating}>
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span>{displayRating}</span>
            </div>
            <div className={styles.plays}>
              <Users size={14} />
              <span>{displayPlays}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
