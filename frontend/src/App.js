import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import UnitUsaha from "./pages/UnitUsaha";
import Produk from "./pages/Produk";
import Permodalan from "./pages/Permodalan";
import Transparansi from "./pages/Transparansi";
import Berita from "./pages/Berita";
import Kontak from "./pages/Kontak";
import Edukasi from "./pages/Edukasi";
import Regulasi from "./pages/Regulasi";
import { Toaster } from "./components/ui/toaster";

// ✅ Komponen ini di dalam BrowserRouter
function AnimatedRoutes({ language, setLanguage }) {
  const location = useLocation();

  // Inisialisasi AOS
useEffect(() => {
  import("aos").then(AOS => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
      offset: 50,
    });
  });
}, []);

  // Refresh AOS setiap route berubah
  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />

      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/profil" element={<Profil language={language} />} />
        <Route path="/unit-usaha" element={<UnitUsaha language={language} />} />
        <Route path="/produk" element={<Produk language={language} />} />
        <Route path="/permodalan" element={<Permodalan language={language} />} />
        <Route path="/transparansi" element={<Transparansi language={language} />} />
        <Route path="/berita" element={<Berita language={language} />} />
        <Route path="/kontak" element={<Kontak language={language} />} />
        <Route path="/edukasi" element={<Edukasi language={language} />} />
        <Route path="/regulasi" element={<Regulasi language={language} />} />
      </Routes>

      <Footer language={language} />
      <Toaster />
    </>
  );
}

function App() {
  const [language, setLanguage] = useState("id");

  return (
    <div className="App">
      {/* ✅ Sekarang BrowserRouter membungkus semua */}
      <BrowserRouter>
        <AnimatedRoutes language={language} setLanguage={setLanguage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
