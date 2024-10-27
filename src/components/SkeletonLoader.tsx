const CardSkeleton = () => (
  <div className="w-full px-4">
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 h-full">
      <div className="animate-pulse">
        {/* Title */}
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"/>

        {/* Description lines */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded w-full"/>
          <div className="h-4 bg-gray-800 rounded w-5/6"/>
          <div className="h-4 bg-gray-800 rounded w-4/6"/>
        </div>

        {/* Read more link */}
        <div className="h-4 bg-gray-800 rounded w-24 mt-4"/>
      </div>
    </div>
  </div>
)

export const MultiplePostLoading = ({ rows = 3 }: { rows?: number }) => (
  <div className="min-h-screen">
    <div className="max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-end items-center py-12 px-4">
        <div className="h-6 bg-gray-800 rounded w-24 animate-pulse"/>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(rows)].map((_, index) => (
          <CardSkeleton key={index}/>
        ))}
      </div>
    </div>
  </div>
)
export const SinglePostLoading = () => (
  <div className="min-h-screen">
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          <div className="h-4 bg-gray-700 rounded w-3/6"></div>
        </div>
      </div>
    </div>
  </div>
)
