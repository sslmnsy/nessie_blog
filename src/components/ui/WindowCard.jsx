import styles from "./WindowCard.module.css";

export default function WindowCard({
  title,
  icon,
  children,
  className = "",
  buttons = ["_", "□", "✕"],
}) {
  return (
    <div className={`${styles.window} ${className}`}>
      <div className={styles.titleBar}>
        <div className={styles.title}>
          <span>{icon}</span>
          <span>{title}</span>
        </div>

        <div className={styles.buttons}>
          {buttons.map((b, i) => (
            <button key={i} aria-label={b}>{b}</button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}