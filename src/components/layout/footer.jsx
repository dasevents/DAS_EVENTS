import { Link } from 'react-router-dom';
import Container from '../ui/container';
import { footerLinks } from '../../data/footer';
import { contactInfo } from '../../data/contact';
import logo from '../../assets/main_logos/DAS-EVENT-logo.png';

const copyright = `© ${new Date().getFullYear()} DAS EVENTS. All rights reserved.`;

export default function Footer() {
  return (
    <footer className="bg-bg-main border-t border-border">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* Brand + Contact */}
            <div className="lg:col-span-5">
              <Link to="/" className="inline-flex items-center mb-4">
                <img src={logo} alt="DAS EVENTS" className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                Premium event management company crafting unforgettable experiences for global brands and private clients.
              </p>
              <div className="space-y-2.5">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.link || '#'}
                    className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    <c.icon size={14} className="text-primary shrink-0" />
                    {c.value}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-4 lg:col-start-7">
              <h4 className="text-xs font-semibold text-text-main mb-4 uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.QuickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-secondary">{copyright}</p>
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="text-xs text-text-secondary hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-text-secondary hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-text-secondary hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
