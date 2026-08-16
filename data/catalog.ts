import type {
  Brand,
  BrandSlug,
  Category,
  CategorySlug,
  Feature,
  Product,
  PromoBanner,
  Spec,
} from '@/lib/types';

/* ------------------------------------------------------------ taxonomies */

export const categories: Category[] = [
  {
    slug: 'cat-food',
    name: 'Cat Food',
    image: '/images/category-1.jpg',
    description: 'Complete daily nutrition for kittens, adults and seniors.',
  },
  {
    slug: 'cat-toys',
    name: 'Cat Toys',
    image: '/images/category-2.jpg',
    description: 'Chase, bat and pounce — enrichment for indoor cats.',
  },
  {
    slug: 'dog-food',
    name: 'Dog Food',
    image: '/images/category-3.jpg',
    description: 'Everyday and veterinary formulas for every life stage.',
  },
  {
    slug: 'dog-toys',
    name: 'Dog Toys',
    image: '/images/category-4.jpg',
    description: 'Plush, squeaky and fetch-ready toys built to survive.',
  },
  {
    slug: 'chew-toys',
    name: 'Chew Toys',
    image: '/images/category-5.jpg',
    description: 'Durable chews that keep teeth busy and clean.',
  },
  {
    slug: 'fish-food',
    name: 'Fish Food',
    image: '/images/product-2.jpg',
    description: 'Pellets and flakes for tropical, marine and pond tanks.',
  },
  {
    slug: 'bird-food',
    name: 'Bird Food',
    image: '/images/product-4.jpg',
    description: 'Fortified blends for parrots, conures and cockatiels.',
  },
  {
    slug: 'pet-care',
    name: 'Pet Care',
    image: '/images/product-6.jpg',
    description: 'Calming, grooming and everyday wellbeing essentials.',
  },
];

/** The five shown in the landing carousel. */
export const featuredCategorySlugs: CategorySlug[] = [
  'cat-food',
  'cat-toys',
  'dog-food',
  'dog-toys',
  'chew-toys',
];

export const brands: Brand[] = [
  { slug: 'dogcat', name: 'DogCat Enterprises', logo: '/images/brand-1.jpg' },
  { slug: 'husky', name: 'Husky', logo: '/images/brand-2.jpg' },
  { slug: 'catis', name: 'Catis', logo: '/images/brand-3.jpg' },
  { slug: 'flying-corgi', name: 'Flying Corgi', logo: '/images/brand-4.jpg' },
  { slug: 'doglogo', name: 'Dog Logo', logo: '/images/brand-5.jpg' },
];

/* -------------------------------------------------------------- catalogue */

/**
 * The store has eleven product lines and each ships in a few variants, which
 * is how a real pet shop is stocked — the same photo across sizes and flavours
 * reads as normal rather than as padding.
 *
 * Everything is derived from a compact table below instead of ~38 hand-typed
 * objects, so a price change or a new size is a one-line edit.
 */
interface VariantSpec {
  variant: string;
  /** Added to the family's base price. */
  deltaCents?: number;
  compareAtCents?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  /** Days before the reference date — drives the "newest" sort. */
  ageDays: number;
  featured?: boolean;
  tags?: string[];
}

interface Family {
  key: string;
  family: string;
  blurb: string;
  categorySlug: CategorySlug;
  brandSlug: BrandSlug;
  images: string[];
  basePriceCents: number;
  specs: Spec[];
  tags: string[];
  variants: VariantSpec[];
}

