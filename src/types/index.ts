export interface Navigation {
  id: string;
  title: string;
  slug: string;
}

export interface Category {
  id: string;
  navigation_id: string;
  parent_id?: string;
  title: string;
  slug: string;
  product_count: number;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  source_id: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
  last_scraped_at: string;
}

export interface ProductDetail {
  product_id: string;
  description: string;
  specs: Record<string, any>;
  ratings_avg: number;
  reviews_count: number;
}

export interface Review {
  id: string;
  product_id: string;
  author: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  author?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
