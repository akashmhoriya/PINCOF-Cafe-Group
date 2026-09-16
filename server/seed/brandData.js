const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Brand = require('../models/Brand');

dotenv.config();

const sampleBrands = [
  {
    name: 'Aurelia Slow Bar & Roastery',
    slug: 'aurelia-slow-bar',
    tagline: 'Coffee, Crafted With Character.',
    description:
      'Our flagship specialty coffee house celebrated for direct-trade micro-lot sourcing, electric fluid-bed roasting, and precision slow bar rituals.',
    concept:
      'Aurelia was conceived as an architectural antidote to modern sensory fatigue. Designed with natural walnut, cast concrete, and acoustic serenity, every brew station is tuned for quiet contemplative extraction and deep conversations.',
    category: 'Specialty Coffee',
    logo: 'AURELIA',
    heroImage:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    ],
    websiteUrl: 'https://aureliacoffee.example.com',
    locations: [
      { name: 'San Francisco Roastery', city: 'San Francisco', country: 'United States', address: '418 Artisan Lane' },
      { name: 'Kyoto Gion Slow Bar', city: 'Kyoto', country: 'Japan', address: '12 Higashiyama Street' },
      { name: 'Zurich Old Town', city: 'Zurich', country: 'Switzerland', address: '24 Neumarkt Lane' },
    ],
    franchiseAvailable: true,
    featured: true,
    status: 'Active',
  },
  {
    name: 'Kanso Espresso Lab',
    slug: 'kanso-espresso',
    tagline: 'Simplicity In Every Extraction.',
    description:
      'Minimalist, Scandinavian-Japanese inspired espresso bars dedicated to speed, geometric clarity, and extreme cup clarity.',
    concept:
      'Named after the Zen aesthetic of simplicity and elimination of clutter, Kanso features brushed stainless steel counters, flush Modbar extraction heads, customized water mineralization profiles, and a frictionless cashless guest experience.',
    category: 'Modern Café',
    logo: 'KANSO',
    heroImage:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?auto=format&fit=crop&w=1200&q=85',
    ],
    websiteUrl: 'https://kanso.example.com',
    locations: [
      { name: 'Tokyo Omotesando', city: 'Tokyo', country: 'Japan', address: '3-14 Jingumae' },
      { name: 'Copenhagen Meatpacking', city: 'Copenhagen', country: 'Denmark', address: '8 Flaesketorvet' },
      { name: 'London Shoreditch', city: 'London', country: 'United Kingdom', address: '44 Redchurch Street' },
    ],
    franchiseAvailable: true,
    featured: true,
    status: 'Active',
  },
  {
    name: 'Verdant Botanical Café',
    slug: 'verdant-botanical',
    tagline: 'Where Rare Flora Meets Artisan Brews.',
    description:
      'A biophilic coffee and tea sanctuary designed as a living urban conservatory with organic cold tonics and wild infusions.',
    concept:
      'Verdant bridges specialty third-wave coffee with botanical alchemy. Floor-to-ceiling glasshouses, integrated indoor water gardens, and living moss walls create an oxygen-rich atmosphere where guests enjoy stone-ground ceremonial matcha and lavender-infused cold extractions.',
    category: 'Contemporary Coffee House',
    logo: 'VERDANT',
    heroImage:
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1445116572660-23842988c843?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=1200&q=85',
    ],
    websiteUrl: 'https://verdant.example.com',
    locations: [
      { name: 'Seattle Greenhouse', city: 'Seattle', country: 'United States', address: '820 Pike Pine Corridor' },
      { name: 'Melbourne Fitzroy', city: 'Melbourne', country: 'Australia', address: '112 Gertrude Street' },
      { name: 'Singapore Marina Bay', city: 'Singapore', country: 'Singapore', address: '2 Bayfront Avenue' },
    ],
    franchiseAvailable: true,
    featured: true,
    status: 'Active',
  },
  {
    name: 'Maison & Molen Bakery Café',
    slug: 'maison-molen',
    tagline: 'Heritage Hearth & Morning Roasts.',
    description:
      'European-style artisanal bakery and espresso café uniting slow sourdough laminations with dark chocolate-noted roasts.',
    concept:
      'A multi-sensory culinary theater where open stone ovens and brass proving racks invite guests to watch master bakers shape 72-hour fermented croissants, cardamon buns, and country loaves, paired with rich velvety flat whites.',
    category: 'Coffee & Bakery',
    logo: 'MAISON & MOLEN',
    heroImage:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1200&q=85',
    ],
    websiteUrl: 'https://maisonmolen.example.com',
    locations: [
      { name: 'Amsterdam Jordaan Flagship', city: 'Amsterdam', country: 'Netherlands', address: '68 Prinsengracht' },
      { name: 'Montreal Mile End', city: 'Montreal', country: 'Canada', address: '204 Rue Saint-Viateur' },
      { name: 'New York SoHo', city: 'New York', country: 'United States', address: '142 Spring Street' },
    ],
    franchiseAvailable: true,
    featured: true,
    status: 'Active',
  },
  {
    name: 'Solstice Roasting Co.',
    slug: 'solstice-roasters',
    tagline: 'The Pulse of Modern Neighborhood Culture.',
    description:
      'High-energy, community-first all-day café and roastery built for remote work, creative collisions, and daily rituals.',
    concept:
      'Engineered for modern urban density with expansive communal oak tables, reliable gigabit fiber, warm residential lighting, and quick grab-and-go specialty coffee bars alongside all-day breakfast toasts.',
    category: 'Neighborhood Café',
    logo: 'SOLSTICE',
    heroImage:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    ],
    websiteUrl: 'https://solstice.example.com',
    locations: [
      { name: 'Austin South Congress', city: 'Austin', country: 'United States', address: '1400 S Congress Ave' },
      { name: 'Berlin Mitte Lab', city: 'Berlin', country: 'Germany', address: '55 Torstrasse' },
    ],
    franchiseAvailable: true,
    featured: false,
    status: 'Coming Soon / Franchise',
  },
];

const seedBrands = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coffee-cafe';
    console.log(`Connecting to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI);

    console.log('Clearing existing PINCOF brands...');
    await Brand.deleteMany({});

    console.log(`Inserting ${sampleBrands.length} PINCOF portfolio brands...`);
    const createdBrands = await Brand.insertMany(sampleBrands);

    console.log(`Successfully seeded ${createdBrands.length} brands!`);
    createdBrands.forEach((b) => {
      console.log(`- ${b.name} (${b.category}) [slug: /brands/${b.slug}]`);
    });

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during brand seeding: ${error.message}`);
    process.exit(1);
  }
};

if (require.main === module) {
  seedBrands();
}

module.exports = sampleBrands;
