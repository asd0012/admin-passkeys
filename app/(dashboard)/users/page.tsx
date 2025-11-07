'use client'
import { useQuery } from '@tanstack/react-query'
import UsersTable from '@/components/users-table'

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
    <UsersTable users={(data.items as User[]) ?? []} />
  </div>
)

}

