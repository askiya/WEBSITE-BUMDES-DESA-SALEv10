import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ language }) => {
  const isIndonesian = language === 'id';

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">BUMDes Desa Sale</h3>
                <p className="text-xs text-green-200">Desa Sale, Indonesia</p>
              </div>
            </div>
            <p className="text-sm text-green-100 leading-relaxed">
              {isIndonesian
                ? 'Membangun ekonomi desa yang mandiri, transparan, dan berkelanjutan untuk kesejahteraan bersama.'
                : 'Building independent, transparent, and sustainable village economy for shared prosperity.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{isIndonesian ? 'Tautan Cepat' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profil" className="text-sm text-green-100 hover:text-white transition-colors">
                  {isIndonesian ? 'Tentang Kami' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/unit-usaha" className="text-sm text-green-100 hover:text-white transition-colors">
                  {isIndonesian ? 'Unit Usaha' : 'Business Units'}
                </Link>
              </li>
              <li>
                <Link to="/produk" className="text-sm text-green-100 hover:text-white transition-colors">
                  {isIndonesian ? 'Produk & Layanan' : 'Products & Services'}
                </Link>
              </li>
              <li>
                <Link to="/transparansi" className="text-sm text-green-100 hover:text-white transition-colors">
                  {isIndonesian ? 'Transparansi' : 'Transparency'}
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-sm text-green-100 hover:text-white transition-colors">
                  {isIndonesian ? 'Berita & Kegiatan' : 'News & Events'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{isIndonesian ? 'Kontak' : 'Contact'}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-100">Jl. Desa Sale No. 123, Kec. Sale, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-100">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-100">info@bumdesdesasale.id</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{isIndonesian ? 'Ikuti Kami' : 'Follow Us'}</h4>
            <p className="text-sm text-green-100 mb-4">
              {isIndonesian
                ? 'Ikuti perkembangan dan kegiatan BUMDes Desa Sale'
                : 'Follow the developments and activities of BUMDes Desa Sale'}
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-green-200">
              &copy; 2025 BUMDes Desa Sale. {isIndonesian ? 'Semua hak dilindungi.' : 'All rights reserved.'}
            </p>
            <div className="flex space-x-6">
              <Link to="/regulasi" className="text-sm text-green-200 hover:text-white transition-colors">
                {isIndonesian ? 'Kebijakan Privasi' : 'Privacy Policy'}
              </Link>
              <Link to="/regulasi" className="text-sm text-green-200 hover:text-white transition-colors">
                {isIndonesian ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;