/** Fixed reference date so `addedAt` never shifts between builds. */
const CATALOG_EPOCH = Date.UTC(2026, 6, 1);
const DAY = 86_400_000;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const families: Family[] = [
  {
    key: 'vet-essentials',
    family: 'Vet Essentials',
    blurb:
      'Hydrolysed protein formula for dogs with food sensitivities, developed with veterinary nutritionists for long-term feeding.',
    categorySlug: 'dog-food',
    brandSlug: 'dogcat',
    images: ['/images/product-1.jpg', '/images/product-1_0.jpg'],
    basePriceCents: 1500,
    tags: ['veterinary', 'dry food'],
    specs: [
      { label: 'Life stage', value: 'Adult' },
      { label: 'Form', value: 'Dry kibble' },
      { label: 'Protein', value: 'Hydrolysed poultry' },
      { label: 'Grain free', value: 'Yes' },
    ],
    variants: [
      { variant: 'Hypoallergenic · 2 kg', compareAtCents: 1900, stock: 24, rating: 4.6, reviewCount: 128, ageDays: 120, featured: true },
      { variant: 'Hypoallergenic · 7 kg', deltaCents: 2600, stock: 11, rating: 4.7, reviewCount: 74, ageDays: 118 },
      { variant: 'Sensitive Skin · 2 kg', deltaCents: 300, stock: 18, rating: 4.4, reviewCount: 52, ageDays: 60 },
      { variant: 'Weight Control · 2 kg', deltaCents: 200, stock: 0, rating: 4.2, reviewCount: 31, ageDays: 45 },
    ],
  },
  {
    key: 'aquapro',
    family: 'AquaPro Pellets',
    blurb:
      'Sinking pellets made with natural shrimp for colour and vitality, formulated to hold together and keep the water clear.',
    categorySlug: 'fish-food',
    brandSlug: 'catis',
    images: ['/images/product-2.jpg', '/images/product-2_0.jpg'],
    basePriceCents: 4500,
    tags: ['aquarium', 'sinking pellets'],
    specs: [
      { label: 'Form', value: 'Sinking pellets' },
      { label: 'Suitable for', value: 'Tropical & coldwater' },
      { label: 'Net weight', value: '454 g' },
    ],
    variants: [
      { variant: 'Tropical Blend', stock: 12, rating: 4.3, reviewCount: 64, ageDays: 200, featured: true },
      { variant: 'Goldfish Blend', deltaCents: -600, stock: 26, rating: 4.1, reviewCount: 38, ageDays: 190 },
      { variant: 'Catfish Blend', deltaCents: 400, stock: 7, rating: 4.5, reviewCount: 22, ageDays: 30 },
    ],
  },
  {
    key: 'deepfeed',
    family: 'DeepFeed Formula',
    blurb:
      'Bottom-feeder nutrition formulated for optimal health, with a cleaner-water formula that reduces clouding between changes.',
    categorySlug: 'fish-food',
    brandSlug: 'catis',
    images: ['/images/product-3.jpg', '/images/product-3_0.jpg'],
    basePriceCents: 5500,
    tags: ['aquarium', 'bottom feeder'],
    specs: [
      { label: 'Form', value: 'Pellets' },
      { label: 'Suitable for', value: 'Bottom feeders' },
      { label: 'Net weight', value: '255 g' },
    ],
    variants: [
      { variant: 'Shrimp', stock: 8, rating: 4.1, reviewCount: 41, ageDays: 210, featured: true },
      { variant: 'Algae Wafers', deltaCents: -1000, stock: 33, rating: 4.6, reviewCount: 87, ageDays: 150 },
      { variant: 'Colour Boost', deltaCents: 700, stock: 4, rating: 4.0, reviewCount: 19, ageDays: 20 },
    ],
  },
  {
    key: 'fruitblend',
    family: 'FruitBlend',
    blurb:
      'Fortified pellets with natural fruit flavours, shaped so birds forage instead of picking out favourites and wasting the rest.',
    categorySlug: 'bird-food',
    brandSlug: 'flying-corgi',
    images: ['/images/product-4.jpg', '/images/product-4_0.jpg'],
    basePriceCents: 1500,
    tags: ['birds', 'pellets'],
    specs: [
      { label: 'Form', value: 'Fortified pellets' },
      { label: 'Flavour', value: 'Natural fruit' },
      { label: 'Net weight', value: '1.6 kg' },
    ],
    variants: [
      { variant: 'Parrot', compareAtCents: 2100, stock: 31, rating: 4.8, reviewCount: 213, ageDays: 240, featured: true },
      { variant: 'Conure', deltaCents: 200, stock: 22, rating: 4.6, reviewCount: 96, ageDays: 230 },
      { variant: 'Cockatiel', deltaCents: -200, stock: 40, rating: 4.7, reviewCount: 141, ageDays: 100 },
      { variant: 'Macaw · 3 kg', deltaCents: 1400, stock: 6, rating: 4.5, reviewCount: 28, ageDays: 15 },
    ],
  },
  {
    key: 'playspin',
    family: 'PlaySpin Tower',
    blurb:
      'Stacked tracks with spinning balls that keep cats chasing, batting and pouncing — weighted base so it survives enthusiasm.',
    categorySlug: 'cat-toys',
    brandSlug: 'catis',
    images: ['/images/product-5.jpg', '/images/product-5_0.jpg'],
    basePriceCents: 4900,
    tags: ['interactive', 'indoor'],
    specs: [
      { label: 'Material', value: 'BPA-free ABS' },
      { label: 'Assembly', value: 'None required' },
      { label: 'Dimensions', value: '10" × 5.5"' },
    ],
    variants: [
      { variant: '3-Tier', stock: 17, rating: 4.5, reviewCount: 96, ageDays: 170, featured: true },
      { variant: '2-Tier', deltaCents: -1500, stock: 29, rating: 4.3, reviewCount: 61, ageDays: 165 },
      { variant: 'Deluxe · 4-Tier', deltaCents: 2000, compareAtCents: 8400, stock: 9, rating: 4.7, reviewCount: 44, ageDays: 25 },
    ],
  },
  {
    key: 'calmzone',
    family: 'CalmZone',
    blurb:
      'Pheromone diffuser that helps reduce tension, fighting and destructive scratching in multi-cat households.',
    categorySlug: 'pet-care',
    brandSlug: 'husky',
    images: ['/images/product-6.jpg', '/images/product-6_0.jpg'],
    basePriceCents: 8500,
    tags: ['calming', 'pheromone'],
    specs: [
      { label: 'Coverage', value: 'Up to 65 m²' },
      { label: 'Duration', value: '30 days' },
      { label: 'Drug free', value: 'Yes' },
    ],
    variants: [
      { variant: 'Refill · Single', stock: 0, rating: 4.2, reviewCount: 57, ageDays: 300, featured: true },
      { variant: 'Starter Kit', deltaCents: 1500, stock: 14, rating: 4.4, reviewCount: 83, ageDays: 280 },
      { variant: 'Refill · Twin Pack', deltaCents: 4000, compareAtCents: 14_900, stock: 21, rating: 4.5, reviewCount: 39, ageDays: 40 },
    ],
  },
  {
    key: 'vetdiet-ha',
    family: 'VetDiet HA',
    blurb:
      'Therapeutic dry food with hydrolysed protein, formulated to support dogs through elimination diets and adverse food reactions.',
    categorySlug: 'dog-food',
    brandSlug: 'doglogo',
    images: ['/images/product-7.jpg', '/images/product-7_0.jpg'],
    basePriceCents: 1500,
    tags: ['veterinary', 'dry food'],
    specs: [
      { label: 'Life stage', value: 'All' },
      { label: 'Form', value: 'Dry kibble' },
      { label: 'Protein', value: 'Hydrolysed soy' },
      { label: 'Prescription', value: 'Recommended' },
    ],
    variants: [
      { variant: 'Hydrolyzed · 3 kg', stock: 5, rating: 4.7, reviewCount: 152, ageDays: 260, featured: true },
      { variant: 'Hydrolyzed · 11 kg', deltaCents: 3800, stock: 3, rating: 4.8, reviewCount: 61, ageDays: 255 },
      { variant: 'Puppy · 3 kg', deltaCents: 500, stock: 16, rating: 4.4, reviewCount: 47, ageDays: 90 },
      { variant: 'Large Breed · 11 kg', deltaCents: 4200, stock: 8, rating: 4.6, reviewCount: 35, ageDays: 10 },
    ],
  },
  {
    key: 'urinarycare',
    family: 'UrinaryCare',
    blurb:
      'Clinically formulated to support urinary health and reduce the recurrence of struvite and calcium oxalate stones.',
    categorySlug: 'dog-food',
    brandSlug: 'dogcat',
    images: ['/images/product-8.jpg', '/images/product-8_0.jpg'],
    basePriceCents: 6200,
    tags: ['veterinary', 'urinary care'],
    specs: [
      { label: 'Life stage', value: 'Adult' },
      { label: 'Form', value: 'Dry kibble' },
      { label: 'Focus', value: 'Urinary health' },
    ],
    variants: [
      { variant: 'Multicare · 4 kg', compareAtCents: 7400, stock: 19, rating: 4.4, reviewCount: 88, ageDays: 220, featured: true },
      { variant: 'Multicare · 12 kg', deltaCents: 5200, stock: 6, rating: 4.5, reviewCount: 42, ageDays: 215 },
      { variant: 'Stress Formula · 4 kg', deltaCents: 900, stock: 12, rating: 4.3, reviewCount: 55, ageDays: 70 },
      { variant: 'Small Bites · 4 kg', deltaCents: 400, stock: 0, rating: 4.1, reviewCount: 23, ageDays: 35 },
    ],
  },
  {
    key: 'adult-complete',
    family: 'Adult Complete',
    blurb:
      'Everyday complete nutrition for adult cats, with taurine for heart and eye health and a coat-supporting omega blend.',
    categorySlug: 'cat-food',
    brandSlug: 'dogcat',
    images: ['/images/category-1.jpg'],
    basePriceCents: 2400,
    tags: ['everyday', 'dry food'],
    specs: [
      { label: 'Life stage', value: 'Adult 1–10 years' },
      { label: 'Form', value: 'Dry kibble' },
      { label: 'Taurine', value: 'Added' },
    ],
    variants: [
      { variant: 'Chicken · 2 kg', stock: 42, rating: 4.5, reviewCount: 176, ageDays: 190, featured: true },
      { variant: 'Salmon · 2 kg', deltaCents: 300, stock: 35, rating: 4.6, reviewCount: 129, ageDays: 185 },
      { variant: 'Indoor · 2 kg', deltaCents: 200, compareAtCents: 3200, stock: 27, rating: 4.4, reviewCount: 94, ageDays: 80 },
      { variant: 'Senior · 2 kg', deltaCents: 500, stock: 13, rating: 4.3, reviewCount: 48, ageDays: 5 },
    ],
  },
  {
    key: 'squeaky-flock',
    family: 'Squeaky Flock',
    blurb:
      'Stuffing-free plush birds with a long floppy body dogs love to shake, and a squeaker in each end.',
    categorySlug: 'dog-toys',
    brandSlug: 'flying-corgi',
    images: ['/images/category-4.jpg'],
    basePriceCents: 1800,
    tags: ['plush', 'squeaky'],
    specs: [
      { label: 'Material', value: 'Stuffing-free plush' },
      { label: 'Squeakers', value: '2' },
      { label: 'Machine washable', value: 'Yes' },
    ],
    variants: [
      { variant: 'Duck · Single', stock: 54, rating: 4.6, reviewCount: 208, ageDays: 160, featured: true },
      { variant: 'Goose · Single', stock: 38, rating: 4.5, reviewCount: 147, ageDays: 155 },
      { variant: 'Flock · 3 Pack', deltaCents: 2400, compareAtCents: 5400, stock: 16, rating: 4.7, reviewCount: 92, ageDays: 12 },
    ],
  },
  {
    key: 'toughchew',
    family: 'ToughChew',
    blurb:
      'Textured rubber bone for power chewers, with ridges that scrape plaque while your dog works on it.',
    categorySlug: 'chew-toys',
    brandSlug: 'doglogo',
    images: ['/images/category-5.jpg'],
    basePriceCents: 2200,
    tags: ['durable', 'dental'],
    specs: [
      { label: 'Material', value: 'Natural rubber' },
      { label: 'Chew strength', value: 'Heavy' },
      { label: 'Dishwasher safe', value: 'Yes' },
    ],
    variants: [
      { variant: 'Medium', stock: 47, rating: 4.4, reviewCount: 163, ageDays: 140, featured: true },
      { variant: 'Large', deltaCents: 800, stock: 23, rating: 4.5, reviewCount: 88, ageDays: 135 },
      { variant: 'Small', deltaCents: -600, stock: 0, rating: 4.2, reviewCount: 51, ageDays: 55 },
    ],
  },
];

