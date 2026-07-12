import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { fadeUp } from '../ui/animations';

export default function BlogCard({ post }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div variants={fadeUp} className="h-full">
      <Link
        to={`/blog/${post.id}`}
        className="group flex flex-col h-full rounded-2xl bg-bg-section border border-border/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
      >
        <div className="relative h-52 overflow-hidden bg-bg-section">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="[font-family:var(--font-title)] text-4xl font-bold text-primary/20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
