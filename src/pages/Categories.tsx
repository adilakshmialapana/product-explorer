import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '@/services/mockApi';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryCardSkeleton } from '@/components/LoadingSkeleton';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const { navId } = useParams<{ navId: string }>();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', navId],
    queryFn: () => api.getCategories(navId!),
    enabled: !!navId,
  });

  const { data: navigations } = useQuery({
    queryKey: ['navigations'],
    queryFn: api.getNavigations,
  });

  const currentNav = navigations?.find(n => n.id === navId);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: currentNav?.title || 'Categories' }
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">{currentNav?.title}</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {categories?.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.product_count} products
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
