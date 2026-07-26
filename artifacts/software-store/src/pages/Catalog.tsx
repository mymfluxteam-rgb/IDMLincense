import { useState, useMemo } from 'react';
import { useListProducts, getListProductsQueryKey } from '@workspace/api-client-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, Shield, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: products, isLoading } = useListProducts(
    selectedCategory ? { category: selectedCategory } : undefined,
    { query: { queryKey: getListProductsQueryKey(selectedCategory ? { category: selectedCategory } : undefined) } }
  );

  const categories = useMemo(() => {
    // If we only have filtered products, we don't have all categories. 
    // Ideally we'd fetch all categories from the backend. Since we don't have a categories endpoint,
    // we'll rely on the default products or manually define some common ones based on the DB schema.
    return ['Utilities', 'Security', 'Development', 'Productivity', 'Design'];
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground text-background py-20 md:py-32 tech-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/90 z-0"></div>
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary-foreground bg-primary/20 backdrop-blur px-3 py-1">
            Enterprise-Grade Software
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Professional tools for <br/><span className="text-primary">modern workflows.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Instant digital delivery. Secure licensing. Zero friction. 
            Equip your team with the industry's most powerful applications today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search software catalog..." 
                className="w-full pl-10 h-12 bg-background/10 border-background/20 text-background placeholder:text-muted-foreground focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Categories</h3>
            <div className="flex flex-col gap-1">
              <Button 
                variant={selectedCategory === null ? "secondary" : "ghost"} 
                className="justify-start font-medium"
                onClick={() => setSelectedCategory(null)}
              >
                All Products
              </Button>
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={selectedCategory === cat ? "secondary" : "ghost"} 
                  className="justify-start font-medium"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" /> Secure Checkout
            </h4>
            <p className="text-sm text-muted-foreground">
              All purchases include instant license key delivery and a 30-day money-back guarantee.
            </p>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="w-full h-64 flex flex-col items-center justify-center text-muted-foreground gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center border rounded-xl bg-muted/30 border-dashed">
              <Cpu className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any products matching your criteria. Try adjusting your search or filters.
              </p>
              {(searchQuery || selectedCategory) && (
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
        
      </section>
    </div>
  );
}
