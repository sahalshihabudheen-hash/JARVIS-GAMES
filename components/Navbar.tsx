'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Gamepad2, Menu, X } from 'lucide-react';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className="container">
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <Gamepad2 size={32} className={styles.logoIcon} />
            <span>Gamer<span>Portal</span></span>
          </Link>

          <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
            <Link href="/" className={styles.activeLink}>Home</Link>
            <Link href="/category/action">Action</Link>
            <Link href="/category/puzzle">Puzzle</Link>
            <Link href="/category/sports">Sports</Link>
            <Link href="/category/adventure">Adventure</Link>
          </div>

          <div className={styles.actions}>
            <div className={`${styles.searchWrapper} ${isSearchOpen ? styles.expanded : ''}`}>
              <button 
                className={styles.searchToggle}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Search games..." 
                className={styles.searchInput}
              />
            </div>
            
            <button 
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
