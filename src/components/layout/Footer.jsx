import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={styles.checker} />
      <footer className={styles.footer}>
        <div className={styles.brand}>
          <div className={styles.footerLogo}>nessie✦</div>
          <div className={styles.footerCopy}>
            © 2025 nessie. all rights reserved.
            <br />
            made with 💗 &amp; lots of coffee
          </div>
        </div>

        <div className={styles.col}>
          <h4>work</h4>
          <Link to="/projects">all projects</Link>
          <a href="#featured">featured</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">github</a>
        </div>

        <div className={styles.col}>
          <h4>info</h4>
          <a href="#about">about me</a>
          <a href="#resume">resume</a>
          <Link to="/blog">blog</Link>
        </div>

        <div className={styles.col}>
          <h4>connect</h4>
          <a href="mailto:hello@sslmnsy.dev">email</a>
          <a href="#" target="_blank" rel="noreferrer">instagram</a>
          <a href="#" target="_blank" rel="noreferrer">twitter</a>
        </div>

      </footer>
    </>
  );
}