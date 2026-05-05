import React from 'react';
import Link from 'next/link';
import { Gamepad2, CodeXml, X, Camera } from 'lucide-react';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Gamepad2 size={32} className={styles.logoIcon} />
              <span>Gamer<span>Portal</span></span>
            </Link>
            <p>The best place to play free HTML5 games online. No downloads required!</p>
            <div className={styles.socials}>
              <a href="#" title="Twitter/X"><X size={20} /></a>
              <a href="#" title="Instagram"><Camera size={20} /></a>
              <a href="#" title="Github"><CodeXml size={20} /></a>
            </div>
          </div>
          
          <div className={styles.links}>
            <div>
              <h4>Explore</h4>
              <Link href="/category/action">Action</Link>
              <Link href="/category/puzzle">Puzzle</Link>
              <Link href="/category/sports">Sports</Link>
            </div>
            <div>
              <h4>Support</h4>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} GamerPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
