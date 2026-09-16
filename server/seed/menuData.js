const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/Menu');

dotenv.config();

const sampleMenuItems = [
  // SIGNATURE
  {
    name: 'Smoked Vanilla Ember Latte',
    description: 'Double shot of Ethiopian heirloom espresso, Madagascar vanilla bean syrup, smoked oak mist, and velvety oat milk.',
    price: 7.25,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Aurelia Golden Tonic',
    description: 'Cold-extracted Gesha espresso poured over craft botanical tonic water, blood orange essence, and a torched rosemary sprig.',
    price: 7.50,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Cardamom Saffron Cortado',
    description: 'Equal parts single-origin Colombian espresso and steamed milk infused with crushed green cardamom pods and Kashmiri saffron threads.',
    price: 6.75,
    category: 'Signature',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // COFFEE (HOT)
  {
    name: 'Single Origin Espresso',
    description: 'Precision extracted 1:2 ratio espresso shot featuring floral jasmine, bergamot, and ripe stone fruit tasting notes.',
    price: 4.25,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Artisan Cappuccino',
    description: 'Equal thirds of rich espresso, silky microfoam, and steamed whole milk, finished with subtle cocoa dust.',
    price: 5.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'V60 Hand-Drip Pour Over',
    description: 'Slow pour over highlighting micro-lot washed Geisha beans from Boquete, Panama. Bright acidity and honey sweetness.',
    price: 6.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Flat White',
    description: 'Ristretto espresso poured with thin, velvety steamed microfoam. Strong coffee body with a rich creamy texture.',
    price: 5.25,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // COLD COFFEE
  {
    name: '18-Hour Kyoto Cold Brew',
    description: 'Slow-drip cold immersion extracted over 18 hours. Ultra-smooth body with natural chocolate and black cherry undertones.',
    price: 5.75,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Salted Caramel Iced Cloud',
    description: 'House cold brew topped with aerated sweet sea-salt cream foam and dark caramel drizzle over crystal clear ice.',
    price: 6.85,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Nitro Cold Brew Float',
    description: 'Nitrogen-infused cold brew tapped cold and creamy, paired with a scoop of house-churned Tahitian vanilla bean gelato.',
    price: 7.95,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // TEA
  {
    name: 'Ceremonial Uji Matcha Latte',
    description: 'Stone-ground first harvest ceremonial grade matcha from Kyoto, whisked with steaming oat milk and organic wildflower honey.',
    price: 6.25,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Roasted Iron Goddess Oolong',
    description: 'Traditional charcoal-roasted Tie Guan Yin leaves yielding deeply comforting honeyed orchid and toasted walnut notes.',
    price: 5.50,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Hojicha Smoked Cloud Tea',
    description: 'Roasted Japanese green tea with toasted nutty warmth, topped with silky steamed almond cream.',
    price: 6.00,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // BREAKFAST
  {
    name: 'Smoked Salmon Tartine',
    description: 'House sourdough, wild cured Scottish salmon, dill crème fraîche, pickled shallots, caperberries, and microgreens.',
    price: 14.50,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    vegetarian: false,
    featured: false,
    available: true,
  },
  {
    name: 'Avocado & Truffle Poached Egg',
    description: 'Crushed Hass avocado on toasted country levain, two 63-degree pasture-raised poached eggs, black truffle oil, and chili flakes.',
    price: 13.75,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Açai Coconut Granola Bowl',
    description: 'Wild organic Amazonian açai topped with toasted buckwheat granola, fresh blackberries, kiwi, chia seeds, and cacao nibs.',
    price: 12.50,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // SNACKS
  {
    name: 'Brown Butter French Croissant',
    description: 'Laminated French butter pastry baked each dawn to deep golden flakiness with a soft, honeycomb interior.',
    price: 4.75,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Wild Mushroom Brioche Toast',
    description: 'Sautéed chanterelles, thyme butter, whipped goat curd, and shaved pecorino on toasted brioche.',
    price: 11.25,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },

  // DESSERTS
  {
    name: 'Artisan Espresso Tiramisu',
    description: 'Layers of delicate ladyfingers soaked in our dark roast espresso and Marsala wine, whipped mascarpone, and Valrhona dark cocoa.',
    price: 8.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: true,
    available: true,
  },
  {
    name: 'Pistachio Orange Blossom Tart',
    description: 'Shortcrust shell filled with Sicilian bronte pistachio frangipane, orange blossom cream, and crushed candied pistachios.',
    price: 7.95,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1527515243257-fbda748c248b?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
  {
    name: 'Dark Chocolate Basque Cheesecake',
    description: 'Caramelized burnt exterior with a molten 70% dark chocolate and cream cheese center, dusted with flaky Maldon sea salt.',
    price: 8.75,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    featured: false,
    available: true,
  },
];

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coffee-cafe';
    console.log(`Connecting to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI);

    console.log('Clearing existing menu items...');
    await Menu.deleteMany({});

    console.log(`Inserting ${sampleMenuItems.length} artisan menu items...`);
    const createdItems = await Menu.insertMany(sampleMenuItems);

    console.log(`Successfully seeded ${createdItems.length} menu items!`);
    console.log(`- Featured items: ${createdItems.filter(i => i.featured).length}`);
    console.log(`- Categories: ${[...new Set(createdItems.map(i => i.category))].join(', ')}`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during menu seeding: ${error.message}`);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = sampleMenuItems;
