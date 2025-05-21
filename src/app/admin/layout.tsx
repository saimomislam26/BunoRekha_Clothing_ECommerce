
import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BunoRekha Admin',
  description: 'Admin Dashboard for BunoRekha Style Haus',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="sticky top-0 h-screen hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="text-xl">BunoRekha Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid items-start px-4 text-sm font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders (Placeholder)
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              >
                <Package className="h-4 w-4" />
                Products (Placeholder)
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              >
                <Users className="h-4 w-4" />
                Customers (Placeholder)
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
              >
                <Settings className="h-4 w-4" />
                Settings (Placeholder)
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col sm:pl-64"> {/* Adjust pl for sidebar width */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
          <div className="sm:hidden">
             {/* Placeholder for mobile menu trigger */}
          </div>
          <div className="ml-auto flex items-center gap-2">
             {/* Placeholder for user menu or actions */}
            <span className="text-sm text-muted-foreground">Admin User</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
        <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} BunoRekha Admin Panel
        </footer>
      </div>
    </div>
  );
}
