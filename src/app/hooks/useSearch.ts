import { useMemo, useState } from 'react'

// Generic search hook — works for any array of objects.
// Searches across the given fields; arrays (e.g. techStack) are joined before matching.

export function useSearch<T extends object>(
  items: T[],
  searchFields: (keyof T)[],
) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return items

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field] as unknown
        if (Array.isArray(value)) {
          return value.some((v) => String(v).toLowerCase().includes(q))
        }
        return String(value ?? '')
          .toLowerCase()
          .includes(q)
      }),
    )
  }, [items, query, searchFields])

  return {
    query,
    setQuery,
    filtered,
    totalCount: items.length,
    resultCount: filtered.length,
  }
}
