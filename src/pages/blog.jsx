import { motion } from 'framer-motion';
import HeroSection from '../components/ui/hero-section';
import Divider from '../components/ui/divider';
import BlogList from '../components/blog/blog-list';

export default function BlogPage() {
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
