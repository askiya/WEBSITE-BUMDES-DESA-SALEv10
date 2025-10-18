import React, { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Calendar, Filter, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { newsData } from "../mock";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const Berita = ({ language }) => {
  const isIndonesian = language === "id";
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Pelatihan", "Produk", "Penghargaan", "Kemitraan"];

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      Pelatihan: "bg-blue-100 text-blue-700 border-blue-200",
      Produk: "bg-green-100 text-green-700 border-green-200",
      Penghargaan: "bg-purple-100 text-purple-700 border-purple-200",
      Kemitraan: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
      >
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Newspaper className="h-4 w-4 mr-2" />
            {isIndonesian ? "Berita & Kegiatan" : "News & Events"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isIndonesian ? "Berita dan Kegiatan Terkini" : "Latest News and Events"}
          </h1>
          <p className="text-lg text-gray-600">
            {isIndonesian
              ? "Update terbaru tentang kegiatan, program, dan pencapaian BUMDes Desa Sale"
              : "Latest updates on BUMDes Desa Sale activities, programs, and achievements"}
          </p>
        </div>
      </motion.section>

      {/* FILTER SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-8 px-4 bg-white border-b"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <p className="text-gray-700 font-medium">
              {isIndonesian ? "Filter berdasarkan kategori:" : "Filter by category:"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                variants={fadeUp}
                custom={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? (isIndonesian ? "Semua" : "All") : category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURED NEWS */}
      {filteredNews.length > 0 && (
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 px-4 bg-gradient-to-br from-green-50 to-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {isIndonesian ? "Berita Utama" : "Featured News"}
              </h2>
            </div>
            <motion.div variants={fadeUp} custom={0.1}>
              <Card className="border-2 border-green-200 hover:shadow-2xl transition-all overflow-hidden rounded-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="aspect-video lg:aspect-auto bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Newspaper className="h-20 w-20 text-green-600 mx-auto mb-4" />
                      <p className="text-green-800 font-medium">
                        {isIndonesian ? "Gambar Berita Utama" : "Featured News Image"}
                      </p>
                    </div>
                  </motion.div>
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className={`${getCategoryColor(filteredNews[0].category)} border`}>
                        {filteredNews[0].category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {filteredNews[0].date}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{filteredNews[0].title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{filteredNews[0].excerpt}</p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      {isIndonesian ? "Baca Selengkapnya" : "Read More"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* NEWS GRID */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              {isIndonesian ? "Berita Lainnya" : "Other News"}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.slice(1).map((news, i) => (
              <motion.div
                key={news.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <Card className="border-2 border-green-100 hover:border-green-400 hover:shadow-xl transition-all overflow-hidden group cursor-pointer rounded-xl">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                      <Newspaper className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium text-sm">
                        {isIndonesian ? "Gambar Berita" : "News Image"}
                      </p>
                    </motion.div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${getCategoryColor(news.category)} border text-xs`}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {news.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-green-700 transition-colors">
                      {news.title}
                    </CardTitle>
                    <CardDescription>{news.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full text-green-700 hover:bg-green-50">
                      {isIndonesian ? "Baca Selengkapnya" : "Read More"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center py-12"
            >
              <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {isIndonesian ? "Belum ada berita" : "No news yet"}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Berita;
