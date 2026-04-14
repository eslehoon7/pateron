import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="bg-white">
      {/* Top Banner */}
      <div className="relative h-[800px] mb-24 flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/pateron-about1/1920/1080?grayscale" alt="Industrial environment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
              Where Metal Meets Its Limits — <br /> We Go Further
            </h2>
            <p className="text-gray-100 text-lg font-light leading-relaxed drop-shadow-md">
              From deep-sea pipelines to aerospace components, PATERON's Inconel and Monel parts perform where standard materials fail — delivering zero-compromise reliability in the world's most demanding environments.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">PATERON</h2>
          <p className="text-xl text-gray-500 font-light">When Standard Materials Fail, PATERON Delivers.</p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-6 mb-32">
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-gray-100 aspect-[4/3] relative"
            >
              <img src="https://picsum.photos/seed/pateron-about2/400/300?grayscale" alt="Machining process" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-gray-100 aspect-[4/3] relative"
            >
              <img src="https://picsum.photos/seed/pateron-about3/400/300?grayscale" alt="Quality inspection" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-gray-100 aspect-[4/3] relative"
            >
              <img src="https://picsum.photos/seed/pateron-about4/400/300?grayscale" alt="Finished components" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-8 bg-gray-100 relative min-h-[400px]"
          >
             <img src="https://picsum.photos/seed/pateron-about5/800/1000?grayscale" alt="PATERON Facility" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why PATERON</h2>
          <p className="text-xl text-gray-500 font-light max-w-3xl">
            We don't just make parts. We solve the problems that matter most — in the environments where failure is simply not an option.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Zero Tolerance",
              desc: "Every component is machined to exact tolerances — because in critical environments, close enough is never enough."
            },
            {
              title: "Built-In Quality",
              desc: "From raw material to final shipment, our integrated QC system ensures zero defects reach our customers."
            },
            {
              title: "True Partnership",
              desc: "We don't just manufacture parts — we take ownership of our customers' most demanding material challenges."
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
              <div className="w-48 h-48 bg-gray-100 mb-8 relative">
                 <img src={`https://picsum.photos/seed/pateron-why${i}/200/200?grayscale`} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
