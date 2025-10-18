import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { businessUnits } from '../mock';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UnitUsaha = ({ language }) => {
  const isIndonesian = language === 'id';
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 80,
    });
  }, []);

  const categories = ['all', 'Retail', 'Keuangan', 'Lingkungan', 'Pariwisata', 'Agribisnis', 'UMKM'];

  const filteredUnits =
    selectedCategory === 'all'
      ? businessUnits
      : businessUnits.filter((unit) => unit.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      Retail: 'bg-blue-100 text-blue-700 border-blue-200',
      Keuangan: 'bg-green-100 text-green-700 border-green-200',
      Lingkungan: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Pariwisata: 'bg-purple-100 text-purple-700 border-purple-200',
      Agribisnis: 'bg-amber-100 text-amber-700 border-amber-200',
      UMKM: 'bg-rose-100 text-rose-700 border-rose-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
              data-aos="zoom-in"
            >
              <Building2 className="h-4 w-4 mr-2" />
              {isIndonesian ? 'Unit Usaha' : 'Business Units'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up">
              {isIndonesian ? 'Unit Usaha BUMDes Desa Sale' : 'BUMDes Desa Sale Business Units'}
            </h1>
            <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
              {isIndonesian
                ? 'Beragam unit usaha yang dikelola secara profesional untuk meningkatkan ekonomi desa dan kesejahteraan masyarakat'
                : 'Various business units professionally managed to improve village economy and community welfare'}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: businessUnits.length, label: isIndonesian ? 'Unit Usaha Aktif' : 'Active Business Units' },
              { value: 'Rp 2.5M', label: isIndonesian ? 'Total Pendapatan' : 'Total Revenue' },
              { value: '120+', label: isIndonesian ? 'Pekerja Lokal' : 'Local Workers' },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-2 border-green-100"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-green-700 mb-2">{item.value}</p>
                  <p className="text-gray-600">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-gradient-to-br from-green-50 to-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Filter className="h-5 w-5 text-gray-600" />
            <p className="text-gray-700 font-medium">
              {isIndonesian ? 'Filter berdasarkan kategori:' : 'Filter by category:'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                data-aos="zoom-in"
                data-aos-delay="100"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                {category === 'all' ? (isIndonesian ? 'Semua' : 'All') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Business Units Grid */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit, index) => (
            <Card
              key={unit.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="border-2 border-green-100 hover:border-green-400 hover:shadow-xl transition-all group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <Badge className={`${getCategoryColor(unit.category)} border`}>
                    {unit.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-green-700 transition-colors">
                  {unit.name}
                </CardTitle>
                <CardDescription className="text-gray-600">{unit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {isIndonesian ? 'Pendapatan' : 'Revenue'}
                      </span>
                    </div>
                    <span className="font-bold text-green-700">{unit.revenue}</span>
                  </div>
                  <button className="w-full py-2 bg-white border-2 border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    {isIndonesian ? 'Lihat Detail' : 'View Details'}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredUnits.length === 0 && (
            <div className="text-center py-12" data-aos="fade-up">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {isIndonesian ? 'Tidak ada unit usaha ditemukan' : 'No business units found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
        data-aos="zoom-in"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {isIndonesian ? 'Tertarik Bermitra dengan Kami?' : 'Interested in Partnering with Us?'}
          </h2>
          <p className="text-lg mb-8 text-green-50">
            {isIndonesian
              ? 'Hubungi kami untuk informasi lebih lanjut tentang kemitraan dan peluang investasi di unit usaha BUMDes Desa Sale'
              : 'Contact us for more information about partnerships and investment opportunities in BUMDes Desa Sale business units'}
          </p>
          <button className="px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg">
            {isIndonesian ? 'Hubungi Kami' : 'Contact Us'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default UnitUsaha;
