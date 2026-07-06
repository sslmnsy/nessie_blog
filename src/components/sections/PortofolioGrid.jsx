import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PortofolioGrid.module.css";
import WindowCard from "../ui/WindowCard";
import { getPosts, getProjects } from "../../api/wordpress";
import herCircle from "../../assets/her_circle.png";

export default function PortfolioGrid() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [postsData, projectsData] = await Promise.all([
          getPosts(4),
          getProjects(2),
        ]);
        if (mounted) {
          setPosts(postsData);
          setProjects(projectsData);
        }
      } catch (err) {
        if (mounted) {
          setError("Content is temporarily unavailable.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const stripHtml = (value = "") => {
    const withoutTags = value.replace(/<[^>]+>/g, "");
    const textarea = document.createElement("textarea");
    textarea.innerHTML = withoutTags;
    return textarea.value.trim();
  };

  return (
    <section className={styles.grid}>
      <div className={styles.leftGroup}>
        <WindowCard title="♡ projects" className={styles.projects}>
          <div className={styles.projectList}>
            {loading && <p>loading projects…</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && projects.length === 0 && <p>no projects yet.</p>}
            {!loading && !error &&
              projects.map((project) => {
                const imageUrl =
                  project._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url
                  ?? project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <div key={project.id} className={styles.projectCard}>
                    {imageUrl && (
                      <div className={styles.projectThumb}>
                        <img src={imageUrl} alt={project.title.rendered} />
                      </div>
                    )}
                    <h3>{project.title.rendered}</h3>
                    <p className={styles.projectStack}>{project.acf?.tech_stack}</p>
                    <p className={styles.projectDesc}>
                      {stripHtml(project.content.rendered)}
                    </p>
                  </div>
                );
              })}
            <Link to="/projects" className={styles.readMore}>read more on projects →</Link>
          </div>
        </WindowCard>

        <div className={styles.col2}>
          <WindowCard title="♡ blog corner" className={styles.blogCorner}>
            <ul className={styles.blogList}>
              {loading && <li>loading blog posts…</li>}
              {!loading && error && <li>{error}</li>}
              {!loading && !error && posts.length === 0 && <li>no posts yet.</li>}
              {!loading && !error &&
                posts.map((post) => (
                  <li key={post.id}>
                    <span className={styles.chevron}>›</span>{" "}
                    <Link to={`/blog/${post.slug}`}>
                      {stripHtml(post.title.rendered)}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link to="/blog" className={styles.readMore}>read more on the blog →</Link>
          </WindowCard>

          <WindowCard title="♬⋆.˚ playlist" className={styles.playlist}>
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/6rkFws5zCPodo3pUZNbAbl?utm_source=generator&si=daef96f168694b2a"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </WindowCard>
        </div>
      </div>

      <div className={styles.col3}>
        <WindowCard title="✩ my faves" className={styles.myFaves}>
          <p className={styles.favesText}>
            books, games, and way too many browser tabs — that's basically me.
            when i'm not coding you'll probably find me lost in a cozy indie
            game, deep into a fantasy novel, or hoarding design inspo i'll
            "definitely use later" ✦
          </p>
        </WindowCard>

        <WindowCard title="♡ about — nessie" className={styles.about}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutAvatar}>
              <img src={herCircle} alt="Nessie" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3>Nessie</h3>
            <p className={styles.aboutRole}>Informatics Student</p>
            <p className={styles.aboutBio}>
              hi!! i'm nessie, an informatics student. currently exploring headless wordpress + react ✦
            </p>
            <Link to="/about" className={styles.aboutBtn}>read more →</Link>
          </div>
        </WindowCard>
      </div>
    </section>
  );
}