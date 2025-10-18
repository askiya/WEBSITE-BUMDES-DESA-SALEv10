import React from 'react';
import { BookOpen, Video, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Edukasi = ({ language }) => {
  const isIndonesian = language === 'id';

  const resources = [
    {
      title: isIndonesian ? 'Manajemen Keuangan UMKM' : 'SME Financial Management',
      description: isIndonesian
        ? 'Panduan lengkap mengelola keuangan usaha kecil menengah'
        : 'Complete guide to managing small and medium business finances',
      icon: 'BookOpen',
      type: isIndonesian ? 'Artikel' : 'Article',
    },
    {
      title: isIndonesian ? 'Strategi Pemasaran Digital' : 'Digital Marketing Strategy',
      description: isIndonesian
        ? 'Cara memasarkan produk lokal di era digital'
        : 'How to market local products in the digital era',
      icon: 'Video',
      type: 'Video',
    },
    {
      title: isIndonesian ? 'Pertanian Organik Modern' : 'Modern Organic Farming',
      description: isIndonesian
        ? 'Teknik pertanian organik untuk hasil maksimal'
        : 'Organic farming techniques for maximum results',
      icon: 'FileText',
      type: isIndonesian ? 'Panduan' : 'Guide',
    },
    {
      title: isIndonesian ? 'Kewirausahaan Desa' : 'Village Entrepreneurship',
      description: isIndonesian
        ? 'Peluang bisnis dan tips memulai usaha di desa'
        : 'Business opportunities and tips to start a village business',
      icon: 'Award',
      type: isIndonesian ? 'Pelatihan' : 'Training',
    },
  ];

  const renderIcon = (iconName) => {
    const icons = { BookOpen, Video, FileText, Award };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="h-7 w-7 text-white" /> : null;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50">
        <motion.div
          className="max-w-7xl mx-auto text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            {isIndonesian ? 'Edukasi & Wawasan' : 'Education & Insights'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isIndonesian ? 'Pusat Pembelajaran BUMDes' : 'BUMDes Learning Center'}
          </h1>
          <p className="text-lg text-gray-600">
            {isIndonesian
              ? 'Akses berbagai materi edukasi, pelatihan, dan wawasan untuk mengembangkan usaha dan keterampilan'
              : 'Access various educational materials, training, and insights to develop business and skills'}
          </p>
        </motion.div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? 'Materi Pembelajaran' : 'Learning Materials'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Pilih materi yang sesuai dengan kebutuhan Anda'
                : 'Choose materials that suit your needs'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-green-100 hover:border-green-400 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        {renderIcon(resource.icon)}
                      </motion.div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-green-700 transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                        {isIndonesian ? 'Pelajari' : 'Learn'}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? 'Kisah Sukses' : 'Success Stories'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Inspirasi dari para pelaku usaha Desa Sale'
                : 'Inspiration from Sale Village entrepreneurs'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-green-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-16 w-16 text-green-600 mx-auto mb-3" />
                      <p className="text-green-800 font-medium">
                        {isIndonesian ? 'Foto Pelaku Usaha' : 'Entrepreneur Photo'}
                      </p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isIndonesian ? 'Sukses Usaha Pertanian' : 'Successful Agriculture Business'}
                    </CardTitle>
                    <CardDescription>
                      {isIndonesian
                        ? 'Bagaimana modal dari BUMDes membantu mengembangkan usaha pertanian organik'
                        : 'How capital from BUMDes helped develop organic farming business'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button variant="ghost" className="w-full text-green-700 hover:bg-green-50">
                        {isIndonesian ? 'Baca Kisahnya' : 'Read Story'}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {isIndonesian ? 'Ikuti Program Pelatihan Kami' : 'Join Our Training Program'}
          </h2>
          <p className="text-lg mb-8 text-green-50">
            {isIndonesian
              ? 'Daftarkan diri Anda untuk program pelatihan dan workshop yang kami selenggarakan'
              : 'Register for our training programs and workshops'}
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 shadow-lg">
              {isIndonesian ? 'Daftar Sekarang' : 'Register Now'}
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Edukasi;
