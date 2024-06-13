import type { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link, useLocation } from '@remix-run/react'
import { Package2 } from 'lucide-react'

import { cn } from './lib/utils'
import styles from './root.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const NavItem = ({ to, children, curPathname }: { to: string; children: React.ReactNode; curPathname: string }) => {
  return (
    <Link
      to={to}
      className={cn(
        'transition-colors hover:text-foreground',
        curPathname === to ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      {children}
    </Link>
  )
}
export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <NavItem to="/dashboard" curPathname={location.pathname}>
            Dashboard
          </NavItem>
          <NavItem to="/settings" curPathname={location.pathname}>
            Settings
          </NavItem>

          {/* <Link to="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
            Settings
          </Link>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Customers
          </Link>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Analytics
          </Link> */}
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
