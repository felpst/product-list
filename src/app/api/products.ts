export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image?: string // Made optional
}

export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    price: 699.99,
    description: "Latest smartphone with advanced features.",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1299.99,
    description: "High-performance laptop for professionals.",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium noise-canceling wireless headphones.",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    description:
      "Fitness tracker and smartwatch with health monitoring features.",
    category: "Electronics",
  },
  {
    id: 5,
    name: "4K Ultra HD TV",
    price: 799.99,
    description: "55-inch 4K Ultra HD Smart TV with HDR.",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 549.99,
    description: "Mirrorless digital camera with 24MP sensor and 4K video.",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Gaming Console",
    price: 499.99,
    description: "Next-gen gaming console with 4K graphics and 1TB storage.",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 99.99,
    description: "Portable Bluetooth speaker with high-quality sound.",
    category: "Electronics",
  },
  {
    id: 9,
    name: "E-Reader",
    price: 129.99,
    description: "Lightweight e-reader with a high-resolution display.",
    category: "Electronics",
  },
  {
    id: 10,
    name: "Smart Home Hub",
    price: 149.99,
    description: "Control your smart home devices with this hub.",
    category: "Electronics",
  },
  {
    id: 11,
    name: "Fitness Tracker",
    price: 79.99,
    description: "Track your fitness activities and health metrics.",
    category: "Electronics",
  },
  {
    id: 12,
    name: "Drone",
    price: 299.99,
    description: "High-performance drone with 4K camera.",
    category: "Electronics",
  },
  {
    id: 13,
    name: "VR Headset",
    price: 399.99,
    description: "Immersive VR headset with advanced features.",
    category: "Electronics",
  },
  {
    id: 14,
    name: "Smart Thermostat",
    price: 199.99,
    description:
      "Smart thermostat with remote control and energy-saving features.",
    category: "Electronics",
  },
  {
    id: 15,
    name: "Electric Scooter",
    price: 499.99,
    description: "Eco-friendly electric scooter with long battery life.",
    category: "Electronics",
  },
  {
    id: 16,
    name: "Portable Projector",
    price: 299.99,
    description: "Compact portable projector with HD resolution.",
    category: "Electronics",
  },
  {
    id: 17,
    name: "Smart Doorbell",
    price: 149.99,
    description: "Smart doorbell with video and two-way audio.",
    category: "Electronics",
  },
]
