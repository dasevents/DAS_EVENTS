import {
  Building2,
  Heart,
  Hotel,
  UtensilsCrossed,
  Music,
  Camera,
  Mic2,
  Users,
  Crown,
  Gift,
  Award,
  CalendarCheck,
  Palette,
  Truck,
  Shield,
  Globe,
  PartyPopper,
} from 'lucide-react';

import {
  heroConference,
  heroWedding,
  heroConcert,
  heroHotel,
  heroPlanning,
} from '../assets';

export const servicesHero = {
  tag: 'Explore Our Services',
  title: 'Curated Event Experiences',
  subtitle: 'Crafting unforgettable moments through seamless planning, creative excellence, and meticulous execution.',
};

export const serviceTabs = [
  {
    id: 'corporate',
    title: 'Corporate Events',
    icon: Building2,
    image: heroConference,
    description: 'Creating exceptional corporate experiences, from conferences and product launches to awards nights and offsites, designed to inspire, engage, and drive impact.',
  },
  {
    id: 'wedding',
    title: 'Wedding & Social Events',
    icon: Heart,
    image: heroWedding,
    description: "Where love, laughter, and life's biggest celebrations come together, we are here to make every moment unforgettable.",
  },
  {
    id: 'entertainment',
    title: 'Entertainment Events',
    icon: Music,
    image: heroConcert,
    description: 'Bringing your entertainment vision to life with professional entertainment event services that captivate your guests and create lasting memories.',
  },
  {
    id: 'hotel',
    title: 'Hotel Booking Service for Our Guests',
    icon: Hotel,
    image: heroHotel,
    description: "Whether it's a wedding, corporate event, or special celebration, we provide reliable hotel booking and comfortable accommodation for a seamless guest experience for you.",
  },
  {
    id: 'management',
    title: 'Event Management Services',
    icon: Palette,
    image: heroPlanning,
    description: 'From photography and décor to catering and entertainment, we provide end-to-end event services tailored to your needs.',
  },
];

export const coreServices = [
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate Events',
    description: 'Professional event management for conferences, seminars, product launches, team-building activities, and corporate celebrations that elevate your brand identity.',
    highlights: ['Conferences & Seminars', 'Product Launches', 'Team-Building', 'Annual Days'],
    to: '/corporate-events',
  },
  {
    id: 'social',
    icon: Heart,
    title: 'Social Events',
    description: 'Personalized celebration planning for weddings, birthdays, engagements, baby showers, and private gatherings that create lasting memories.',
    highlights: ['Weddings', 'Birthday & Sweet 16s', 'Engagements', 'Baby Showers'],
    to: '/social-events',
  },
  {
    id: 'hotel-booking',
    icon: Hotel,
    title: 'Hotel Booking',
    description: 'We have established relationships with hotels worldwide. We find the perfect accommodation, negotiate favorable rates, and ensure your guests have a comfortable stay.',
    highlights: ['Worldwide network', 'Best rates', 'Group bookings', 'Guest management'],
    to: '/services',
  },
];

export const eventManagementServices = [
  { icon: Palette, label: 'Décor & Props', description: 'Stunning visual designs and thematic setups' },
  { icon: Mic2, label: 'Audio & Video', description: 'Professional sound and visual production' },
  { icon: UtensilsCrossed, label: 'Food & Beverage', description: 'Curated menus and bar services' },
  { icon: Hotel, label: 'Hotel Negotiation', description: 'Best rates and terms for accommodations' },
  { icon: Camera, label: 'Photography & Video', description: 'Professional documentation of your event' },
  { icon: Gift, label: 'Corporate Gifts', description: 'Customized promotional products' },
  { icon: Palette, label: 'Collateral Design', description: 'Marketing materials and print collateral' },
  { icon: Shield, label: 'Security & VIP', description: 'Professional security and VIP handling' },
  { icon: Crown, label: 'Signage', description: 'Branded signage and wayfinding' },
  { icon: Music, label: 'Staging & Production', description: 'Complete stage setup and production' },
  { icon: PartyPopper, label: 'Themed Events', description: 'Custom themes and immersive experiences' },
  { icon: Truck, label: 'Transportation', description: 'Guest transport and logistics' },
  { icon: Globe, label: 'Travel Arrangements', description: 'Complete travel coordination' },
  { icon: Building2, label: 'Equipment Rentals', description: 'Audio, lighting, and event equipment' },
  { icon: Users, label: 'Off-site Management', description: 'Remote event coordination' },
  { icon: CalendarCheck, label: 'On-site Management', description: 'Day-of event coordination' },
  { icon: Award, label: 'Event Branding', description: 'Custom branding and signage' },
];

export const cateringCuisines = [
  {
    id: 'north-indian',
    title: 'North Indian',
    description: 'Aromatic spices and rich culinary traditions from  and Lucknow — succulent tandoori kebabs, creamy butter chicken, and flavorful biryanis.',
    highlights: ['Tandoori Kebabs', 'Butter Chicken', 'Biryani', 'Naan Bread'],
  },
  {
    id: 'south-indian',
    title: 'South Indian',
    description: 'Authentic flavors from Kerala, Tamil Nadu, and Karnataka — mouthwatering dosas, idlis, sambar, and coconut-based curries.',
    highlights: ['Dosa & Idli', 'Sambar', 'Coconut Curries', 'Banana Leaf Plating'],
  },
  {
    id: 'chinese',
    title: 'Chinese',
    description: 'Bold and savory flavors with sizzling stir-fries, delectable dumplings, flavorful noodles, and aromatic rice dishes.',
    highlights: ['Stir-fries', 'Dumplings', 'Noodles', 'Live Wok Stations'],
  },
  {
    id: 'italian',
    title: 'Italian',
    description: 'The simplicity and elegance of Italian cuisine — classic pasta dishes, wood-fired pizzas, indulgent risottos, and delectable antipasti.',
    highlights: ['Pasta', 'Wood-fired Pizza', 'Risotto', 'Antipasti Platters'],
  },
];

export const whyChooseUs = [
  'End-to-end event management from concept to execution',
  'Established relationships with premium venues worldwide',
  'Creative and innovative event designs tailored to your vision',
  'Exceptional attention to detail within your budget',
  'Experienced team with years of industry expertise',
  'Trusted partner from first conversation to final celebration',
];
