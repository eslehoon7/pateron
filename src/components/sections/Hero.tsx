import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DisplayItem } from '../../App';

interface HeroProps {
  mainItems?: DisplayItem[];
}

export default function Hero({ mainItems = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get valid image URLs or use a default fallback if none exist
  const validImages = mainItems.filter(item => item.imageUrl).map(item => item.imageUrl as string);
  const images = validImages.length > 0 ? validImages : ['https://picsum.photos/seed/pateron-hero-full/1920/1080?grayscale'];

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Full-screen Background Image Carousel */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt="Precision Manufacturing" 
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        {/* Overlays for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-6 drop-shadow-md"
          >
            Precision Manufacturing for <br className="hidden md:block" /> Industrial Applications
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl font-medium leading-relaxed drop-shadow-md"
          >
            Reliable OEM machining solutions with consistent quality and strict tolerance control.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to="/contact"
              className="inline-block bg-white text-gray-900 px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-lg"
            >
              Quotation Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
