import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { 
  useGetStats, 
  useListProducts, 
  useListOrders,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  getGetStatsQueryKey,
  getListProductsQueryKey
} from '@workspace/api-client-react';
import { Product } from '@workspace/api-client-react/src/generated/api.schemas';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  PieChart, 
  Plus, 
  Pencil, 
  Trash2, 
  RefreshCw
} from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  version: z.string().min(1, "Version is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  downloadUrl: z.string().url("Must be a valid URL")
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Queries
  const { data: stats, isLoading: isLoadingStats } = useGetStats();
  const { data: products, isLoading: isLoadingProducts } = useListProducts();
  const { data: orders, isLoading: isLoadingOrders } = useListOrders();

  // Mutations
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // State
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      version: '1.0.0',
      price: 0,
      category: '',
      imageUrl: '',
      downloadUrl: ''
    }
  });

  const openCreateDialog = () => {
    setEditingProduct(null);
    form.reset({
      name: '',
      description: '',
      version: '1.0.0',
      price: 0,
      category: '',
      imageUrl: '',
      downloadUrl: ''
    });
    setIsProductDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      description: product.description,
      version: product.version,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl || '',
      downloadUrl: product.downloadUrl
    });
    setIsProductDialogOpen(true);
  };

  const onProductSubmit = (data: ProductFormValues) => {
    // Process optional imageUrl
    const payload = {
      ...data,
      imageUrl: data.imageUrl || undefined
    };

    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
            toast({ title: "Success", description: "Product updated successfully." });
            setIsProductDialogOpen(false);
          },
          onError: () => toast({ title: "Error", description: "Failed to update product.", variant: "destructive" })
        }
      );
    } else {
      createProduct.mutate(
        { data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
            toast({ title: "Success", description: "Product created successfully." });
            setIsProductDialogOpen(false);
          },
          onError: () => toast({ title: "Error", description: "Failed to create product.", variant: "destructive" })
        }
      );
    }
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteProduct.mutate(
      { id: deleteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
          toast({ title: "Success", description: "Product deleted successfully." });
          setDeleteId(null);
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to delete product. It may have existing orders.", variant: "destructive" });
          setDeleteId(null);
        }
      }
    );
  };

  if (isLoadingStats) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your software store inventory and view sales analytics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            queryClient.invalidateQueries();
            toast({ title: "Refreshed", description: "Dashboard data updated." });
          }}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button onClick={openCreateDialog} size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">All Orders</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{formatCurrency(stats?.totalRevenue || 0)}</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.totalOrders || 0}</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.totalProducts || 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-sm col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" /> Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.ordersByCategory && stats.ordersByCategory.length > 0 ? (
                  <div className="space-y-4">
                    {stats.ordersByCategory.map((cat, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-full flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{cat.category}</span>
                            <span className="text-sm font-medium">{formatCurrency(cat.revenue)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${Math.max(5, (cat.revenue / (stats.totalRevenue || 1)) * 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 text-right">{cat.count} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground py-8 text-center border rounded-md border-dashed">No sales data available yet.</p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" /> Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{order.productName}</p>
                          <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(order.productPrice)}</p>
                          <p className="text-xs text-muted-foreground">{format(new Date(order.createdAt), 'MMM d')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground py-8 text-center border rounded-md border-dashed">No recent orders.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PRODUCTS TAB */}
        <TabsContent value="products">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your software catalog</CardDescription>
              </div>
              <Button onClick={openCreateDialog} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingProducts ? (
                <div className="py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : products && products.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div>{product.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">ID: {product.id}</div>
                          </TableCell>
                          <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                          <TableCell>{formatCurrency(product.price)}</TableCell>
                          <TableCell className="font-mono text-xs">{product.version}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setDeleteId(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md border-dashed">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No products</h3>
                  <p className="text-muted-foreground mb-4">You haven't added any software products yet.</p>
                  <Button onClick={openCreateDialog}>Create your first product</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all historical purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="py-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : orders && orders.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <div>{order.customerName}</div>
                            <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                          </TableCell>
                          <TableCell>{order.productName}</TableCell>
                          <TableCell>{formatCurrency(order.productPrice)}</TableCell>
                          <TableCell>{format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={order.status === 'completed' ? 'text-success border-success/30' : ''}>
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md border-dashed">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-muted-foreground">When customers purchase your software, orders will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Create/Edit Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Update the details of your software product.' : 'Add a new software product to your catalog.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onProductSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Acme Studio Pro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input placeholder="e.g. Design" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="version" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl><Input placeholder="e.g. 2.0.4" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="downloadUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download URL</FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the software..." className="resize-none h-24" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <DialogFooter className="pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                  {(createProduct.isPending || updateProduct.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product. If this product has existing orders associated with it, deletion may fail or result in orphaned records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
