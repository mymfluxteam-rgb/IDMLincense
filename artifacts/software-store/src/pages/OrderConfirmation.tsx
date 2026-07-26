import { useRoute, Link } from 'wouter';
import { useState } from 'react';
import { useGetOrder, getGetOrderQueryKey } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle2, Copy, Key, Package, Printer, Receipt } from 'lucide-react';

export default function OrderConfirmation() {
  const [, params] = useRoute('/orders/:id');
  const orderId = Number(params?.id);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data: order, isLoading, isError } = useGetOrder(orderId, {
    query: {
      enabled: !!orderId && !isNaN(orderId),
      queryKey: getGetOrderQueryKey(orderId)
    }
  });

  const copyLicenseKey = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "License key copied to clipboard.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <Receipt className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <p className="text-muted-foreground mb-8">The order you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button asChild variant="outline">
          <Link href="/orders/lookup">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go to Order Lookup
          </Link>
        </Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(order.productPrice);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
        </Link>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print Receipt
        </Button>
      </div>

      <Card className="shadow-lg border-primary/10 overflow-hidden">
        {/* Success Banner */}
        <div className="bg-success/10 p-8 flex flex-col items-center justify-center border-b border-success/20 text-center">
          <div className="h-20 w-20 bg-success text-success-foreground rounded-full flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-success mb-2">Order Confirmed</h1>
          <p className="text-success/80 max-w-md">
            Thank you for your purchase! Your payment was successful and your software is ready to use.
          </p>
        </div>

        <CardContent className="p-8 space-y-8">
          {/* License Key Section - Highlighted */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Key className="h-24 w-24 text-primary" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Your License Key</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <code className="flex-1 bg-background p-4 rounded-lg border border-primary/30 font-mono text-lg md:text-xl break-all font-bold text-foreground shadow-sm">
                  {order.licenseKey}
                </code>
                <Button 
                  onClick={copyLicenseKey}
                  className="h-14 px-6 shrink-0 shadow-sm"
                >
                  {copied ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Copied</>
                  ) : (
                    <><Copy className="mr-2 h-5 w-5" /> Copy Key</>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                This key is bound to {order.customerEmail}. Keep it secure.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Order Number</dt>
                  <dd className="font-mono font-medium">#{order.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      {order.status}
                    </Badge>
                  </dd>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <dt className="font-semibold">Total Paid</dt>
                  <dd className="font-bold text-lg">{formattedPrice}</dd>
                </div>
              </dl>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Customer Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-col">
                  <dt className="text-muted-foreground text-xs mb-1">Name</dt>
                  <dd className="font-medium">{order.customerName}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-muted-foreground text-xs mb-1">Email</dt>
                  <dd className="font-medium">{order.customerEmail}</dd>
                </div>
              </dl>
            </div>
          </div>

          <Separator />

          {/* Product Box */}
          <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg border">
            <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{order.productName}</h4>
              <p className="text-sm text-muted-foreground">Digital License</p>
            </div>
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link href={`/products/${order.productId}`}>
                View Product
              </Link>
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="bg-muted/10 border-t justify-center py-6 text-sm text-muted-foreground">
          A confirmation email has been sent to {order.customerEmail}
        </CardFooter>
      </Card>
    </div>
  );
}
