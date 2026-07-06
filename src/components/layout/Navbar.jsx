// src/components/layout/Navbar.jsx
import { useState } from 'react';
import styles from './Navbar.module.css';
import homeIcon from '../../assets/home.png'; 
import projectsIcon from '../../assets/projects.png';
import aboutIcon from '../../assets/about.png';
import blogIcon from '../../assets/blog.png';
import contactIcon from '../../assets/contact.png';

const NAV_LINKS = [
  { icon: homeIcon, label: 'home', href: '/' },
  { icon: projectsIcon, label: 'projects', href: '/projects' },
  { icon: aboutIcon, label: 'about', href: '/about' },
  { icon: blogIcon, label: 'blog', href: '/blog' },
  { icon: contactIcon, label: 'contact', href: 'https://www.instagram.com/nessie.days/' },
];

export default function Navbar() {
  const [query, setQuery] = useState('');


  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        my home
      </a>

      <div className={styles.navLinks}>
        {NAV_LINKS.map(({ icon, label, href }) => (
          <a key={label} href={href}>
            <img src={icon} alt="" className={styles.navIcon} />
            {label}
          </a>
        ))}
      </div>

    </nav>
  );
}