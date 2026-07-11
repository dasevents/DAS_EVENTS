import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { navLinks } from '../../data/navbar';
import Container from '../ui/container';
import ThemeToggle from '../ui/theme-toggle';
import MobileNavbar from './mobile-navbar';
import logo from '../../assets/main_logos/DAS-EVENT-logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = () => setMobileOpen(false);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const isActive = (link) => {
    if (link.children) {
      return link.children.some((child) => location.pathname === child.to);
    }
    return location.pathname === link.to;
  };

  const handleDropdownEnter = useCallback((linkTo) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDropdownOpen(linkTo);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(null);
    }, 150);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-5">
        <Container>
          <nav
            className={`
              flex items-center justify-between
              h-14 md:h-16
              px-3 md:px-5
              rounded-full
              transition-all duration-300
              ${
                scrolled
                  ? 'bg-bg-main/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-border/50'
                  : 'bg-bg-main/60 backdrop-blur-md border border-border/30'
              }
            `}
          >
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="DAS EVENTS" className="h-8 md:h-9 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => link.children && handleDropdownEnter(link.to)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <Link
                    to={link.to}
                    className={`
                      flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive(link)
                          ? 'text-white bg-primary shadow-md shadow-primary/20'
                          : 'text-text-secondary hover:text-text-main hover:bg-bg-section'
                      }
                    `}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropdownOpen === link.to ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>

                  {link.children && dropdownOpen === link.to && (
                    <div
                      className="absolute top-full left-0 mt-1 w-56 py-2 bg-bg-main rounded-xl shadow-xl shadow-black/10 border border-border/50"
                      onMouseEnter={() => handleDropdownEnter(link.to)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setDropdownOpen(null)}
                          className={`
                            block px-4 py-2.5 text-sm font-medium transition-colors duration-200
                            ${
                              location.pathname === child.to
                                ? 'text-primary bg-primary/10'
                                : 'text-text-secondary hover:text-text-main hover:bg-bg-section'
                            }
                          `}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle size="sm" />
              <Link
                to="/contact"
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-white bg-primary shadow-md shadow-primary/20 hover:bg-primary-hover transition-all duration-200"
              >
                Get a Quote
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-full text-text-main hover:bg-bg-section transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </Container>
      </div>

      <MobileNavbar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
