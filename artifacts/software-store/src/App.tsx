import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import NotFound from '@/pages/not-found';
import { Shell } from '@/components/layout/Shell';
import { GeoProvider } from '@/context/GeoContext';

// Pages
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import OrderLicense from '@/pages/OrderLicense';
import HowToPurchase from '@/pages/HowToPurchase';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

/** Use hash routing for GitHub Pages static hosting; path routing on Replit */
const USE_HASH = import.meta.env.VITE_USE_HASH_ROUTER === 'true';

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/order-license" component={OrderLicense} />
        <Route path="/how-to-purchase" component={HowToPurchase} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <GeoProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {USE_HASH ? (
            <WouterRouter hook={useHashLocation}>
              <Router />
            </WouterRouter>
          ) : (
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
          )}
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </GeoProvider>
  );
}

export default App;
