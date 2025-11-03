'use client'
import { useQuery } from '@tanstack/react-query'

type Role = 'admin'|'editor'|'viewer'
type User = { id: string; name: string; email: string; role: Role; status: 'active'|'suspended'; lastLoginAt?: string }

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await fetch('/api/users')).json(),
  })
  if (isLoading) return <div>Loading users…</div>
  if (error) return <div>Failed to load users.</div>

  return (
    <div className="space-y-3">
      <h2 className="font-medium">Users</h2>
      <ul className="space-y-2">
        {data.items.map((u: User) => (
          <li key={u.id} className="border rounded px-3 py-2">
            <div className="font-medium">{u.name} <span className="text-xs opacity-70">({u.role})</span></div>
            <div className="text-xs opacity-70">{u.email}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

