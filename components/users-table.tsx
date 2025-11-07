'use client'
import { useMemo, useState } from 'react'

type Role = 'admin' | 'editor' | 'viewer'
type User = {
  id: string
  name: string
  email: string
  role: Role
  status: 'active' | 'suspended'
  lastLoginAt?: string
}
type Props = { users: User[] }

export default function UsersTable({ users }: Props) {
  const [q, setQ] = useState('')
  const [sortKey, setSortKey] = useState<keyof User>('name')
  const [dir, setDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const data = useMemo(() => {
    const needle = q.toLowerCase().trim()
    let rows = users.filter(
      (u) =>
        !needle ||
        u.name.toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle)
    )
    rows = rows.sort((a, b) => {
      const A = a[sortKey]
      const B = b[sortKey]
      const val =
        sortKey === 'lastLoginAt'
          ? new Date((A as string) ?? 0).getTime() - new Date((B as string) ?? 0).getTime()
          : String(A ?? '').localeCompare(String(B ?? ''), undefined, { numeric: true })
      return dir === 'asc' ? val : -val
    })
    return rows
  }, [users, q, sortKey, dir])

  const total = data.length
  const maxPage = Math.max(1, Math.ceil(total / pageSize))
  const pageData = data.slice((page - 1) * pageSize, page * pageSize)

  function setSort(k: keyof User) {
    if (k === sortKey) setDir(dir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(k); setDir('asc') }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1) }}
          placeholder="Search name or email…"
          className="h-9 px-3 rounded border w-64"
        />
        <div className="text-xs opacity-70">{total} result{total!==1 && 's'}</div>
      </div>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="bg-black/5 dark:bg-white/10">
            <tr>
              <Th onClick={() => setSort('name')}        active={sortKey==='name'}        dir={dir}>Name</Th>
              <Th onClick={() => setSort('email')}       active={sortKey==='email'}       dir={dir}>Email</Th>
              <Th onClick={() => setSort('role')}        active={sortKey==='role'}        dir={dir}>Role</Th>
              <Th onClick={() => setSort('lastLoginAt')} active={sortKey==='lastLoginAt'} dir={dir}>Last login</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-3 py-2 font-medium">{u.name}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2 capitalize">{u.role}</td>
                <td className="px-3 py-2">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : '—'}
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs border ${u.status==='active' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr><td className="px-3 py-8 text-center opacity-60" colSpan={5}>No results</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="opacity-70">Page {page} / {maxPage}</div>
        <div className="flex gap-2">
          <button className="h-8 px-3 rounded border disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}>Prev</button>
          <button className="h-8 px-3 rounded border disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                  disabled={page === maxPage}>Next</button>
        </div>
      </div>
    </div>
  )
}

function Th({
  children, onClick, active, dir,
}: { children: React.ReactNode; onClick?: () => void; active?: boolean; dir?: 'asc'|'desc' }) {
  return (
    <th onClick={onClick}
        className={`px-3 py-2 text-left font-semibold select-none ${onClick ? 'cursor-pointer' : ''}`}
        title={onClick ? 'Click to sort' : undefined}>
      <span className="inline-flex items-center gap-1">
        {children}
        {active && <span className="text-xs opacity-70">{dir === 'asc' ? '▲' : '▼'}</span>}
      </span>
    </th>
  )
}
