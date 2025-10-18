import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// 🪄 Tambahkan ini:
import AOS from "aos";
import "aos/dist/aos.css";

// Inisialisasi AOS sekali di sini (global)
AOS.init({
  duration: 1000, // durasi animasi
  once: true,     // animasi hanya sekali muncul
  easing: "ease-out-cubic", // gaya gerakan
  offset: 50,     // jarak sebelum animasi aktif
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);