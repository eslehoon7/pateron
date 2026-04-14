/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Products from './components/sections/Products';
import Capability from './components/sections/Capability';
import Contact from './components/sections/Contact';
import Admin from './components/sections/Admin';
import AdminLogin from './components/sections/AdminLogin';

export interface DisplayItem {
  id: number;
  imageUrl: string | null;
  type: string;
  name: string;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  const handleSetIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      sessionStorage.removeItem('adminAuth');
    }
  };

  const [productItems, setProductItems] = useState<DisplayItem[]>([]);
  const [mainItems, setMainItems] = useState<DisplayItem[]>([
    { id: 1, imageUrl: null, type: '제품종류명', name: '제품명' },
    { id: 2, imageUrl: null, type: '제품종류명', name: '제품명' },
    { id: 3, imageUrl: null, type: '제품종류명', name: '제품명' },
    { id: 4, imageUrl: null, type: '제품종류명', name: '제품명' },
  ]);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Hero mainItems={mainItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/capability" element={<Capability />} />
          <Route path="/products" element={<Products productItems={productItems} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AdminLogin setIsAuthenticated={handleSetIsAuthenticated} />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin productItems={productItems} setProductItems={setProductItems} mainItems={mainItems} setMainItems={setMainItems} setIsAuthenticated={handleSetIsAuthenticated} /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
