'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type Props = LinkProps & { children: React.ReactNode; exact?: boolean; className?: string; activeClassName?: string };

export default function ActiveLink({
  href,
  children,
  exact = false,
  className = '',
  activeClassName = 'text-green-400',
  ...rest
}: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(String(href));
  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : 'text-white/80 hover:text-white'}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
