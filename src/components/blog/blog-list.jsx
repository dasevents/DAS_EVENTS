import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/container';
import BlogCard from './blog-card';
import { blogPosts, blogCategories } from '../../data/blog';
import { stagger } from '../ui/animations';

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="py-16 md:py-20 lg:py-[var(--space-section)] bg-bg-main">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-bg-section text-text-secondary hover:bg-primary/10 hover:text-primary border border-border/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {filteredPosts.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={stagger()}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-text-secondary text-lg">
              No posts found in this category.
            </p>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
