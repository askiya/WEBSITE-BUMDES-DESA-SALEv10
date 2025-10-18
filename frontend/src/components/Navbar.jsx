import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { siteContent } from '../mock';

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const content = siteContent[language];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">BS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-green-800">{content.siteName}</span>
              <span className="text-xs text-green-600">Desa Sale</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {content.navigation.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-green-600 hover:bg-green-50">
                  {language === 'id' ? 'Lainnya' : 'More'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {content.navigation.slice(6).map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/edukasi" className="cursor-pointer">
                    {language === 'id' ? 'Edukasi' : 'Education'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/regulasi" className="cursor-pointer">
                    {language === 'id' ? 'Regulasi' : 'Regulations'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'id' ? 'ID' : 'EN'}
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-green-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-green-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {content.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/edukasi"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50"
            >
              {language === 'id' ? 'Edukasi' : 'Education'}
            </Link>
            <Link
              to="/regulasi"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50"
            >
              {language === 'id' ? 'Regulasi' : 'Regulations'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;