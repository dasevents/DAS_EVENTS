import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { hero, videoSlides } from '../../data/home';
import { heroVideos } from '../../assets';
import Container from '../ui/container';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef([]);
  const timerRef = useRef(null);

  const slides = videoSlides;

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goTo]);

  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [current, goTo]);

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroVideos.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el; }}
            src={src}
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            onLoadedData={() => { if (i === 0) setLoaded(true); }}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {!loaded && (
        <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      <Container className="relative z-10 pt-20 pb-24 md:pt-24 md:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-medium mb-6">
              {hero.tagline}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="[font-family:var(--font-title)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
                {slides[current].headline}
              </h1>
              <p className="mt-5 md:mt-6 text-white/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto px-2 sm:px-0">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base sm:px-8 sm:py-3.5 sm:text-lg rounded-xl bg-white text-[#111111] font-medium shadow-lg hover:bg-white/90 transition-all active:scale-[0.97] cursor-pointer">
                {hero.cta.primary}
                <ArrowRight size={18} className="sm:hidden" />
                <ArrowRight size={20} className="hidden sm:block" />
              </span>
            </Link>
            <Link to="/services">
              <span className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base sm:px-8 sm:py-3.5 sm:text-lg rounded-xl border-2 border-white/40 text-white font-medium hover:bg-white/10 transition-all active:scale-[0.97] cursor-pointer">
                {hero.cta.secondary}
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>

      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
