import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../api/wordpress";
import "../styles/page-shared.css";
import "./BlogPost.css";

const stripHtml = (value = "") => {
  const withoutTags = value.replace(/<[^>]+>/g, "");
  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;
  return textarea.value.trim();
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getPostBySlug(slug)
      .then((data) => {
        if (mounted) setPost(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) return <p className="page-status">loading...</p>;
  if (error) return <p className="page-status">oops: {error}</p>;

 

  return (
    <article className="page-container">
      <Link to="/" className="page-back">← back home</Link>
      <h1
        className="page-title"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}