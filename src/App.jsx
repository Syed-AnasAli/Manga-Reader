import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import MangaPage from "./pages/Manga";
import HomePage from "./pages/HomePage";
import Chapter from "./pages/Chapter";
import NotFoundPage from "./pages/NotFound";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manga/:mangaName" element={<MangaPage />} />
          <Route path="/manga/:mangaName/:chapter" element={<Chapter />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
