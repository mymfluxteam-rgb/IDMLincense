import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'wouter';
import { useLookupOrders, getLookupOrdersQueryKey } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Key, Copy, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const lookupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LookupFormValues = z.infer<typeof lookupSchema>;

export default function OrderLookup() {
  const [lookupEmail, setLookupEmail] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: orders, isLoading, isError } = useLookupOrders(
    { email: lookupEmail! },
    { 
      query: { 
        enabled: !!lookupEmail,
        queryKey: getLookupOrdersQueryKey({ email: lookupEmail! }),
        retry: false
      } 
    }
  );

  const form = useForm<LookupFormValues>({
    resolver: zodResolver(lookupSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: LookupFormValues) => {
    setLookupEmail(data.email);
  };

  const copyLicenseKey = (key: string, id: number) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied",
      description: "License key copied to clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl min-h-[80vh]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Search className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Order Lookup</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Lost your license key? Enter the email address you used during purchase to retrieve all your orders and keys.
        </p>
      </div>

      <Card className="max-w-xl mx-auto mb-12 shadow-md">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="Email address used for purchase..." 
                          className="pl-10 h-12 text-base" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-12 px-8" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Find Orders"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {lookupEmail && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold">
              Results for <span className="text-primary">{lookupEmail}</span>
            </h2>
            {orders && (
              <Badge variant="outline">{orders.length} orders found</Badge>
            )}
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p>Searching database...</p>
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-destructive">
              <p>Error retrieving orders. Please try again later.</p>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden transition-all hover:shadow-md border-primary/10">
                  <div className="bg-muted/30 px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{order.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.id} • Purchased {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    <Badge className={order.status === 'completed' ? 'bg-success hover:bg-success/90' : ''}>
                      {order.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                      <div className="flex-1 max-w-lg">
                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Key className="h-4 w-4 text-primary" /> License Key
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 bg-muted p-3 rounded-md border font-mono text-sm break-all font-bold">
                            {order.licenseKey}
                          </code>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            onClick={() => copyLicenseKey(order.licenseKey, order.id)}
                            className="shrink-0 h-12 w-12"
                            title="Copy License Key"
                          >
                            {copiedId === order.id ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Copy className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="shrink-0">
                        <Link href={`/orders/${order.id}`}>
                          View Receipt <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-muted/20 border border-dashed rounded-xl">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                We couldn't find any orders associated with that email address. 
                Please check for typos or try another email.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
