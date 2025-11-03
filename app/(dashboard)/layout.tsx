// app/(dashboard)/layout.tsx
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex text-sm">
      <aside className="w-60 shrink-0 border-r bg-white/60 dark:bg-black/20 backdrop-blur p-4 space-y-2">
        <div className="font-semibold">Admin Console</div>
        <nav className="space-y-1">
          <Link href="/dashboard" className="block px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10">Dashboard</Link>
          <Link href="/users" className="block px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10">Users</Link>
          <Link href="/audit-logs" className="block px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10">Audit logs</Link>
          <div className="pt-3 mt-3 border-t text-xs opacity-70">Auth</div>
          <Link href="/login" className="block px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10">Login</Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-between px-4">
          <span className="font-medium">Welcome</span>
          <div className="h-8 w-8 rounded-full bg-black/10 dark:bg-white/20" />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

