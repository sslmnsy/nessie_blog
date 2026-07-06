import styles from "./Hero.module.css";
import QuickLinks from "./QuickLinks";
import Memo from "./Memo";
import WindowCard from "../ui/WindowCard";
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.sidebarLeft}>
        <QuickLinks />
        <Memo />
      </div>

      <div className={styles.heroCenter}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>nessie's</span>
            <span className={styles.titleLine}>blogpost</span>
          </h1>
          <p className={styles.subtitle}>
            informatics student.<br />
            i build pretty things that (hopefully) work.
          </p>

        </div>

        <WindowCard title="her.png" className={styles.heroPhoto}>
          <img src="/freya.png" alt="freya" />
        </WindowCard>
      </div>

      <div className={styles.sidebarRight}>
        {/* Right windows */}
      </div>
    </section>
  );
}