# ProductExplorer - Product Data Explorer Frontend

A production-ready React frontend for exploring and discovering products across multiple categories. Built with React, TypeScript, Tailwind CSS, and React Query.

## 🚀 Features

- **Smart Navigation**: Browse products by category with intuitive navigation cards
- **Advanced Filtering**: Search and filter products by price, rating, and author
- **Pagination**: Efficient pagination with customizable page sizes
- **Product Details**: Comprehensive product pages with specs, reviews, and ratings
- **Real-time Refresh**: Manually refresh product data with a single click
- **Browsing History**: Automatic tracking and persistence of viewed products
- **Responsive Design**: Fully responsive mobile-first design
- **Loading States**: Professional loading skeletons for all data fetching
- **Modern UI**: Glassmorphism effects, gradient headers, smooth animations

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Vite** - Build tool
- **shadcn/ui** - UI components

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:8080`

## 🔌 API Integration

The frontend is currently using mock API adapters. To connect to the real backend:

1. Set the API base URL in your environment:

```bash
# Create .env file
VITE_API_BASE_URL=https://your-backend-url.com/api
```

2. Update `src/services/mockApi.ts` to use the real API endpoints instead of mock data.

### Expected API Endpoints

#### GET `/api/navigation`
Returns list of navigation categories.

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "slug": "string"
  }
]
```

#### GET `/api/categories/:navId`
Returns categories for a navigation item.

**Response:**
```json
[
  {
    "id": "string",
    "navigation_id": "string",
    "parent_id": "string?",
    "title": "string",
    "slug": "string",
    "product_count": number
  }
]
```

#### GET `/api/categories/:catId/products`
Returns paginated products for a category.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `search` (string): Search query
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `minRating` (number): Minimum rating filter
- `author` (string): Author filter

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "source_id": "string",
      "title": "string",
      "author": "string",
      "price": number,
      "currency": "string",
      "image_url": "string",
      "source_url": "string",
      "last_scraped_at": "string (ISO date)"
    }
  ],
  "total": number,
  "page": number,
  "limit": number,
  "totalPages": number
}
```

#### GET `/api/products/:productId`
Returns detailed product information.

**Response:**
```json
{
  "product": {
    "id": "string",
    "source_id": "string",
    "title": "string",
    "author": "string",
    "price": number,
    "currency": "string",
    "image_url": "string",
    "source_url": "string",
    "last_scraped_at": "string"
  },
  "detail": {
    "product_id": "string",
    "description": "string",
    "specs": {
      "key": "value"
    },
    "ratings_avg": number,
    "reviews_count": number
  },
  "reviews": [
    {
      "id": "string",
      "product_id": "string",
      "author": "string",
      "rating": number,
      "text": "string",
      "created_at": "string"
    }
  ]
}
```

#### POST `/api/products/:productId/refresh`
Triggers a refresh of product data from source.

**Response:**
```json
{
  "success": boolean,
  "message": "string"
}
```

#### POST `/api/view-history`
Saves user's browsing history.

**Request Body:**
```json
{
  "product_id": "string",
  "timestamp": "string"
}
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # App header with navigation
│   ├── Layout.tsx      # Main layout wrapper
│   ├── NavigationCard.tsx
│   ├── ProductCard.tsx
│   ├── ProductFilters.tsx
│   ├── Breadcrumbs.tsx
│   └── LoadingSkeleton.tsx
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page with navigation cards
│   ├── Categories.tsx  # Category listing page
│   ├── Products.tsx    # Product grid with filters
│   ├── ProductDetail.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── services/           # API services
│   └── mockApi.ts      # Mock API (replace with real API)
├── types/              # TypeScript interfaces
│   └── index.ts        # Shared type definitions
├── lib/                # Utilities
│   └── utils.ts
├── App.tsx             # App root with routing
└── main.tsx            # Entry point
```

## 🎨 Design System

The app uses a custom design system with:

- **Colors**: Purple-to-blue gradient theme
- **Effects**: Glassmorphism cards, subtle shadows
- **Animations**: Smooth transitions, hover effects
- **Typography**: Clean, professional font hierarchy
- **Spacing**: Consistent spacing scale

All design tokens are defined in `src/index.css` and `tailwind.config.ts`.

## 📝 TODO for Backend Integration

- [ ] Replace mock API calls with real HTTP requests
- [ ] Add error handling for failed API calls
- [ ] Implement authentication if required
- [ ] Add retry logic for failed requests
- [ ] Set up proper CORS configuration
- [ ] Implement rate limiting on frontend
- [ ] Add loading states for all API calls
- [ ] Handle offline/network errors gracefully

## 🧪 Development Notes

### Mock Data
The app currently uses mock data in `src/services/mockApi.ts`. This allows full frontend development and testing without a backend.

### React Query
React Query is configured with:
- 1-minute stale time
- Automatic background refetching disabled
- Request deduplication
- Cache persistence

### Browsing History
User's browsing history is stored in `localStorage` and should be synced with the backend via the `/api/view-history` endpoint.

## 🚢 Deployment

```bash
# Build for production
npm run build

# The build output will be in the 'dist' folder
# Deploy this folder to your hosting service
```

### Recommended Hosting

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