function expand(family: Family): Product[] {
  return family.variants.map((v, i) => {
    const priceCents = family.basePriceCents + (v.deltaCents ?? 0);
    return {
      id: `${family.key}-${i + 1}`,
      slug: slugify(`${family.family} ${v.variant}`),
      name: `${family.family} — ${v.variant}`,
      family: family.family,
      variant: v.variant,
      description: family.blurb,
      priceCents,
      compareAtCents: v.compareAtCents,
      currency: 'USD' as const,
      images: family.images,
      categorySlug: family.categorySlug,
      brandSlug: family.brandSlug,
      stock: v.stock,
      rating: v.rating,
      reviewCount: v.reviewCount,
      tags: [...family.tags, ...(v.tags ?? [])],
      featured: v.featured ?? false,
      specs: [...family.specs, { label: 'Variant', value: v.variant }],
      addedAt: CATALOG_EPOCH - v.ageDays * DAY,
    };
  });
}

export const products: Product[] = families.flatMap(expand);

/* ------------------------------------------------------------- promo etc. */

export const promoBanners: PromoBanner[] = [
  {
    id: 'b-summer',
    eyebrow: 'Selected items · online only',
    title: 'Hot Summer Deals',
    copy: 'Up to 40% off across food, toys and care while stock lasts.',
    cta: 'Shop the sale',
    href: '/products?sale=1',
    image: '/images/offer-banner-1.jpg',
    tone: 'bg-amber-100',
    wide: true,
  },
  {
    id: 'b-treats',
    eyebrow: 'Treats & grooming',
    title: 'Spoil your true love',
    copy: 'Calming diffusers, brushes and everyday wellbeing picks.',
    cta: 'Browse pet care',
    href: '/products?category=pet-care',
    image: '/images/offer-banner-2.jpg',
    tone: 'bg-neutral-100',
  },
  {
    id: 'b-brand',
    eyebrow: 'New this season',
    title: 'Fresh arrivals',
    copy: 'The newest additions across every aisle in the shop.',
    cta: 'See what is new',
    href: '/products?sort=newest',
    image: '/images/offer-banner-3.jpg',
    tone: 'bg-violet-100',
  },
];

