import { useMemo } from 'react'
import { Advocate } from '../lib/types'

interface AdvocatesTableProps {
  advocates: Advocate[]
  isLoading: boolean
}

const MemoizedTableRow = ({ advocate }: { advocate: Advocate }) => {
  
  const formattedPhone = String(advocate.phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')

  return (
    <tr className="hover:bg-indigo-50 transition-colors border-b border-gray-100">
      <td className="font-medium py-5 px-6 text-gray-900">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-medium">
              {advocate.firstName[0]}{advocate.lastName[0]}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{`${advocate.firstName} ${advocate.lastName}`}</div>
            <div className="text-sm text-gray-500">{advocate.yearsOfExperience} years experience</div>
          </div>
        </div>
      </td>
      <td className="text-gray-600 py-5 px-6">
        <a href={`tel:${advocate.phoneNumber}`} className="hover:text-indigo-600 transition-colors">
          {formattedPhone}
        </a>
      </td>
      <td className="text-gray-600 py-5 px-6">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {advocate.city}
        </div>
      </td>
      <td className="py-5 px-6">
        <div className="flex gap-2 justify-end flex-wrap">
          {advocate.specialties.map((specialty) => (
            <span 
              key={specialty}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium whitespace-nowrap"
            >
              {specialty}
            </span>
          ))}
        </div>
      </td>
    </tr>
  )
}

export function AdvocatesTable({ advocates, isLoading }: AdvocatesTableProps) {
  const skeletonRows = useMemo(() => Array(5).fill(null), [])

  return (
    <div className="rounded-xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] lg:min-w-full w-full">
          <caption className="sr-only">Patient advocates directory</caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[30%] py-4 px-6 text-left text-sm font-semibold text-gray-900">Advocate</th>
              <th className="w-[25%] py-4 px-6 text-left text-sm font-semibold text-gray-900">Contact</th>
              <th className="w-[20%] py-4 px-6 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="w-[25%] py-4 px-6 text-right text-sm font-semibold text-gray-900">Specialties</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              skeletonRows.map((_, index) => (
                <tr 
                  key={index} 
                  className="animate-pulse"
                  aria-busy="true"
                  role="progressbar"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="ml-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex gap-2 justify-end">
                      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              advocates.map((advocate) => (
                <MemoizedTableRow key={advocate.id} advocate={advocate} />
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {!isLoading && advocates.length === 0 && (
        <div className="p-12 text-center bg-gray-50">
          <div className="mx-auto max-w-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No matches found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search filters or broadening your criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 