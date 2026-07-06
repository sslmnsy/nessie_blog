import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/wordpress";
import "../styles/page-shared.css";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    getProjects(100)
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch(() => {
        if (mounted) setError("Projects are temporarily unavailable.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

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

  if (loading) return <p className="page-status">loading...</p>;
  if (error) return <p className="page-status">{error}</p>;

  return (
    <div className="page-container">
      <Link to="/" className="page-back">← back home</Link>
      <h1 className="page-title">all projects</h1>

      {projects.length === 0 && <p className="page-status">no projects yet.</p>}

      {projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((project) => {
            const imageUrl =
              project._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url
              ?? project._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div key={project.id} className="projects-card">
                {imageUrl && <img src={imageUrl} alt={project.title.rendered} />}
                <h3>{project.title.rendered}</h3>
                {project.acf?.tech_stack && (
                  <p className="projects-card-stack">{project.acf.tech_stack}</p>
                )}
                <p>{stripHtml(project.content.rendered)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}