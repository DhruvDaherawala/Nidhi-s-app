export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
}

export const products: Product[] = [
    // Handmade Bags (7 items)
    { id: 'bag_1', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_1.png'], category: 'Handmade Bag' },
    { id: 'bag_2', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_2.png'], category: 'Handmade Bag' },
    { id: 'bag_3', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_3.png'], category: 'Handmade Bag' },
    { id: 'bag_4', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_4.png'], category: 'Handmade Bag' },
    { id: 'bag_5', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_5.png'], category: 'Handmade Bag' },
    { id: 'bag_6', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_6.png'], category: 'Handmade Bag' },
    { id: 'bag_7', name: 'Handmade Bag ', price: 0, description: 'Stylish handmade bag.', images: ['/products/bag_7.png'], category: 'Handmade Bag' },

    // Crochet Flower Bouquets (4 items)
    { id: 'bouquet_1', name: 'Beautiful Crochet Flower Bouquet ', price: 0, description: 'Beautiful crochet flower bouquet.', images: ['/products/crochet_flower_bouquet_1.png'], category: 'Crochet Flower Bouquet' },
    { id: 'bouquet_2', name: 'Beautiful Crochet Flower Bouquet ', price: 0, description: 'Beautiful crochet flower bouquet.', images: ['/products/crochet_flower_bouquet_2.png'], category: 'Crochet Flower Bouquet' },
    { id: 'bouquet_3', name: 'Beautiful Crochet Flower Bouquet ', price: 0, description: 'Beautiful crochet flower bouquet.', images: ['/products/crochet_flower_bouquet_3.png'], category: 'Crochet Flower Bouquet' },
    { id: 'bouquet_4', name: 'Beautiful Crochet Flower Bouquet ', price: 0, description: 'Beautiful crochet flower bouquet.', images: ['/products/crochet_flower_bouquet_4.png'], category: 'Crochet Flower Bouquet' },

    // Crochet Leg Warmers (3 items)
    { id: 'leg_1', name: 'Crochet Leg Warmer ', price: 0, description: 'Cozy crochet leg warmers.', images: ['/products/crochet_for_leg_1.png'], category: 'Crochet Leg Warmers' },
    { id: 'leg_2', name: 'Crochet Leg Warmer ', price: 0, description: 'Cozy crochet leg warmers.', images: ['/products/crochet_for_leg_2.png'], category: 'Crochet Leg Warmers' },
    { id: 'leg_3', name: 'Crochet Leg Warmer ', price: 0, description: 'Cozy crochet leg warmers.', images: ['/products/crochet_for_leg_3.png'], category: 'Crochet Leg Warmers' },

    // Crochet Tops (4 items)
    { id: 'top_1', name: 'Beautiful Crochet Top ', price: 0, description: 'Fashionable crochet top.', images: ['/products/crochet_top_1.png'], category: 'Crochet Top' },
    { id: 'top_2', name: 'Beautiful Crochet Top ', price: 0, description: 'Fashionable crochet top.', images: ['/products/crochet_top_2.png'], category: 'Crochet Top' },
    { id: 'top_3', name: 'Beautiful Crochet Top ', price: 0, description: 'Fashionable crochet top.', images: ['/products/crochet_top_3.png'], category: 'Crochet Top' },
    { id: 'top_4', name: 'Beautiful Crochet Top ', price: 0, description: 'Fashionable crochet top.', images: ['/products/crochet_top_4.png'], category: 'Crochet Top' },

    // Accessories (Individual Items)
    { id: 'Accessory_1', name: 'Flower Accessory', price: 0, description: 'Delicate flower accessory.', images: ['/products/flower.png'], category: 'Accessory' },
    { id: 'Accessory_2', name: 'Ear Rings', price: 0, description: 'Unique handmade ear rings.', images: ['/products/ear_rings.png'], category: 'Accessory' },
    { id: 'Accessory_3', name: 'Keychain', price: 0, description: 'A cute crochet keychain.', images: ['/products/keychain.png'], category: 'Accessory' },
];
