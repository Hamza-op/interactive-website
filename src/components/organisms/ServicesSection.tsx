import { motion } from 'framer-motion';
import ImageGallery from '../molecules/ImageGallery';

const services = [
  {
    id: 'portrait',
    title: 'Portrait Photography',
    description:
      'Professional portrait sessions capturing your personality and style.',
    category: 'portrait',
  },
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description:
      'Documenting your special day with artistic and candid moments.',
    category: 'wedding',
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description:
      'High-quality product and brand photography for your business.',
    category: 'commercial',
  },
  {
    id: 'event',
    title: 'Event Coverage',
    description:
      'Comprehensive photo and video coverage for all types of events.',
    category: 'event',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="min-h-screen py-20 bg-gradient-to-b from-studio-900 to-studio-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Explore our range of professional photography and videography services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-white">
                {service.title}
              </h3>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ImageGallery category={service.category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
