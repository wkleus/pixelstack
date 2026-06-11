'use client'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  resultCount: number
  totalCount: number
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  resultCount,
  totalCount,
}: SearchBarProps) => {
  const isFiltered = value.trim().length > 0

  return (
    <div className="mx-auto mb-10 max-w-xl">
      <div className="relative flex items-center">
        <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="dark:bg-dark w-full rounded-full border border-gray-300 bg-white py-2.5 pr-10 pl-10 text-sm placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none dark:border-gray-700"
        />
        {isFiltered && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {isFiltered && (
        <p className="mt-2 text-center text-xs text-gray-400">
          {resultCount === 0
            ? 'No results found.'
            : `${resultCount} of ${totalCount} results`}
        </p>
      )}
    </div>
  )
}

export default SearchBar
