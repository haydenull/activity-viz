import type { MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import { Package2 } from 'lucide-react'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix SPA' }, { name: 'description', content: 'Welcome to Remix (SPA Mode)!' }]
}

export default function Index() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link to="/" className="text-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
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
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
