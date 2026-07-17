import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Divider from '../components/ui/divider';
import BlogList from '../components/blog/blog-list';
import { useEffect } from 'react';

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Event Planning Tips & Industry Insights | DAS Events Blog';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read the latest event planning tips, corporate event ideas, industry trends, and expert insights to make every event a success.'
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection
        tag="Blog"
        title="Event Insights & Ideas"
        subtitle="Stay updated with the latest trends, tips, and inspiration for planning extraordinary events."
      />
      <Divider spacing="none" />
      <BlogList />
    </motion.div>
  );
}
