// Sample data: 20 laptops (photos in /public/images/laptops, prices are sample values)
const img = (name) => `/images/laptops/${name}.webp`;

const products = [
  {
    id: 1,
    slug: "asus-vivobook-14",
    name: "ASUS Vivobook 14",
    category: "Everyday",
    price: 499,
    stock: 20,
    image: img("asus-vivobook-14"),
    description:
      "Light 14-inch laptop for study and office work. Full HD screen, fast SSD storage and all-day battery.",
  },
  {
    id: 2,
    slug: "asus-vivobook-s14-oled",
    name: "ASUS Vivobook S14 OLED",
    category: "Ultrabook",
    price: 749,
    stock: 12,
    image: img("asus-vivobook-s14-oled"),
    description:
      "Slim 14-inch laptop with a vivid OLED display, backlit keyboard and quick charging.",
  },
  {
    id: 3,
    slug: "asus-zenbook-14-oled",
    name: "ASUS Zenbook 14 OLED",
    category: "Ultrabook",
    price: 899,
    stock: 10,
    image: img("asus-zenbook-14-oled"),
    description:
      "Premium thin-and-light laptop with an OLED screen, metal body and long battery life.",
  },
  {
    id: 4,
    slug: "asus-tuf-a15",
    name: "ASUS TUF A15 (RTX 3050)",
    category: "Gaming",
    price: 849,
    stock: 15,
    image: img("asus-tuf-a15-rtx-3050"),
    description:
      "Durable 15.6-inch gaming laptop with RTX 3050 graphics and a high refresh-rate display.",
  },
  {
    id: 5,
    slug: "asus-rog-strix-g16",
    name: "ASUS ROG Strix G16 (RTX 5070)",
    category: "Gaming",
    price: 1899,
    stock: 6,
    image: img("asus-rog-strix-g614pp-rtx-5070"),
    description:
      "High-end 16-inch gaming laptop with RTX 5070 graphics, RGB keyboard and advanced cooling.",
  },
  {
    id: 6,
    slug: "msi-cyborg-15",
    name: "MSI Cyborg 15 (RTX 5050)",
    category: "Gaming",
    price: 999,
    stock: 9,
    image: img("msi-cyborg-15-b13w-rtx-5050"),
    description:
      "Lightweight gaming laptop with a translucent design, RTX 5050 graphics and 144Hz screen.",
  },
  {
    id: 7,
    slug: "msi-modern-14",
    name: "MSI Modern 14",
    category: "Business",
    price: 429,
    stock: 25,
    image: img("msi-modern-14-f13mg"),
    description:
      "Affordable 14-inch business laptop, light enough to carry every day for work or class.",
  },
  {
    id: 8,
    slug: "msi-prestige-14-ai",
    name: "MSI Prestige 14 AI+",
    category: "Business",
    price: 1099,
    stock: 8,
    image: img("msi-prestige-14-ai-d3mg"),
    description:
      "Professional 14-inch laptop with an AI-ready processor, premium build and long battery life.",
  },
  {
    id: 9,
    slug: "lenovo-ideapad-slim-3",
    name: "Lenovo IdeaPad Slim 3",
    category: "Everyday",
    price: 449,
    stock: 18,
    image: img("lenovo-ideapad-slim-3"),
    description:
      "Reliable everyday laptop with a slim design, Full HD screen and fast SSD.",
  },
  {
    id: 10,
    slug: "asus-rog-xbox-ally",
    name: "ASUS ROG Xbox Ally",
    category: "Handheld",
    price: 599,
    stock: 7,
    image: img("asus-rog-xbox-ally"),
    description:
      "Handheld gaming PC with built-in controls and a 7-inch touchscreen. Play PC games anywhere.",
  },
  {
    id: 11,
    slug: "asus-vivobook-15",
    name: "ASUS Vivobook 15",
    category: "Everyday",
    price: 529,
    stock: 22,
    image: img("asus-vivobook-15"),
    description:
      "15.6-inch everyday laptop with a larger screen and number pad, good for spreadsheets and study.",
  },
  {
    id: 12,
    slug: "asus-vivobook-go-14",
    name: "ASUS Vivobook Go 14",
    category: "Everyday",
    price: 379,
    stock: 30,
    image: img("asus-vivobook-go-14"),
    description:
      "Budget-friendly 14-inch laptop for browsing, online classes and basic office apps.",
  },
  {
    id: 13,
    slug: "asus-zenbook-a14-oled",
    name: "ASUS Zenbook A14 OLED",
    category: "Ultrabook",
    price: 1049,
    stock: 9,
    image: img("asus-zenbook-a14-oled"),
    description:
      "Ultra-light 14-inch laptop with an OLED display and very long battery life for travel.",
  },
  {
    id: 14,
    slug: "asus-tuf-f16",
    name: "ASUS TUF F16 (RTX 5060)",
    category: "Gaming",
    price: 1349,
    stock: 11,
    image: img("asus-tuf-f16-rtx-5060"),
    description:
      "16-inch gaming laptop with RTX 5060 graphics, a fast display and a tough military-grade build.",
  },
  {
    id: 15,
    slug: "asus-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (RTX 5070 Ti)",
    category: "Gaming",
    price: 2499,
    stock: 4,
    image: img("asus-zephyrus-g16-rtx-5070ti"),
    description:
      "Slim premium gaming laptop with RTX 5070 Ti graphics and a bright OLED screen.",
  },
  {
    id: 16,
    slug: "asus-rog-flow-z13",
    name: "ASUS ROG Flow Z13",
    category: "Gaming",
    price: 1999,
    stock: 5,
    image: img("asus-rog-flow-z13"),
    description:
      "2-in-1 gaming tablet with a detachable keyboard. Use it as a tablet or a laptop.",
  },
  {
    id: 17,
    slug: "msi-raider-18",
    name: "MSI Raider 18 (RTX 5080)",
    category: "Gaming",
    price: 3299,
    stock: 3,
    image: img("msi-raider-18-max-hx-a2w-rtx-5080"),
    description:
      "18-inch flagship gaming laptop with RTX 5080 graphics, RGB lighting and desktop-class power.",
  },
  {
    id: 18,
    slug: "msi-prestige-16-flip",
    name: "MSI Prestige 16 Flip AI+",
    category: "Business",
    price: 1299,
    stock: 7,
    image: img("msi-prestige-16-flip-ai-c3m"),
    description:
      "16-inch convertible laptop with a touchscreen that folds into a tablet for presentations.",
  },
  {
    id: 19,
    slug: "asus-proart-pz14",
    name: "ASUS ProArt PZ14",
    category: "Creator",
    price: 1499,
    stock: 6,
    image: img("asus-proart-pz14"),
    description:
      "Tablet-style laptop for designers and photographers, with an accurate color display and pen support.",
  },
  {
    id: 20,
    slug: "msi-claw-8-ai",
    name: "MSI Claw 8 AI+",
    category: "Handheld",
    price: 799,
    stock: 8,
    image: img("msi-claw-8-ai-a2vm"),
    description:
      "8-inch handheld gaming PC with a large screen and comfortable grips for long play sessions.",
  },
];

export default products;

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id)) || null;
}
