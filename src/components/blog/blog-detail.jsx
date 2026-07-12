import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import Container from '../ui/container';
import { blogPosts } from '../../data/blog';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!post) {
    return (
      <section className="py-20 md:py-32 bg-bg-main">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-bold text-text-main mb-4">
              Post Not Found
            </h1>
            <p className="text-text-secondary mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="py-16 md:py-20 bg-bg-section">
        <Container>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/10 transition-all mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              {post.category}
            </span>

            <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-8">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-bg-main border border-border/30 text-xs text-text-secondary"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-bg-main">
        <Container>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {post.image && (
              <div className="rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {post.content.map((block, i) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={i}
                      className="[font-family:var(--font-title)] text-2xl font-semibold text-text-main mt-10 mb-4"
                    >
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-text-secondary leading-relaxed mb-4"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </motion.article>
        </Container>
      </section>
    </motion.div>
  );
}
