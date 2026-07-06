import Hero from "../components/sections/Hero";
import PortfolioGrid from "../components/sections/PortofolioGrid";

const stripHtml = (value = "") => {
  const withoutTags = value.replace(/<[^>]+>/g, "");
  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;
  return textarea.value.trim();
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioGrid />
    </>
  );
}