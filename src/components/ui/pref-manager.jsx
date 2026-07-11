import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Settings } from 'lucide-react';
import Button from './button';

const CookieIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
    <path d="M8.5 8.5v.01" />
    <path d="M16 15.5v.01" />
    <path d="M12 12v.01" />
    <path d="M11 17v.01" />
    <path d="M7 14v.01" />
  </svg>
);

const ConsentContext = createContext();

const defaultPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('das-consent-preferences');
    return saved ? JSON.parse(saved) : null;
  });
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (preferences === null) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [preferences]);

  const savePreferences = (prefs) => {
    setPreferences(prefs);
    localStorage.setItem('das-consent-preferences', JSON.stringify(prefs));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => savePreferences({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => savePreferences({ necessary: true, analytics: false, marketing: false });

  const openSettings = () => {
    setShowBanner(true);
    setShowSettings(true);
  };

  return (
    <ConsentContext.Provider value={{ preferences, showBanner, showSettings, setShowBanner, setShowSettings, acceptAll, rejectAll, savePreferences, openSettings }}>
      {children}
    </ConsentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCookie = () => useContext(ConsentContext);

function SettingsModal({ onClose }) {
  const { savePreferences } = useCookie();
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('das-consent-preferences');
    return saved ? JSON.parse(saved) : { ...defaultPreferences };
  });

  const toggle = (key) => {
    if (key === 'necessary') return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const categories = [
    {
      key: 'necessary',
      name: 'Necessary',
      description: 'Essential for the website to function. Cannot be disabled.',
      required: true,
    },
    {
      key: 'analytics',
      name: 'Analytics',
      description: 'Help us understand how visitors interact with our website.',
      required: false,
    },
    {
      key: 'marketing',
      name: 'Marketing',
      description: 'Used to deliver personalized advertisements.',
      required: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-bg-main rounded-2xl border border-border shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main">
                Cookie Settings
              </h3>
              <p className="text-xs text-text-secondary">Manage your preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-bg-section flex items-center justify-center text-text-secondary hover:text-text-main transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start justify-between gap-4 p-4 rounded-xl bg-bg-section border border-border/50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-text-main">{cat.name}</span>
                  {cat.required && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{cat.description}</p>
              </div>
              <button
                onClick={() => toggle(cat.key)}
                className={`shrink-0 relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  prefs[cat.key] ? 'bg-primary' : 'bg-border'
                } ${cat.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={cat.required}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    prefs[cat.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-5 border-t border-border bg-bg-section/50">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => savePreferences(prefs)}>
            Save Preferences
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ConsentBanner() {
  const { preferences, showBanner, showSettings, setShowSettings, acceptAll, rejectAll } = useCookie();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-bg-main rounded-2xl border border-border shadow-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="flex items-start gap-3 flex-1">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                  <Shield size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="[font-family:var(--font-title)] text-sm font-semibold text-text-main mb-1">
                    We value your privacy
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    We use tracking technologies to enhance your browsing experience and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of these technologies.{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-main border border-border rounded-lg hover:bg-bg-section transition-colors"
                >
                  <Settings size={14} />
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-main border border-border rounded-lg hover:bg-bg-section transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating settings button - shows after user has made a choice */}
      {preferences && !showBanner && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(true)}
          className="fixed bottom-6 left-6 z-[80] w-12 h-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary-hover transition-colors"
          aria-label="Privacy Settings"
        >
          <CookieIcon />
        </motion.button>
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </AnimatePresence>
  );
}
