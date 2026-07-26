import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full relative">
      <Navbar />
      <main className="flex-1 w-full flex flex-col relative z-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
