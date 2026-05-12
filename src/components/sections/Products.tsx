import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { DisplayItem } from '../../App';

interface NavSection {
  title: string;
  items: string[];
}

interface ProductsProps {
  productItems?: DisplayItem[];
  bannerUrl?: string;
  settings?: {
    tubeFittingsVisible?: boolean;
  };
}

export default function Products({ productItems = [], bannerUrl, settings }: ProductsProps) {
  const [selectedSub, setSelectedSub] = useState('Tube Fittings');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Navigation structure
  const rawNavigation: NavSection[] = [
    {
      title: 'Fittings',
      items: ['Tube Fittings', 'Instrument Pipe Fittings', 'Dielectric Fittings']
    },
    {
      title: 'Valves',
      items: [
        'Ball & Plug Valves',
        'Needle Valves',
        'Check Valves',
        'Relief Valves',
        'Gauge Valves',
        'Bleed & Purge Valves'
      ]
    },
    {
      title: 'Quick Connects',
      items: []
    }
  ];

  // Apply visibility settings
  const navigation = rawNavigation.map(section => {
    if (section.title === 'Fittings') {
      return {
        ...section,
        items: settings?.tubeFittingsVisible === false 
          ? section.items.filter(item => item !== 'Tube Fittings')
          : section.items
      };
    }
    return section;
  });

  // Handle case where selectedSub becomes hidden
  useEffect(() => {
    if (settings?.tubeFittingsVisible === false && selectedSub === 'Tube Fittings') {
      setSelectedSub('Instrument Pipe Fittings');
    }
  }, [settings?.tubeFittingsVisible, selectedSub]);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSub]);

  const products = [
    {
      name: 'OHBV Hex Ball Valves',
      image: 'https://i.postimg.cc/mD8D99Pq/OHBV-Hex-Ball-Valves.png', 
    },
    {
      name: 'OBV3',
      image: 'https://i.postimg.cc/tCTwT0F8/OBV3.png',
    },
    {
      name: 'OBV6',
      image: 'https://i.postimg.cc/T3PzT9wK/OBV6.png',
    },
    {
      name: 'OFBV6',
      image: 'https://i.postimg.cc/fyPjBMM0/OFBV6.png',
    }
  ];

  // Logic: 1. Sort by latest registration, 2. Filter by category, 3. Paginate (9 items)
  // CRITICAL: This sorting logic (latest first) must be maintained.
  const processedProducts = [...productItems]
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() ? a.createdAt.toDate().getTime() : (a.createdAt instanceof Date ? a.createdAt.getTime() : 0);
      const dateB = b.createdAt?.toDate?.() ? b.createdAt.toDate().getTime() : (b.createdAt instanceof Date ? b.createdAt.getTime() : 0);
      return dateB - dateA;
    })
    .filter(item => {
      if (selectedSub === 'Tube Fittings') {
        return item.type === 'Tube Fittings' || item.type === 'OTG-LOK Tube Fittings';
      }
      return item.type === selectedSub;
    });

  const totalPages = Math.max(1, Math.ceil(processedProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  // Use paginated items if available, otherwise fallback to placeholders for design preview (limited to 9)
  const displayProducts = paginatedItems.length > 0 ? paginatedItems : (currentPage === 1 ? products.slice(0, 9).map(p => ({
    id: p.name,
    name: p.name,
    imageUrl: p.image,
    type: selectedSub,
    description: '공정에 따른 특수 합금 설계 및 정밀 가공을 통해 제작된 고성능 제품입니다.'
  })) : []);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Top Banner */}
      <div className="relative h-[800px] flex items-center mb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerUrl} 
            alt="Manufacturing Excellence" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply"></div>
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

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row gap-16 pb-32">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-12">
            {navigation.map((section) => (
              <div key={section.title}>
                {section.items.length > 0 ? (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">{section.title}</h3>
                    <ul className="space-y-4 border-t border-gray-100 pt-6">
                      {section.items.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => setSelectedSub(item)}
                            className={`text-sm transition-all duration-300 block text-left w-full leading-snug ${
                              selectedSub === item 
                                ? 'text-blue-700 font-bold' 
                                : 'text-gray-500 hover:text-blue-600 hover:pl-2'
                            }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedSub(section.title)}
                    className={`text-lg font-bold transition-all duration-300 block text-left w-full tracking-tight mb-6 mt-12 ${
                      selectedSub === section.title ? 'text-blue-700' : 'text-gray-900'
                    }`}
                  >
                    {section.title}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow">
          {/* Section Header */}
          <div className="mb-14">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{selectedSub}</h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-square bg-white rounded-sm overflow-hidden flex items-center justify-center p-4 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100 group-hover:border-gray-200">
                  <img 
                    src={product.imageUrl || product.image} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Product Name */}
                <h4 className="mt-6 text-lg font-bold text-gray-900 leading-tight transition-colors duration-300 group-hover:text-blue-700">
                  {product.name}
                </h4>

                {/* Detailed Description */}
                {product.description && (
                  <p className="mt-3 text-sm text-gray-500 font-light leading-relaxed whitespace-pre-line line-clamp-4">
                    {product.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom placeholders for consistent look if less than 3 products */}
          {displayProducts.length < 3 && (
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 opacity-10 pointer-events-none">
               {[...Array(3 - displayProducts.length)].map((_, i) => (
                 <div key={i} className="aspect-square bg-gray-200"></div>
               ))}
            </div>
          )}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border transition-all ${
                  currentPage === 1 
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border transition-all ${
                  currentPage === totalPages 
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
