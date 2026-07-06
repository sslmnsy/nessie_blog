import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/wordpress";
import "../styles/page-shared.css";
import "./Blog.css";

const stripHtml = (value = "") => {
  const withoutTags = value.replace(/<[^>]+>/g, "");
  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;
  return textarea.value.trim();
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    getPosts(100)
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch(() => {
        if (mounted) setError("Blog is temporarily unavailable.");
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

  return (
    <div className="page-container">
      <Link to="/" className="page-back">← back home</Link>
      <h1 className="page-title">all blog posts</h1>

      {posts.length === 0 && <p className="page-status">no posts yet.</p>}

      {posts.length > 0 && (
        <ul className="blog-list-items">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/blog/${post.slug}`}>
                {stripHtml(post.title.rendered)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}