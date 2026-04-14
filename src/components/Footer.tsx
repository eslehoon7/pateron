import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-48 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-gray-900">PATERON</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              PATERON Industrial Precision specializes in high-performance alloy components for the world's most demanding industrial environments.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-sm text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/capability" onClick={() => window.scrollTo(0, 0)} className="text-sm text-gray-500 hover:text-gray-900">Capability</Link></li>
              <li><Link to="/products" onClick={() => window.scrollTo(0, 0)} className="text-sm text-gray-500 hover:text-gray-900">Products</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="text-sm text-gray-500 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              <li><Link to="/admin" onClick={() => window.scrollTo(0, 0)} className="text-sm text-gray-500 hover:text-gray-900">Admin Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-xs text-gray-400">
            © 2026 PATERON Industrial Precision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
