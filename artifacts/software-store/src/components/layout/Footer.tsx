import { Link } from 'wouter';
import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Package className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight">SoftStore</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Premium digital software marketplace. Instant delivery, secure licensing, and professional tools for modern workflows.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Catalog</Link></li>
              <li><Link href="/orders/lookup" className="hover:text-primary transition-colors">Order Lookup</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} SoftStore Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
