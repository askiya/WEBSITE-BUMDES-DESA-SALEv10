import React, { useEffect } from 'react';
import { FileText, Download, Shield, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Regulasi = ({ language }) => {
  const isIndonesian = language === 'id';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  const documents = [
    {
      title: isIndonesian ? 'Peraturan Desa Tentang BUMDes' : 'Village Regulations on BUMDes',
      description: isIndonesian
        ? 'Perda No. 01/2018 tentang Pendirian dan Pengelolaan BUMDes Desa Sale'
        : 'Village Regulation No. 01/2018 on Establishment and Management of BUMDes Sale Village',
      date: '2018',
      size: '2.4 MB',
    },
    {
      title: isIndonesian ? 'Anggaran Dasar BUMDes' : 'BUMDes Articles of Association',
      description: isIndonesian
        ? 'Anggaran Dasar dan Anggaran Rumah Tangga BUMDes Desa Sale'
        : 'Articles of Association and Bylaws of BUMDes Desa Sale',
      date: '2018',
      size: '1.8 MB',
    },
    {
      title: isIndonesian ? 'Standar Operasional Prosedur' : 'Standard Operating Procedures',
      description: isIndonesian
        ? 'SOP Pelayanan dan Pengelolaan BUMDes Desa Sale'
        : 'Service and Management SOPs of BUMDes Desa Sale',
      date: '2019',
      size: '3.2 MB',
    },
    {
      title: isIndonesian ? 'Kebijakan Privasi' : 'Privacy Policy',
      description: isIndonesian
        ? 'Kebijakan perlindungan data dan privasi pengguna layanan BUMDes'
        : 'Data protection and user privacy policy for BUMDes services',
      date: '2024',
      size: '0.8 MB',
    },
    {
      title: isIndonesian ? 'Syarat dan Ketentuan' : 'Terms and Conditions',
      description: isIndonesian
        ? 'Syarat dan ketentuan penggunaan layanan BUMDes Desa Sale'
        : 'Terms and conditions for using BUMDes Desa Sale services',
      date: '2024',
      size: '1.2 MB',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        data-aos="fade-down"
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Scale className="h-4 w-4 mr-2" />
            {isIndonesian ? 'Regulasi & Dokumen' : 'Regulations & Documents'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="zoom-in">
            {isIndonesian ? 'Regulasi dan Dokumen Publik' : 'Regulations and Public Documents'}
          </h1>
          <p className="text-lg text-gray-600" data-aos="fade-up">
            {isIndonesian
              ? 'Akses dokumen legal, peraturan, dan kebijakan BUMDes Desa Sale'
              : 'Access legal documents, regulations, and BUMDes Desa Sale policies'}
          </p>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Shield className="h-7 w-7 text-white" />,
              title: isIndonesian ? 'Legal & Sah' : 'Legal & Valid',
              desc: isIndonesian
                ? 'Semua dokumen telah disahkan oleh pihak berwenang'
                : 'All documents have been validated by authorized parties',
            },
            {
              icon: <FileText className="h-7 w-7 text-white" />,
              title: isIndonesian ? 'Mudah Diakses' : 'Easily Accessible',
              desc: isIndonesian
                ? 'Dokumen dapat diunduh kapan saja oleh publik'
                : 'Documents can be downloaded anytime by the public',
            },
            {
              icon: <Scale className="h-7 w-7 text-white" />,
              title: isIndonesian ? 'Selalu Update' : 'Always Updated',
              desc: isIndonesian
                ? 'Dokumen diperbarui sesuai peraturan terbaru'
                : 'Documents updated according to latest regulations',
            },
          ].map((item, i) => (
            <Card
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="border-2 border-green-100 hover:shadow-xl transition-all"
            >
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  {item.icon}
                </div>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Documents List */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isIndonesian ? 'Dokumen Tersedia' : 'Available Documents'}
            </h2>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Unduh dokumen yang Anda butuhkan'
                : 'Download the documents you need'}
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{isIndonesian ? 'Tahun' : 'Year'}: {doc.date}</span>
                          <span>•</span>
                          <span>{isIndonesian ? 'Ukuran' : 'Size'}: {doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 text-white md:ml-4">
                      <Download className="h-4 w-4 mr-2" />
                      {isIndonesian ? 'Unduh' : 'Download'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-aos="zoom-in-up"
        className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {isIndonesian ? 'Butuh Bantuan Memahami Regulasi?' : 'Need Help Understanding Regulations?'}
          </h2>
          <p className="text-lg mb-8 text-green-50">
            {isIndonesian
              ? 'Tim kami siap membantu menjelaskan peraturan dan kebijakan BUMDes Desa Sale'
              : 'Our team is ready to help explain BUMDes Desa Sale regulations and policies'}
          </p>
          <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 shadow-lg">
            {isIndonesian ? 'Hubungi Kami' : 'Contact Us'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Regulasi;
