import { useState, useEffect } from "react";
import { getAboutPage } from "../api/wordpress";
import "../styles/page-shared.css";
import "./About.css";
import herCircle from "../assets/her_circle.png";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    let mounted = true;

    getAboutPage()
      .then((data) => {
        if (mounted) setAbout(data.acf);
      })
      .catch(() => {
        if (mounted) setError("About content is temporarily unavailable.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="page-status">loading...</p>;
  if (error) return <p className="page-status">{error}</p>;
  if (!about) return null;

  const formatParagraphs = (value = "") =>
    value
      .split(/\r?\n\s*\r?\n/) // split on blank lines
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => `<p>${chunk.replace(/\r?\n/g, "<br>")}</p>`)
      .join("");

  const profileImage = about.profile_image?.url || herCircle;
  const profileAlt = about.profile_image?.alt || about.heading || "Profile photo";

  const skills = [1, 2, 3, 4]
    .map((n) => ({
      icon: about[`skill_${n}_icon`],
      title: about[`skill_${n}_title`],
      description: about[`skill_${n}_description`],
    }))
    .filter((skill) => skill.title);

  return (
    <div className="aboutPage">
      <section className="aboutHero">
        <div className="aboutContainer">
          <div className="aboutImage">
            <img src={profileImage} alt={profileAlt} />
          </div>
          <div className="aboutInfo">
            <h1>{about.heading}</h1>
            {about.role && <p className="aboutRole">{about.role}</p>}
            {about.bio && (
              <div
                className="aboutBio"
                dangerouslySetInnerHTML={{ __html: formatParagraphs(about.bio) }}
              />
            )}
          </div>
        </div>
      </section>

      {skills.length > 0 && (
        <section className="aboutSkills">
          <div className="aboutContainer">
            <h2>What I Do</h2>
            <div className="skillsGrid">
              {skills.map((skill, index) => (
                <div className="skillCard" key={index}>
                  <h3>
                    {skill.icon} {skill.title}
                  </h3>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="aboutCTA">
        <div className="aboutContainer">
          <h2>{about.cta_heading || "Let's Connect!"}</h2>
          <p>{about.cta_text || "I'm always interested in new projects, collaborations, and conversations."}</p>
          {about.contact_email && (
            <a href={`mailto:${about.contact_email}`} className="ctaButton">
              Get In Touch
            </a>
          )}
        </div>
      </section>
    </div>
  );
}