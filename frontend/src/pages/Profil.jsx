import React from 'react';
import { Users, Target, Award, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { profileData } from '../mock';

const Profil = ({ language }) => {
  const isIndonesian = language === 'id';
  const content = profileData[language] || profileData.id;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-amber-50"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Award className="h-4 w-4 mr-2" />
              {isIndonesian ? 'Tentang Kami' : 'About Us'}
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {isIndonesian ? 'Profil BUMDes Desa Sale' : 'BUMDes Desa Sale Profile'}
            </h1>
            <p
              className="text-lg text-gray-600"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {isIndonesian
                ? 'Mengenal lebih dekat BUMDes Desa Sale, perjalanan kami, dan komitmen untuk membangun ekonomi desa yang sejahtera'
                : 'Get to know BUMDes Desa Sale, our journey, and commitment to building a prosperous village economy'}
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-duration="1000">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <History className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {isIndonesian ? 'Sejarah Kami' : 'Our History'}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">{content.history}</p>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 bg-green-50 rounded-lg"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <p className="text-3xl font-bold text-green-700 mb-1">2018</p>
                <p className="text-sm text-gray-600">
                  {isIndonesian ? 'Tahun Berdiri' : 'Year Established'}
                </p>
              </div>
              <div
                className="p-4 bg-green-50 rounded-lg"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <p className="text-3xl font-bold text-green-700 mb-1">7+</p>
                <p className="text-sm text-gray-600">
                  {isIndonesian ? 'Tahun Beroperasi' : 'Years Operating'}
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <History className="h-12 w-12 text-green-600" />
                </div>
                <p className="text-green-800 font-medium">
                  {isIndonesian ? 'Foto Dokumentasi Desa Sale' : 'Sale Village Documentation Photo'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        className="py-16 px-4 bg-gradient-to-br from-green-50 to-white"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card
            className="border-2 border-green-200 shadow-lg"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{isIndonesian ? 'Visi Kami' : 'Our Vision'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">{content.vision}</p>
            </CardContent>
          </Card>

          <Card
            className="border-2 border-amber-200 shadow-lg"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{isIndonesian ? 'Misi Kami' : 'Our Mission'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.mission.map((item, index) => (
                  <li
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={150 + index * 100}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {isIndonesian ? 'Struktur Organisasi' : 'Organizational Structure'}
              </h2>
            </div>
            <p className="text-gray-600">
              {isIndonesian
                ? 'Tim profesional yang berdedikasi untuk kemajuan Desa Sale'
                : 'Professional team dedicated to the progress of Sale Village'}
            </p>
          </div>

          <div className="space-y-4">
            {content.structure.map((person, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-green-700 font-medium">{person.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isIndonesian ? 'Galeri Kegiatan' : 'Activity Gallery'}
          </h2>
          <p className="text-gray-600">
            {isIndonesian
              ? 'Dokumentasi kegiatan dan program BUMDes Desa Sale'
              : 'Documentation of BUMDes Desa Sale activities and programs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              data-aos="zoom-in"
              data-aos-delay={item * 100}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-green-800 font-medium">
                    {isIndonesian ? 'Dokumentasi Kegiatan' : 'Activity Documentation'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profil;