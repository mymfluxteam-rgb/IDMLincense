import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import { Shell } from '@/components/layout/Shell';

// Pages
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import OrderLookup from '@/pages/OrderLookup';
import OrderConfirmation from '@/pages/OrderConfirmation';
import AdminDashboard from '@/pages/AdminDashboard';

const queryClient = new QueryClient();

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Catalog} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/orders/lookup" component={OrderLookup} />
        <Route path="/orders/:id" component={OrderConfirmation} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
