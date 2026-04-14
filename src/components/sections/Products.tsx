import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DisplayItem } from '../../App';

interface ProductsProps {
  productItems?: DisplayItem[];
}

export default function Products({ productItems = [] }: ProductsProps) {
  const [activeTab, setActiveTab] = useState('Fittings');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = ['Fittings', 'Valves', 'Tubing'];

  // Reset slide when tab changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const activeProducts = productItems.filter(item => item.type === activeTab);
  
  // Use default placeholders if no products are uploaded yet
  const displayProducts = activeProducts.length > 0 
    ? activeProducts 
    : [
        { id: `default-${activeTab}-1`, imageUrl: `https://picsum.photos/seed/pateron-${activeTab}-1/800/600?grayscale`, name: `${activeTab} Example 1` },
        { id: `default-${activeTab}-2`, imageUrl: `https://picsum.photos/seed/pateron-${activeTab}-2/800/600?grayscale`, name: `${activeTab} Example 2` },
        { id: `default-${activeTab}-3`, imageUrl: `https://picsum.photos/seed/pateron-${activeTab}-3/800/600?grayscale`, name: `${activeTab} Example 3` },
      ];

  const safeSlide = Math.min(currentSlide, Math.max(0, displayProducts.length - 1));
  const currentProduct = displayProducts[safeSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (displayProducts.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayProducts.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [displayProducts.length, currentSlide]);

  return (
    <section className="bg-white">
      {/* Top Banner */}
      <div className="relative h-[800px] mb-24 flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/pateron-cap1/1920/1080?grayscale" alt="Manufacturing Excellence" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gray-900/50 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white drop-shadow-md">
              Business Overview <br /> Precision Manufacturing & <br /> OEM Excellence
            </h2>
            <p className="text-gray-100 text-lg font-light leading-relaxed drop-shadow-md">
              PATERON delivers mission-critical alloy components engineered for the world's most demanding industrial environments.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Product Information Tabs */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Product Information</h2>
            <p className="text-xl text-gray-500 font-light">Every component engineered for the conditions where failure is not an option.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center gap-8 md:gap-16 border-b border-gray-200 mb-12"
          >
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg md:text-xl font-medium transition-colors relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="w-full">
              {displayProducts.length > 0 && currentProduct && (
                <div className="flex flex-col">
                  <div className="bg-gray-100 aspect-[4/3] relative rounded-lg overflow-hidden mb-4 group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={safeSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        {currentProduct.imageUrl ? (
                          <img src={currentProduct.imageUrl} alt={currentProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {displayProducts.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 text-gray-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 backdrop-blur-sm z-10"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-6 h-6 pr-0.5" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 text-gray-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 backdrop-blur-sm z-10"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-6 h-6 pl-0.5" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Dots Indicator */}
                  {displayProducts.length > 1 && (
                    <div className="flex justify-center gap-2 mb-4">
                      {displayProducts.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${safeSlide === idx ? 'bg-gray-900 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <h4 className="text-xl font-medium text-gray-900 text-center">
                    {currentProduct.name}
                  </h4>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Material</h3>
              <ul className="space-y-4 text-gray-600 font-light text-lg">
                <li>A625 (Inconel 625)</li>
                <li>Monel 400</li>
                <li>Alloy 600 / Alloy 825</li>
                <li>Super Duplex Stainless Steel</li>
                <li>316 / 316L Stainless Steel</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Manufacturing Capability */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Manufacturing Capability</h2>
            <p className="text-xl text-gray-500 font-light">Built for Precision. Scaled for Reliability.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Swiss-Type CNC Lathe", desc: "Precision machining for fittings and valves with tight tolerances" },
              { title: "CNC Machining Center", desc: "High-precision machining for complex geometries and connection parts" },
              { title: "Prototype to Mass Production", desc: "Flexible manufacturing system scalable from single units to full-run production" },
              { title: "Customer-Spec OEM Production", desc: "Manufactured to exact customer specifications and connection design requirements" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square bg-gray-100 mb-6 relative">
                   <img src={`https://picsum.photos/seed/pateron-machine${i}/400/400?grayscale`} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 min-h-[3.5rem]">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Material & Quality */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Material & Quality</h2>
            <p className="text-xl text-gray-500 font-light">From Raw Material to Final Delivery — Zero Compromise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-0">
            {/* Material Expertise */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pr-12 md:pr-24 text-right border-r border-gray-200"
            >
              <h3 className="text-xl font-light text-gray-500 mb-16">Material Expertise</h3>
              <div className="space-y-20">
                {[
                  { title: "Nickel-based Alloy625", desc: "High-temperature & highly corrosive environments" },
                  { title: "Nickel-Copper Alloy 400", desc: "Marine & chemical corrosion resistance" },
                  { title: "Alloy 600 / Alloy 825", desc: "High-temperature & chemical processing" },
                  { title: "Super Duplex Stainless Steel", desc: "Structural use in severe corrosive conditions" }
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h4>
                    <p className="text-gray-400 font-light text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quality Control */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pl-12 md:pl-24 relative"
            >
              <h3 className="text-xl font-light text-gray-500 mb-16">Quality Control</h3>
              <div className="space-y-20 relative">
                {/* Vertical Line for Timeline */}
                <div className="absolute left-[-3rem] md:left-[-6rem] top-2 bottom-2 w-px bg-gray-200 -translate-x-1/2"></div>
                
                {[
                  { step: "1", title: "Incoming Material Inspection", desc: "Material certification · Heat number traceability" },
                  { step: "2", title: "In-Process Inspection", desc: "Dimensional inspection · Surface condition check" },
                  { step: "3", title: "Pressure & Leak Testing", desc: "Functional verification · Equipment calibration" },
                  { step: "4", title: "Final Shipment Verification", desc: "MTR documentation · Third-party inspection" }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    {/* Circle Indicator */}
                    <div className="absolute left-[-3rem] md:left-[-6rem] top-1 w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-sm -translate-x-1/2 z-10">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h4>
                      <p className="text-gray-400 font-light text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
