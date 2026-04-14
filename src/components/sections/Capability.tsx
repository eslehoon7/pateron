import { motion } from 'motion/react';

export default function Capability() {
  return (
    <section className="bg-white">
      {/* Top Banner */}
      <div className="relative h-[800px] mb-24 flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/pateron-prod1/1920/1080?grayscale" alt="Extreme Environments" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
              Our Products-high <br /> Performance in Extreme <br /> Environments
            </h2>
            <p className="text-gray-100 text-lg font-light leading-relaxed drop-shadow-md">
              Engineered to withstand the most demanding pressures and temperatures. Our industrial components are the backbone of high-stakes alloy performance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Special Alloy Fluid System OEM Products */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 text-center md:text-left"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Special Alloy Fluid System OEM Products</h2>
            <p className="text-xl text-gray-500 font-light">Special alloy fluid system components for reliable control in demanding industrial environments.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Fitting",
                desc: "Tube Fittings, Thread Fittings, Pipe Fittings, High pressure Fittings"
              },
              {
                title: "Valve",
                desc: "Ball Valve, Needle Valve, Metering Valves, Check Valves, Relief Valves"
              },
              {
                title: "Tube",
                desc: "Seamless Tubes (Straight / Coil), Welded Tubes"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square bg-gray-100 mb-8 relative">
                  <img src={`https://picsum.photos/seed/pateron-prod-cat${i}/400/400?grayscale`} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integrated OEM Quality Management System */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Integrated OEM Quality Management System</h2>
            <p className="text-xl text-gray-500 font-light max-w-3xl">PATERON operates a certified production infrastructure and manages quality through a fully integrated manufacturing and inspection system.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Item 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative order-1"
            >
              <img src="https://picsum.photos/seed/pateron-qms1/800/800?grayscale" alt="Production Infrastructure" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center order-2 max-w-sm"
            >
              <p className="text-sm text-gray-400 mb-2">Infrastructure</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Production Infrastructure</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Certified manufacturing environment and stable production facilities.</p>
            </motion.div>

            {/* Item 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center order-4 md:order-3 max-w-sm md:ml-auto"
            >
              <p className="text-sm text-gray-400 mb-2">Control</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Process Control</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Special alloy machining standards and strict process management.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative order-3 md:order-4"
            >
              <img src="https://picsum.photos/seed/pateron-qms2/800/800?grayscale" alt="Process Control" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>

            {/* Item 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative order-5"
            >
              <img src="https://picsum.photos/seed/pateron-qms3/800/800?grayscale" alt="Inspection System" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center order-6 max-w-sm"
            >
              <p className="text-sm text-gray-400 mb-2">Inspection</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Inspection System</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Dimensional, pressure, leak, and functional testing.</p>
            </motion.div>

            {/* Item 4 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center order-8 md:order-7 max-w-sm md:ml-auto"
            >
              <p className="text-sm text-gray-400 mb-2">Verification</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Final Verification</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Final specification and quality confirmation before shipment.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="aspect-square rounded-2xl bg-gray-100 overflow-hidden relative order-7 md:order-8"
            >
              <img src="https://picsum.photos/seed/pateron-qms4/800/800?grayscale" alt="Final Verification" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>

        {/* Integrated OEM Manufacturing Process */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Integrated OEM Manufacturing Process</h2>
            <p className="text-xl text-gray-500 font-light">From requirement definition to final packaging.</p>
          </motion.div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
            {[
              { step: "01", title: "Application Requirement Definition", desc: "Define OEM specifications based on operating conditions such as pressure, temperature, fluid, and system requirements." },
              { step: "02", title: "Material & Structure Selection", desc: "Select suitable materials and structural configurations, including Ni-based alloys such as the 600 and 800 series." },
              { step: "03", title: "Design Integration", desc: "Reflect machining tolerance, assembly method, and manufacturability into the final production design." },
              { step: "04", title: "Special Alloy Manufacturing", desc: "Apply optimized machining conditions for special alloys to ensure precision production." },
              { step: "05", title: "Condition-Based Inspection", desc: "Perform dimensional, visual, pressure, and leak testing based on actual operating requirements." },
              { step: "06", title: "OEM Packaging & Supply", desc: "Provide customized packaging and stable supply according to customer brand and project requirements." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex items-start gap-8 pl-12"
              >
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-sm z-10"></div>
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-xl font-bold text-gray-900">Step. {item.step}</span>
                    <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
