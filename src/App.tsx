/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
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
  id: string;
  imageUrl: string | null;
  type: string;
  name: string;
}

export interface PageBanners {
  about?: string;
  capability?: string;
  products?: string;
  contact?: string;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsAuthReady(true);
  }, []);

  const handleSetIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      localStorage.setItem('adminAuth', 'true');
    } else {
      localStorage.removeItem('adminAuth');
    }
  };

  const [productItems, setProductItems] = useState<DisplayItem[]>([]);
  const [mainItems, setMainItems] = useState<DisplayItem[]>([]);
  const [pageBanners, setPageBanners] = useState<PageBanners>({});

  useEffect(() => {
    const unsubscribeMain = onSnapshot(query(collection(db, 'mainItems'), orderBy('createdAt', 'asc')), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setMainItems(items);
    }, (error) => {
      console.error("Error fetching main items:", error);
    });

    const unsubscribeProducts = onSnapshot(query(collection(db, 'productItems'), orderBy('createdAt', 'asc')), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setProductItems(items);
    }, (error) => {
      console.error("Error fetching product items:", error);
    });

    const unsubscribeBanners = onSnapshot(collection(db, 'pageBanners'), (snapshot) => {
      const banners: PageBanners = {};
      snapshot.docs.forEach(doc => {
        banners[doc.id as keyof PageBanners] = doc.data().imageUrl;
      });
      setPageBanners(banners);
    }, (error) => {
      console.error("Error fetching page banners:", error);
    });

    return () => {
      unsubscribeMain();
      unsubscribeProducts();
      unsubscribeBanners();
    };
  }, []);

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Hero mainItems={mainItems} />} />
          <Route path="/about" element={<About bannerUrl={pageBanners.about} />} />
          <Route path="/capability" element={<Capability bannerUrl={pageBanners.capability} />} />
          <Route path="/products" element={<Products productItems={productItems} bannerUrl={pageBanners.products} />} />
          <Route path="/contact" element={<Contact bannerUrl={pageBanners.contact} />} />
          <Route path="/login" element={<AdminLogin setIsAuthenticated={handleSetIsAuthenticated} />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin productItems={productItems} setProductItems={setProductItems} mainItems={mainItems} setMainItems={setMainItems} pageBanners={pageBanners} setIsAuthenticated={handleSetIsAuthenticated} /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
