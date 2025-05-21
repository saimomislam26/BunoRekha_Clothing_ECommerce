"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
  className?: string;
};

const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href.toString()));

  return (
    <Link
      href={href}
      className={cn(
        "text-md font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-foreground/80",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
