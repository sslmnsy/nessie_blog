import styles from './AnnouncementBar.module.css';

const ANNOUNCEMENTS = [
  "CHECK OUT MY PROJECTS",
  "CURRENTLY LEARNING: HEADLESS WORDPRESS",
  "BASED IN INDONESIA",
];

export default function AnnouncementBar() {
  return (
    <div className={styles.announce}>
      {ANNOUNCEMENTS.map((text, index) => (
        <span key={index}>✦ {text} ✦</span>
      ))}
    </div>
  );
}