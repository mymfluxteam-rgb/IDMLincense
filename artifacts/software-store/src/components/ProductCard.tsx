import { Link } from 'wouter';
import { Download, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@workspace/api-client-react/src/generated/api.schemas';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center border-b">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-tech-grid flex items-center justify-center">
            <Download className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur font-mono text-xs">
            v{product.version}
          </Badge>
          <Badge variant="outline" className="bg-background/90 backdrop-blur font-medium">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="flex-1 pb-2">
        <CardTitle className="text-xl leading-tight line-clamp-2">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 flex items-center justify-between border-t bg-muted/10">
        <div className="font-bold text-lg">{formattedPrice}</div>
        <Button asChild variant="default" size="sm" className="gap-2">
          <Link href={`/products/${product.id}`}>
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
