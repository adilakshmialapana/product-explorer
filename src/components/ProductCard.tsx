import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image_url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{product.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{product.author}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {product.currency} {product.price.toFixed(2)}
            </span>
            <Badge variant="secondary" className="text-xs">
              In Stock
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
