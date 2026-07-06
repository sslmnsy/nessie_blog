import WindowCard from "../ui/WindowCard";
import styles from "./QuickLinks.module.css";

const links = [
  { icon: "☆ ", label: "resume / cv", href: "https://drive.google.com/file/d/1ZhFe83VunhCzrl9FODeOBB9zkd9JbCh-/view?usp=sharing" },
  { icon: "☆ ", label: "github", href: "https://github.com/sslMnsy" },
  { icon: "☆ ", label: "socials", href: "https://www.instagram.com/nessie.days/" },
];

export default function QuickLinks() {
  return (
    <WindowCard title="✦ quick links" className={styles.quickLinksWindow}>
      <ul className={styles.list}>
        {links.map(({ icon, label, href }) => (
          <li key={label}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <span className={styles.icon}>{icon}</span>
                <span>{label}</span>
              </a>
            ) : (
              <>
                <span className={styles.icon}>{icon}</span>
                <span>{label}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </WindowCard>
  );
}