import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { navLinks } from '../../data/navbar';
import Button from '../ui/button';

export default function MobileNavbar({ open, onClose }) {
  const location = useLocation();
  const [expandedLink, setExpandedLink] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (link) => {
    if (link.children) {
      return link.children.some((child) => location.pathname === child.to);
    }
    return location.pathname === link.to;
  };

  const handleLinkClick = (link) => {
    if (link.children) {
      setExpandedLink(expandedLink === link.to ? null : link.to);
    } else {
      onClose();
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-bg-main border-l border-border
          z-50 lg:hidden
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="text-lg font-bold [font-family:var(--font-title)] text-primary">
            DAS EVENTS
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:bg-bg-section transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link);
            const isExpanded = expandedLink === link.to;
            const hasChildren = link.children;

            return (
              <div key={link.to}>
                <div
                  onClick={() => handleLinkClick(link)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                    transition-colors duration-200 cursor-pointer
                    ${
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-text-secondary hover:text-text-main hover:bg-bg-section'
                    }
                  `}
                >
                  <Icon size={20} className={active ? 'text-primary' : 'text-text-secondary'} />
                  <span className="flex-1">{link.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-1 mb-2 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={onClose}
                        className={`
                          flex items-center px-4 py-2.5 rounded-lg text-sm font-medium
                          transition-colors duration-200
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
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border">
          <Button size="sm" fullWidth onClick={onClose}>Get a Quote</Button>
        </div>
      </div>
    </>
  );
}
