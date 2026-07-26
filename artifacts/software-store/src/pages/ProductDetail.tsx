import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  useGetProduct, 
  getGetProductQueryKey, 
  useCreateOrder 
} from '@workspace/api-client-react';
import { Order } from '@workspace/api-client-react/src/generated/api.schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, ShieldCheck, Key, Copy, CheckCircle2, DownloadCloud } from 'lucide-react';

const purchaseSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

export default function ProductDetail() {
  const [, params] = useRoute('/products/:id');
  const productId = Number(params?.id);
  const { toast } = useToast();

  const [successfulOrder, setSuccessfulOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  const { data: product, isLoading, isError } = useGetProduct(productId, {
    query: {
      enabled: !!productId && !isNaN(productId),
      queryKey: getGetProductQueryKey(productId)
    }
  });

  const createOrder = useCreateOrder();

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
    },
  });

  const onSubmit = (data: PurchaseFormValues) => {
    if (!product) return;
    
    createOrder.mutate(
      { 
        data: { 
          productId: product.id,
          customerName: data.customerName,
          customerEmail: data.customerEmail
        } 
      },
      {
        onSuccess: (order) => {
          setSuccessfulOrder(order);
          toast({
            title: "Purchase Successful",
            description: "Your license key has been generated.",
          });
        },
        onError: () => {
          toast({
            title: "Purchase Failed",
            description: "There was an error processing your purchase.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const copyLicenseKey = () => {
    if (!successfulOrder) return;
    navigator.clipboard.writeText(successfulOrder.licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "License key copied to clipboard.",
    });
  };

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
        <p className="text-muted-foreground mb-8">The software product you're looking for doesn't exist or has been removed.</p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
          </Link>
        </Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
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
                <dt className="text-muted-foreground mb-1">Delivery Method</dt>
                <dd className="font-medium">Instant Digital Key</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Purchase Column */}
        <div className="lg:col-span-2 sticky top-24">
          {successfulOrder ? (
            <Card className="border-success/30 shadow-lg shadow-success/5 overflow-hidden">
              <div className="bg-success/10 p-6 flex flex-col items-center justify-center border-b border-success/20 text-center">
                <div className="h-16 w-16 bg-success text-success-foreground rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-success">Purchase Complete</h3>
                <p className="text-sm text-success/80 mt-1">Thank you for your order, {successfulOrder.customerName}.</p>
              </div>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Your License Key</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted p-3 rounded-md border font-mono text-sm break-all font-bold text-primary">
                      {successfulOrder.licenseKey}
                    </code>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={copyLicenseKey}
                      className="shrink-0 h-12 w-12"
                      title="Copy License Key"
                    >
                      {copied ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Keep this key safe. Do not share it.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button asChild className="w-full" variant="default">
                    <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <DownloadCloud className="mr-2 h-4 w-4" /> Download Software
                    </a>
                  </Button>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/orders/${successfulOrder.id}`}>
                      View Full Receipt
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="bg-muted/30 border-b">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl">Purchase License</CardTitle>
                  <div className="text-2xl font-bold text-primary">{formattedPrice}</div>
                </div>
                <CardDescription>
                  Instant delivery to your email upon completion.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-primary/5 p-4 rounded-lg flex gap-3 text-sm mt-6 border border-primary/10">
                      <Key className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-muted-foreground">
                        A unique perpetual license key will be generated instantly and bound to this email address.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold mt-4 shadow-md"
                      disabled={createOrder.isPending}
                    >
                      {createOrder.isPending ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                      ) : (
                        <>Complete Purchase - {formattedPrice}</>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="justify-center border-t py-4 bg-muted/10">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> 256-bit Secure Encrypted Checkout
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
