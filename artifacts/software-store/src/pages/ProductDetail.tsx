import { useRoute, Link } from 'wouter';
import { useGetProduct, getGetProductQueryKey } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, DownloadCloud, ExternalLink, Tag, CheckCircle2 } from 'lucide-react';

export default function ProductDetail() {
  const [, params] = useRoute('/products/:id');
  const productId = Number(params?.id);

  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: {
      enabled: !!productId && !isNaN(productId),
      queryKey: getGetProductQueryKey(productId),
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-muted-foreground mb-8">
          The software product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
          </Link>
        </Button>
      </div>
    );
  }

  const hasTiers = product.pricingTiers && product.pricingTiers.length > 0;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

        {/* Product Info Column */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono">v{product.version}</Badge>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden border shadow-sm relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-tech-grid flex items-center justify-center">
                <DownloadCloud className="h-20 w-20 text-muted-foreground/20" />
              </div>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Features After Registration</h3>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-sm">{feature.title}</span>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Technical Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground mb-1">Product ID</dt>
                <dd className="font-medium font-mono">{product.id}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Latest Version</dt>
                <dd className="font-medium font-mono">{product.version}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Category</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">License</dt>
                <dd className="font-medium">Perpetual</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Download / Pricing Column */}
        <div className="lg:col-span-2 sticky top-24 space-y-4">
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-2xl">Pricing &amp; Download</CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">

              {hasTiers ? (
                /* Tiered pricing rows */
                <div className="space-y-3">
                  {product.pricingTiers!.map((tier) => {
                    const regular = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tier.price);
                    const discounted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tier.discountPrice);
                    return (
                      <div
                        key={tier.label}
                        className="rounded-lg border bg-card p-4 flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{tier.label}</span>
                          <Badge variant="destructive" className="text-xs gap-1">
                            <Tag className="h-3 w-3" />
                            {tier.discountPercent}% OFF
                          </Badge>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">{discounted}</span>
                          <span className="text-sm text-muted-foreground line-through">{regular}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Flat price fallback */
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
                </div>
              )}

              <div className="pt-1 space-y-2">
                <Button
                  asChild
                  className="w-full h-12 text-base font-semibold shadow-md"
                >
                  <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <DownloadCloud className="mr-2 h-5 w-5" />
                    Download {product.name}
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Official Page
                  </a>
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
