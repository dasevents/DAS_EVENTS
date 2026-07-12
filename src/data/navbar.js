import { Home, Briefcase, FolderOpen, Users, Mail, FileText } from 'lucide-react';

export const navLinks = [
  { label: 'Home', to: '/', icon: Home },
  {
    label: 'Services',
    to: '/services',
    icon: Briefcase,
    children: [
      { label: 'Corporate Events', to: '/corporate-events' },
      { label: 'Wedding & Social Events', to: '/social-events' },
      { label: 'Entertainment Events', to: '/services/entertainment-events' },
      { label: 'Hotel Bookings', to: '/services/hotel-booking' },
      { label: 'Event Management', to: '/services/event-management' },
    ],
  },
  { label: 'Portfolio', to: '/portfolio', icon: FolderOpen },
  { label: 'About Us', to: '/about', icon: Users },
  { label: 'Blog', to: '/blog', icon: FileText },
  { label: 'Contact', to: '/contact', icon: Mail },
];
