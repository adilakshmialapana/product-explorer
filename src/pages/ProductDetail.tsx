import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '@/services/mockApi';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Star, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const queryClient = useQueryClient();

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId!),
    enabled: !!productId,
  });

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => api.getProductDetail(productId!),
    enabled: !!productId,
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => api.getReviews(productId!),
    enabled: !!productId,
  });

  const refreshMutation = useMutation({
    mutationFn: () => api.refreshProduct(productId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
      toast.success('Product data refreshed successfully');
    },
    onError: () => {
      toast.error('Failed to refresh product data');
    },
  });

  useEffect(() => {
    if (productId) {
      api.saveViewHistory(productId);
    }
  }, [productId]);

  if (productLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Electronics', href: '/categories/1' },
          { label: 'Products', href: '/products?category=c1' },
          { label: product.title }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-muted-foreground">by {product.author}</p>
          </div>

          {detail && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(detail.ratings_avg)}
                <span className="ml-2 font-semibold">{detail.ratings_avg}</span>
              </div>
              <span className="text-muted-foreground">
                ({detail.reviews_count} reviews)
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">
              {product.currency} {product.price.toFixed(2)}
            </span>
            <Badge variant="secondary">In Stock</Badge>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => window.open(product.source_url, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Source
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
            >
              <RefreshCw className={`h-4 w-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {detail && (
            <>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {detail.description}
                </p>
              </div>

              {detail.specs && Object.keys(detail.specs).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Specifications</h2>
                    <dl className="grid grid-cols-2 gap-3">
                      {Object.entries(detail.specs).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                          <dd className="text-sm">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviewsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{review.author}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
