import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;