import type { 
  Navigation, 
  Category, 
  Product, 
  ProductDetail, 
  Review,
  ProductsResponse,
  ProductFilters,
  PaginationParams
} from '@/types';

// Mock data
const mockNavigations: Navigation[] = [
  { id: '1', title: 'Electronics', slug: 'electronics' },
  { id: '2', title: 'Books', slug: 'books' },
  { id: '3', title: 'Home & Garden', slug: 'home-garden' },
  { id: '4', title: 'Fashion', slug: 'fashion' },
];

const mockCategories: Category[] = [
  {
    id: 'c1',
    navigation_id: '1',
    title: 'Computers & Laptops',
    slug: 'computers-laptops',
    product_count: 156,
  },
  {
    id: 'c2',
    navigation_id: '1',
    title: 'Smartphones & Tablets',
    slug: 'smartphones-tablets',
    product_count: 243,
  },
  {
    id: 'c3',
    navigation_id: '1',
    title: 'Audio & Headphones',
    slug: 'audio-headphones',
    product_count: 89,
  },
  {
    id: 'c4',
    navigation_id: '2',
    title: 'Fiction',
    slug: 'fiction',
    product_count: 567,
  },
  {
    id: 'c5',
    navigation_id: '2',
    title: 'Non-Fiction',
    slug: 'non-fiction',
    product_count: 432,
  },
];

const mockProducts: Product[] = [
  {
    id: 'p1',
    source_id: 'amz-123',
    title: 'Premium Wireless Headphones Pro',
    author: 'AudioTech',
    price: 299.99,
    currency: 'USD',
    image_url: '/placeholder.svg',
    source_url: 'https://example.com',
    last_scraped_at: new Date().toISOString(),
  },
  {
    id: 'p2',
    source_id: 'amz-124',
    title: 'Smart Laptop 15.6" Ultra',
    author: 'TechBrand',
    price: 1299.99,
    currency: 'USD',
    image_url: '/placeholder.svg',
    source_url: 'https://example.com',
    last_scraped_at: new Date().toISOString(),
  },
  {
    id: 'p3',
    source_id: 'amz-125',
    title: 'Bestselling Fiction Novel',
    author: 'Jane Smith',
    price: 24.99,
    currency: 'USD',
    image_url: '/placeholder.svg',
    source_url: 'https://example.com',
    last_scraped_at: new Date().toISOString(),
  },
  {
    id: 'p4',
    source_id: 'amz-126',
    title: 'Professional Camera 4K',
    author: 'PhotoPro',
    price: 899.99,
    currency: 'USD',
    image_url: '/placeholder.svg',
    source_url: 'https://example.com',
    last_scraped_at: new Date().toISOString(),
  },
  {
    id: 'p5',
    source_id: 'amz-127',
    title: 'Gaming Console Next-Gen',
    author: 'GameTech',
    price: 499.99,
    currency: 'USD',
    image_url: '/placeholder.svg',
    source_url: 'https://example.com',
    last_scraped_at: new Date().toISOString(),
  },
];

const mockProductDetails: Record<string, ProductDetail> = {
  p1: {
    product_id: 'p1',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Features advanced noise cancellation, 30-hour battery life, and premium materials.',
    specs: {
      'Battery Life': '30 hours',
      'Bluetooth Version': '5.2',
      'Weight': '250g',
      'Colors': 'Black, Silver, Blue',
    },
    ratings_avg: 4.6,
    reviews_count: 1284,
  },
};

const mockReviews: Review[] = [
  {
    id: 'r1',
    product_id: 'p1',
    author: 'John D.',
    rating: 5,
    text: 'Amazing sound quality! Best headphones I\'ve ever owned.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'r2',
    product_id: 'p1',
    author: 'Sarah M.',
    rating: 4,
    text: 'Great product overall. Battery life is impressive.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'r3',
    product_id: 'p1',
    author: 'Mike R.',
    rating: 5,
    text: 'Worth every penny. The noise cancellation is incredible.',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  async getNavigations(): Promise<Navigation[]> {
    await delay(300);
    return mockNavigations;
  },

  async getCategories(navId: string): Promise<Category[]> {
    await delay(400);
    return mockCategories.filter(cat => cat.navigation_id === navId);
  },

  async getProducts(
    categoryId: string,
    filters: ProductFilters = {},
    pagination: PaginationParams = { page: 1, limit: 12 }
  ): Promise<ProductsResponse> {
    await delay(500);
    
    let filtered = [...mockProducts];
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search) ||
        p.author.toLowerCase().includes(search)
      );
    }
    
    // Apply price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    
    // Apply author filter
    if (filters.author) {
      filtered = filtered.filter(p => p.author === filters.author);
    }
    
    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const start = (pagination.page - 1) * pagination.limit;
    const products = filtered.slice(start, start + pagination.limit);
    
    return {
      products,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
    };
  },

  async getProduct(productId: string): Promise<Product | null> {
    await delay(400);
    return mockProducts.find(p => p.id === productId) || null;
  },

  async getProductDetail(productId: string): Promise<ProductDetail | null> {
    await delay(400);
    return mockProductDetails[productId] || null;
  },

  async getReviews(productId: string): Promise<Review[]> {
    await delay(400);
    return mockReviews.filter(r => r.product_id === productId);
  },

  async refreshProduct(productId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    return {
      success: true,
      message: 'Product data refreshed successfully',
    };
  },

  async saveViewHistory(productId: string): Promise<void> {
    const history = JSON.parse(localStorage.getItem('viewHistory') || '[]');
    if (!history.includes(productId)) {
      history.push(productId);
      localStorage.setItem('viewHistory', JSON.stringify(history.slice(-20)));
    }
  },
};
