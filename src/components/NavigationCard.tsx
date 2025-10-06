import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Navigation } from '@/types';

interface NavigationCardProps {
  navigation: Navigation;
}

export const NavigationCard = ({ navigation }: NavigationCardProps) => {
  return (
    <Link to={`/categories/${navigation.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{navigation.title}</h3>
              <p className="text-sm text-muted-foreground">
                Explore products in {navigation.title.toLowerCase()}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
