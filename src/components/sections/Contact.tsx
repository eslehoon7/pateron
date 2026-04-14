import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section className="bg-white">
      {/* Top Banner */}
      <div className="relative h-[800px] mb-24 flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/pateron-contact/1920/1080?grayscale" alt="Contact Us" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
              Get in Touch with our <br /> Technical Experts
            </h2>
            <p className="text-gray-100 text-lg font-light leading-relaxed drop-shadow-md">
              Connect with Pateron for complex alloy specifications, global logistics, and advanced manufacturing consultation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Request a Quote Tell us your requirements. <br className="hidden md:block" /> we'll engineer the right solution.</h2>
        </motion.div>

        <form className="space-y-12">
          {/* Company Information */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-light mb-6 text-gray-900">COMPANY INFORMATION</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Company Name</label>
                <input type="text" placeholder="e.g. Acme Corporation" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Country</label>
                <input type="text" placeholder="e.g. United States" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-600">Industry</label>
                <input type="text" placeholder="e.g. Aerospace & Defense" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-light mb-6 text-gray-900">CONTACT INFORMATION</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-600">Full Name</label>
                <input type="text" placeholder="e.g. John Doe" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">E-mail</label>
                <input type="email" placeholder="e.g. john@example.com" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Phone(Optional)</label>
                <input type="tel" placeholder="e.g. +1 (555) 123-4567" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
            </div>
          </motion.div>

          {/* Product Requirements */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-light mb-6 text-gray-900">PRODUCT REQUIREMENTS</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Product Category</label>
                <input type="text" placeholder="e.g. Fittings, Valves, Tubing" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Material</label>
                <input type="text" placeholder="e.g. Inconel 625, Monel 400" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Quantity</label>
                <input type="text" placeholder="e.g. 500 units" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Operating Conditions(Optional)</label>
                <input type="text" placeholder="e.g. High pressure, corrosive environment" className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-600">Message/Requirements</label>
                <textarea rows={5} placeholder="Please describe your specific requirements, tolerances, and any other relevant details..." className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 placeholder-gray-400 focus:ring-2 focus:ring-gray-900 outline-none transition-shadow resize-none"></textarea>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-600">Attach File(Optional-drawing, spec sheet)</label>
                <div className="w-full bg-gray-100 border-[0.5px] border-gray-300 rounded-[10px] p-4 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                  <span>Click to upload or drag and drop</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="pt-8 flex justify-center"
          >
            <button type="button" className="w-full md:w-auto bg-gray-900 text-white px-12 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Submit Request
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
