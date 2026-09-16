const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

const products = [
  // ===================== 1. COFFEE =====================
  {
    name: 'Artisan Gesha Pour-Over',
    slug: 'artisan-gesha-pour-over',
    category: 'Coffee',
    subCategory: 'Signature Coffee',
    description:
      'Panama Hacienda La Esmeralda harvest cultivated at 1,750 meters. Hand-poured on ceramic V60 slow bars with notes of star jasmine, bergamot peach nectar, and crystalline black tea finish.',
    shortDescription: 'Jasmine, white peach, and bergamot slow-bar extraction.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    ],
    featured: true,
    signature: true,
    availability: 'Featured across selected specialty slow bars',
    brandNames: ['Aurelia Slow Bar & Roastery', 'Kanso Espresso Lab'],
    tags: ['Direct-Trade', 'Single-Origin', 'Slow Bar', 'High Altitude'],
  },
  {
    name: 'Single-Origin Double Espresso',
    slug: 'single-origin-double-espresso',
    category: 'Coffee',
    subCategory: 'Espresso',
    description:
      'Extracted on flush Modbar undercounter heads with customized mineralization water. Roasted on electric fluid-bed profiles for unmatched sweet brightness, tangerine acidity, and dark cacao body.',
    shortDescription: 'Crisp tangerine, honeycomb, and dark Venezuelan cacao.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: false,
    availability: 'Available across all PINCOF café locations',
    brandNames: ['Aurelia Slow Bar & Roastery', 'Kanso Espresso Lab', 'Solstice Roasting Co.'],
    tags: ['Espresso', 'Micro-Lot', 'Zero-Emission Roast'],
  },
  {
    name: 'Velvet Flat White',
    slug: 'velvet-flat-white',
    category: 'Coffee',
    subCategory: 'Cappuccino / Latte',
    description:
      'A dense, silky micro-foam folded into a rich double ristretto shot. Balanced with organic whole milk from pasture-grazed Jersey cows or house-made sprouted oat emulsion.',
    shortDescription: 'Silky micro-foam, roasted hazelnut, and dark toffee.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available across all PINCOF café locations',
    brandNames: ['Aurelia Slow Bar & Roastery', 'Maison & Molen Bakery Café', 'Solstice Roasting Co.'],
    tags: ['Flat White', 'Micro-Foam', 'Pasture Milk'],
  },
  {
    name: 'Kyoto Cold Drip Reserve',
    slug: 'kyoto-cold-drip-reserve',
    category: 'Coffee',
    subCategory: 'Cold Coffee',
    description:
      'Slow, single-drop 16-hour gravity extraction over Japanese glass towers. Unlocks concentrated chocolate liqueur aromas, roasted fig, and zero bitter astringency.',
    shortDescription: '16-hour slow drip, dark chocolate liqueur, and dried fig.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Featured at Aurelia Slow Bar & Kanso Espresso',
    brandNames: ['Aurelia Slow Bar & Roastery', 'Kanso Espresso Lab'],
    tags: ['Cold Brew', 'Kyoto Drip', 'Low Acid'],
  },
  {
    name: 'Madagascar Vanilla Bean Latte',
    slug: 'madagascar-vanilla-bean-latte',
    category: 'Coffee',
    subCategory: 'Latte',
    description:
      'Slow-simmered organic Madagascar bourbon vanilla caviar combined with rich espresso and textured whole or plant-based milk. Naturally fragrant with warm floral amber notes.',
    shortDescription: 'Bourbon vanilla caviar, warm amber floral, and espresso.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available across participating bakery cafés',
    brandNames: ['Maison & Molen Bakery Café', 'Solstice Roasting Co.'],
    tags: ['Bourbon Vanilla', 'Infusion', 'All-Day Favourite'],
  },
  {
    name: 'Botanical Cold Tonic',
    slug: 'botanical-cold-tonic',
    category: 'Coffee',
    subCategory: 'Cold Coffee',
    description:
      'Bright flash-chilled Ethiopian Yirgacheffe poured over artisanal quinine tonic, wild elderflower syrup, and fresh rosemary sprig with scorched grapefruit peel.',
    shortDescription: 'Wild elderflower, sparkling tonic, and chilled citrus coffee.',
    image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: true,
    availability: 'Featured at Verdant Botanical Café',
    brandNames: ['Verdant Botanical Café'],
    tags: ['Botanical', 'Elderflower', 'Sparkling'],
  },

  // ===================== 2. CAKES =====================
  {
    name: 'Valrhona Dark Chocolate Ganache Torte',
    slug: 'valrhona-dark-chocolate-torte',
    category: 'Cakes',
    subCategory: 'Chocolate Cakes',
    description:
      'Multi-layered 72% Valrhona dark chocolate sponge enveloped in whipped silk ganache, finished with Maldon smoked sea salt flakes and roasted cacao nib brittle.',
    shortDescription: '72% Valrhona chocolate, smoked sea salt, and cocoa nib crunch.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Available across participating PINCOF bakery cafés',
    brandNames: ['Maison & Molen Bakery Café', 'Aurelia Slow Bar & Roastery'],
    tags: ['Valrhona', 'Artisanal Cake', 'Dark Chocolate'],
  },
  {
    name: 'Basque Burnt Cheesecake with Bergamot',
    slug: 'basque-burnt-cheesecake-bergamot',
    category: 'Cakes',
    subCategory: 'Cheesecakes',
    description:
      'Caramelized deep golden crust with a molten, creamy custard core infused with Sicilian bergamot zest and organic cream cheese. Baked in stone hearth ovens.',
    shortDescription: 'Caramelized crust, molten cream cheese, and bergamot citrus.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Available across selected café locations',
    brandNames: ['Maison & Molen Bakery Café', 'Verdant Botanical Café'],
    tags: ['Cheesecake', 'Basque', 'Hearth Baked'],
  },
  {
    name: 'Meyer Lemon & Thyme Olive Oil Cake',
    slug: 'meyer-lemon-thyme-olive-oil-cake',
    category: 'Cakes',
    subCategory: 'Slice Cakes',
    description:
      'Moist crumb made with early-harvest California cold-pressed extra virgin olive oil, Meyer lemon zest, and fragrant garden thyme, finished with a sheer citrus glaze.',
    shortDescription: 'Cold-pressed olive oil, Meyer lemon, and fresh thyme glaze.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Featured at Verdant Botanical & Aurelia Slow Bar',
    brandNames: ['Verdant Botanical Café', 'Aurelia Slow Bar & Roastery'],
    tags: ['Olive Oil', 'Meyer Lemon', 'Botanical'],
  },
  {
    name: 'Heritage Celebration Gateau',
    slug: 'heritage-celebration-gateau',
    category: 'Cakes',
    subCategory: 'Celebration Cakes',
    description:
      'A multi-tier centerpiece cake featuring Madagascar vanilla chiffon, wild blackberry confit, and brown butter Swiss meringue buttercream. Crafted for special gatherings.',
    shortDescription: 'Vanilla chiffon, wild blackberry confit, and Swiss meringue.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Special order across Maison & Molen flagship bakeries',
    brandNames: ['Maison & Molen Bakery Café'],
    tags: ['Celebration', 'Chiffon', 'Hand-Crafted'],
  },

  // ===================== 3. PASTRIES =====================
  {
    name: '72-Hour Fermented Butter Croissant',
    slug: '72-hour-fermented-butter-croissant',
    category: 'Pastries',
    subCategory: 'Croissants',
    description:
      'Laminated with cultured Normandy butter over 72 hours of cold fermentation. Yields an ethereal honeycomb interior, whisper-crisp shattering crust, and deep toasted dairy sweetness.',
    shortDescription: 'Normandy cultured butter, 72-hour lamination, shattering crust.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Baked fresh at sunrise across participating cafés',
    brandNames: ['Maison & Molen Bakery Café', 'Aurelia Slow Bar & Roastery', 'Solstice Roasting Co.'],
    tags: ['Viennoiserie', 'Normandy Butter', 'Sunrise Bake'],
  },
  {
    name: 'Pain au Chocolat Single-Origin',
    slug: 'pain-au-chocolat-single-origin',
    category: 'Pastries',
    subCategory: 'Chocolate Pastries',
    description:
      'Two batons of single-origin 66% Caribbean dark chocolate folded inside laminated sourdough pastry dough, dusted with bittersweet Dutch cocoa.',
    shortDescription: '66% Caribbean dark chocolate folded in laminated sourdough.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available daily across all PINCOF bakery locations',
    brandNames: ['Maison & Molen Bakery Café', 'Solstice Roasting Co.'],
    tags: ['Pain au Chocolat', 'Dark Chocolate', 'Morning Bake'],
  },
  {
    name: 'Swedish Cardamom Braided Knot',
    slug: 'swedish-cardamom-braided-knot',
    category: 'Pastries',
    subCategory: 'Puff Pastries',
    description:
      'Stone-ground green cardamom seeds infused into rich brioche dough, hand-twisted into decorative knots and dusted with raw pearl sugar crystals.',
    shortDescription: 'Stone-ground cardamom, brioche twist, and pearl sugar.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: true,
    availability: 'Featured at Kanso Espresso & Maison & Molen',
    brandNames: ['Maison & Molen Bakery Café', 'Kanso Espresso Lab'],
    tags: ['Cardamom', 'Nordic Bakery', 'Fika Ritual'],
  },
  {
    name: 'Wild Berry Danish with Vanilla Curd',
    slug: 'wild-berry-danish-vanilla-curd',
    category: 'Pastries',
    subCategory: 'Danish Pastries',
    description:
      'Flaky laminated pastry cup filled with Tahitian vanilla bean custard and topped with fresh macerated raspberries, blackberries, and micro mint.',
    shortDescription: 'Flaky pastry crown, vanilla custard, and seasonal berries.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available across participating conservatory cafés',
    brandNames: ['Maison & Molen Bakery Café', 'Verdant Botanical Café'],
    tags: ['Danish', 'Summer Berries', 'Vanilla Bean'],
  },

  // ===================== 4. DESSERTS =====================
  {
    name: 'Pistachio Orange Blossom Frangipane Tart',
    slug: 'pistachio-orange-blossom-tart',
    category: 'Desserts',
    subCategory: 'Tarts',
    description:
      'Sweet sablé pastry shell loaded with Sicilian emerald pistachio frangipane, topped with organic orange blossom whipped chantilly and crushed bronte pistachios.',
    shortDescription: 'Sicilian pistachio frangipane, orange blossom chantilly cream.',
    image: 'https://images.unsplash.com/photo-1527515243257-fbda748c248b?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Available across participating PINCOF cafés',
    brandNames: ['Maison & Molen Bakery Café', 'Verdant Botanical Café'],
    tags: ['Frangipane', 'Pistachio', 'Artisan Tart'],
  },
  {
    name: 'Smoked Salt Double Fudge Brownie',
    slug: 'smoked-salt-double-fudge-brownie',
    category: 'Desserts',
    subCategory: 'Brownies',
    description:
      'Dense, fudgy 70% dark chocolate brownie infused with cold-brew espresso reduction and topped with flaked Oregon smoked sea salt.',
    shortDescription: '70% dark chocolate fudge, cold-brew reduction, smoked sea salt.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available across all PINCOF café locations',
    brandNames: ['Aurelia Slow Bar & Roastery', 'Solstice Roasting Co.', 'Kanso Espresso Lab'],
    tags: ['Brownie', 'Espresso Infusion', 'Decadent'],
  },
  {
    name: 'Ceremonial Matcha Panna Cotta',
    slug: 'ceremonial-matcha-panna-cotta',
    category: 'Desserts',
    subCategory: 'Dessert Cups',
    description:
      'Silky, chilled stone-ground Uji ceremonial matcha cream layered over roasted black sesame praline, served in minimalist glassware.',
    shortDescription: 'Uji ceremonial matcha cream, roasted black sesame, chilled cup.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Featured at Verdant Botanical & Kanso Espresso',
    brandNames: ['Verdant Botanical Café', 'Kanso Espresso Lab'],
    tags: ['Matcha', 'Uji Japan', 'Glassware Dessert'],
  },

  // ===================== 5. CAFÉ FAVOURITES =====================
  {
    name: 'Truffled Wild Mushroom Sourdough Tartine',
    slug: 'truffled-wild-mushroom-tartine',
    category: 'Café Favourites',
    subCategory: 'Sandwiches',
    description:
      'Pan-seared chanterelle, shiitake, and oyster mushrooms on toasted country sourdough with whipped goat labneh, fresh thyme, and white truffle oil drizzle.',
    shortDescription: 'Seared chanterelles, goat labneh, and white truffle sourdough.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    signature: true,
    availability: 'Served all-day across participating café locations',
    brandNames: ['Maison & Molen Bakery Café', 'Aurelia Slow Bar & Roastery', 'Solstice Roasting Co.'],
    tags: ['Tartine', 'Wild Mushroom', 'Truffle Sourdough'],
  },
  {
    name: 'Avocado Citrus Labneh Toast',
    slug: 'avocado-citrus-labneh-toast',
    category: 'Café Favourites',
    subCategory: 'Breakfast Items',
    description:
      'Hass avocados crushed with lime, spread over thick sesame sourdough with whipped citrus labneh, Aleppo chili flakes, and toasted dukkah seed crunch.',
    shortDescription: 'Crushed avocado, citrus labneh, and spiced dukkah on sourdough.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Available daily until 3:00 PM across participating cafés',
    brandNames: ['Solstice Roasting Co.', 'Verdant Botanical Café'],
    tags: ['Breakfast', 'Avocado', 'Sourdough'],
  },
  {
    name: 'House-Cured Pastrami Brioche',
    slug: 'house-cured-pastrami-brioche',
    category: 'Café Favourites',
    subCategory: 'Light Bites',
    description:
      '14-day cured peppery beef pastrami, aged Gruyère cheese, pickled shallots, and house whole-grain mustard on warm toasted butter brioche.',
    shortDescription: 'Peppered pastrami, aged Gruyère, and pickled shallot brioche.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    signature: false,
    availability: 'Featured at Maison & Molen & Solstice Roasters',
    brandNames: ['Maison & Molen Bakery Café', 'Solstice Roasting Co.'],
    tags: ['Brioche', 'Artisan Meat', 'Warm Lunch'],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('🗑️ Previous products cleared.');

    const created = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${created.length} PINCOF portfolio products!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding products:', err);
    process.exit(1);
  }
};

if (require.main === module) {
  seedProducts();
}

module.exports = { products, seedProducts };
