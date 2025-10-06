import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About ProductExplorer</h1>
        
        <Card className="mb-8">
          <CardContent className="p-8 space-y-4">
            <p className="text-lg">
              ProductExplorer is a cutting-edge product discovery platform that helps you find 
              and explore products across multiple categories. Our mission is to make online 
              shopping easier and more informed.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Our Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Comprehensive product database with real-time updates</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Detailed product information and specifications</li>
              <li>Verified customer reviews and ratings</li>
              <li>Smart recommendations based on your browsing history</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Technology Stack</h2>
            <p className="text-muted-foreground">
              Built with modern web technologies including React, TypeScript, Tailwind CSS, 
              and React Query for optimal performance and user experience.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Data Sources</h2>
            <p className="text-muted-foreground">
              Our product data is aggregated from trusted sources and regularly updated to 
              ensure accuracy. Each product includes a link to the original source for 
              verification and purchase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
