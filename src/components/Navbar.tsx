import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '/about' },
    { name: 'CAPABILITY', href: '/capability' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const isSolid = isScrolled || isMobileMenuOpen;

  const navBg = isSolid 
    ? 'bg-white/[0.65] backdrop-blur-md border-b border-gray-200 py-4 shadow-sm' 
    : 'bg-transparent py-6';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className={`text-2xl font-bold tracking-widest uppercase transition-colors ${isSolid ? 'text-gray-900' : 'text-white'}`}>
          PATERON
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-medium transition-colors ${
                isSolid
                  ? location.pathname === link.href ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  : location.pathname === link.href ? 'text-white' : 'text-gray-200 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden transition-colors ${isSolid ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 px-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium ${
                location.pathname === link.href ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
