import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/mockApi';
import { NavigationCard } from '@/components/NavigationCard';
import { CategoryCardSkeleton } from '@/components/LoadingSkeleton';

const Home = () => {
  const { data: navigations, isLoading } = useQuery({
    queryKey: ['navigations'],
    queryFn: api.getNavigations,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-fade-in">
            Explore our curated collection of products across multiple categories. 
            Find exactly what you're looking for with our powerful search and filtering tools.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {navigations?.map((nav) => (
              <NavigationCard key={nav.id} navigation={nav} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Find products quickly with our intelligent search and filtering system
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Product data is regularly refreshed to ensure accuracy
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
              <p className="text-muted-foreground">
                Read authentic reviews from real customers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
