'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const p = usePathname();
  const at = (path: string) => p === path || p.startsWith(path + '/');
  return (
    <nav>
      <Link href="/" className="nav-logo">
        <img src="/logo.png" alt="Ranked" className="nav-logo-img" />
        <span className="nav-logo-text">Ranked</span>
      </Link>
      <div className="nav-links">
        <Link className={`nav-link${at('/rank') ? ' active' : ''}`} href="/rank">Rank</Link>
        <Link className={`nav-link${at('/lists') ? ' active' : ''}`} href="/lists">Discover</Link>
        <Link className={`nav-link${at('/profile') ? ' active' : ''}`} href="/profile">Profile</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/signin" className="nav-cta-ghost">Sign in</Link>
        <Link href="/signup" className="nav-cta">Sign up</Link>
      </div>
    </nav>
  );
}