export const features: Feature[] = [
  {
    id: 'f-shipping',
    title: 'Free shipping',
    description: 'On all orders over $50, delivered to your door.',
    icon: '/images/service-icon-1.png',
  },
  {
    id: 'f-returns',
    title: '30-day returns',
    description: 'Changed your mind? Send it back, no questions asked.',
    icon: '/images/service-icon-2.png',
  },
  {
    id: 'f-support',
    title: '24/7 support',
    description: 'Our team answers every message, day or night.',
    icon: '/images/service-icon-3.png',
  },
  {
    id: 'f-payment',
    title: 'Secure payment',
    description: 'Encrypted checkout with all major cards accepted.',
    icon: '/images/service-icon-4.png',
  },
];

/* ----------------------------------------------------------------- lookups */

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getBrandBySlug = (slug: string): Brand | undefined =>
  brands.find((b) => b.slug === slug);

export const featuredProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const countByCategory = (slug: CategorySlug): number =>
  products.filter((p) => p.categorySlug === slug).length;

export const countByBrand = (slug: BrandSlug): number =>
  products.filter((p) => p.brandSlug === slug).length;

/**
 * Related = same category but a *different* product line. Siblings of the same
 * family are already offered as "Other options" on the product page, so
 * repeating them here would just show the same item twice. One product per
 * family keeps the row varied; if the category has nothing else (a category
 * with a single line), it falls back to top-rated products elsewhere.
 */
export const relatedProducts = (product: Product, limit = 4): Product[] => {
  const pickOnePerFamily = (list: Product[]) => {
    const seen = new Set<string>();
    return list.filter((p) => {
      if (seen.has(p.family)) return false;
      seen.add(p.family);
      return true;
    });
  };

  const sameCategory = pickOnePerFamily(
    products
      .filter(
        (p) =>
          p.categorySlug === product.categorySlug && p.family !== product.family
      )
      .sort((a, b) => b.rating - a.rating)
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const elsewhere = pickOnePerFamily(
    products
      .filter(
        (p) =>
          p.family !== product.family &&
          p.categorySlug !== product.categorySlug &&
          !sameCategory.some((s) => s.family === p.family)
      )
      .sort((a, b) => b.rating - a.rating)
  );

  return [...sameCategory, ...elsewhere].slice(0, limit);
};

export const priceBounds = (): { min: number; max: number } => {
  const prices = products.map((p) => p.priceCents);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};
