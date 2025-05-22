
import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'BunoRekha Admin',
  description: 'Admin Dashboard for BunoRekha Style Haus',
};

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

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
            <span className="text-xl">BunoRekha</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t">
            <Button variant="outline" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col sm:pl-64"> {/* Adjust pl for sidebar width */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-4 sm:py-4">
          <div className="sm:hidden">
             {/* Placeholder for mobile menu trigger */}
             <Button variant="outline" size="icon">
                <LayoutDashboard className="h-5 w-5" />
             </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
             {/* Placeholder for user menu or actions */}
            <span className="text-sm text-muted-foreground">Admin User</span>
             {/* You could add a dropdown menu for user profile/logout here */}
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-4 sm:py-4">
          {children}
        </main>
        <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground sm:px-4">
          © {new Date().getFullYear()} BunoRekha Admin Panel
        </footer>
      </div>
    </div>
  );
}
