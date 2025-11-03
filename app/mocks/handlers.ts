import { http, HttpResponse } from 'msw'

type Role = 'admin'|'editor'|'viewer'
type User = { id: string; name: string; email: string; role: Role; status: 'active'|'suspended'; lastLoginAt?: string }

const users: User[] = Array.from({ length: 8 }, (_, i) => ({
  id: `u${i+1}`,
  name: `User ${i+1}`,
  email: `user${i+1}@example.com`,
  role: i%3===0 ? 'admin' : i%3===1 ? 'editor' : 'viewer',
  status: 'active',
  lastLoginAt: new Date(Date.now()-i*86400000).toISOString(),
}))

export const handlers = [
  http.get('/api/users', () => HttpResponse.json({ items: users })),
]

