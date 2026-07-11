import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '../components/ui/container';
import Button from '../components/ui/button';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-main relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <span className="glow-404 [font-family:var(--font-title)] text-[4.5rem] sm:text-[10rem] md:text-[14rem] font-bold leading-none select-none">
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <h1 className="[font-family:var(--font-title)] text-3xl md:text-4xl font-semibold text-text-main mb-3">
              Page Not Found
            </h1>
            <p className="text-text-secondary text-lg max-w-sm mx-auto mb-10 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <Link to="/" className="w-full sm:w-auto">
              <Button size="lg" icon={Home} className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              icon={ArrowLeft}
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </Container>

      <style>{`
        .glow-404 {
          color: transparent;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          background-clip: text;
          -webkit-background-clip: text;
          filter: drop-shadow(0 0 20px rgba(19, 133, 139, 0.3))
                  drop-shadow(0 0 60px rgba(19, 133, 139, 0.15));
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(19, 133, 139, 0.3))
                    drop-shadow(0 0 60px rgba(19, 133, 139, 0.15));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(19, 133, 139, 0.5))
                    drop-shadow(0 0 80px rgba(19, 133, 139, 0.25));
          }
        }
      `}</style>
    </section>
  );
}
