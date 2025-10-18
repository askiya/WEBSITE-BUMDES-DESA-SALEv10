import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { products } from "../mock";
import AOS from "aos";
import "aos/dist/aos.css";

const Produk = ({ language }) => {
  const isIndonesian = language === "id";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ⬇️ Inisialisasi AOS di sini
  useEffect(() => {
    AOS.init({
      duration: 800, // durasi animasi (ms)
      easing: "ease-in-out", // gaya animasi
      once: true, // hanya jalan sekali
    });
  }, []);

  const categories = ["all", "Pertanian", "UMKM", "Kerajinan"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Pertanian: "bg-green-100 text-green-700 border-green-200",
      UMKM: "bg-blue-100 text-blue-700 border-blue-200",
      Kerajinan: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section
        data-aos="fade-up"
        className="pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50 text-center"
      >
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isIndonesian ? "Produk Lokal" : "Local Products"}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {isIndonesian ? "Produk Unggulan Desa Sale" : "Sale Village Featured Products"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isIndonesian
            ? "Belanja produk berkualitas hasil karya warga Desa Sale. Mendukung ekonomi lokal, menjaga kearifan lokal."
            : "Shop quality products made by Sale Village residents. Support local economy, preserve local wisdom."}
        </p>
      </section>

      {/* FILTER */}
      <section data-aos="fade-up" className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={isIndonesian ? "Cari produk..." : "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 border-gray-200 focus:border-green-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? (isIndonesian ? "Semua" : "All") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK GRID */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="border-2 border-green-100 hover:border-green-400 hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="aspect-square bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center relative">
                <ShoppingBag className="h-16 w-16 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <Badge className={`absolute top-3 right-3 ${getCategoryColor(product.category)} border`}>
                  {product.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-green-700 transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-green-700">{product.price}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {isIndonesian ? "Status" : "Status"}:
                    </span>
                    <Badge
                      className={`${
                        product.stock === "Tersedia"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {product.stock}
                    </Badge>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {isIndonesian ? "Pesan Sekarang" : "Order Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div data-aos="fade-up" className="text-center py-12 col-span-full">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {isIndonesian ? "Produk tidak ditemukan" : "Products not found"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        data-aos="fade-up"
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white text-center"
      >
        <ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl font-bold mb-4">
          {isIndonesian ? "Ingin Produk Anda Dipasarkan?" : "Want Your Products Marketed?"}
        </h2>
        <p className="text-lg mb-8 text-green-50 max-w-2xl mx-auto">
          {isIndonesian
            ? "BUMDes Desa Sale membantu memasarkan produk lokal Anda. Hubungi kami untuk informasi lebih lanjut."
            : "BUMDes Desa Sale helps market your local products. Contact us for more information."}
        </p>
        <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 shadow-lg">
          {isIndonesian ? "Daftar Sebagai Mitra" : "Register as Partner"}
        </Button>
      </section>
    </div>
  );
};

export default Produk;
