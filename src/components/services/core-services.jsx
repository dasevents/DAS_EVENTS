import { motion } from 'framer-motion';
import { serviceDetails } from '../../data/service-details';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import ImageCard from '../ui/image-card';
import { stagger } from '../ui/animations';

export default function CoreServicesSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <SectionHeader
          tag="What We Do"
          title="Our Core Services"
          description="Comprehensive event solutions tailored to your unique vision and requirements."
        />
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceDetails.map((service) => (
            <ImageCard
              key={service.slug}
              title={service.title}
              image={service.heroImage}
              icon={service.icon}
              description={service.tagline}
              features={service.subServices.map((sub) => sub.title)}
              linkTo={`/services/${service.slug}`}
              linkLabel="Explore service"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
