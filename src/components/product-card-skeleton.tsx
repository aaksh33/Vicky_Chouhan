export default function ProductCardSkeleton() {
  return (
    <div className="bg-gray-50 border sm:rounded-sm transition-shadow duration-200 flex flex-col sm:mt-1 relative overflow-hidden">
      {/* Image skeleton - matches aspect-[4/3] */}
      <div className="relative aspect-[4/3] bg-white p-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <div className="w-full h-full bg-gray-200 shimmer rounded"></div>
        </div>
      </div>
      
      {/* Content skeleton - matches p-4 structure */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title skeleton - matches h3 with line-clamp-2 */}
        <div className="flex justify-between items-start sm:mb-2">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 shimmer rounded mb-1"></div>
            <div className="h-4 bg-gray-200 shimmer rounded w-3/4"></div>
          </div>
          <div className="ml-2 w-6 h-6 bg-gray-200 shimmer rounded-full"></div>
        </div>
        
        {/* Description skeleton - matches p with line-clamp-2 */}
        <div className="mb-2">
          <div className="h-3 bg-gray-200 shimmer rounded mb-1"></div>
          <div className="h-3 bg-gray-200 shimmer rounded w-5/6"></div>
        </div>
        
        {/* Price section skeleton */}
        <div className="mb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-baseline sm:gap-2 sm:mb-1">
            <div className="h-6 bg-gray-200 shimmer rounded w-20"></div>
            <div className="flex space-x-2">
              <div className="h-3 bg-gray-200 shimmer rounded w-12"></div>
              <div className="h-3 bg-gray-200 shimmer rounded w-10"></div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="h-3 bg-gray-200 shimmer rounded w-16"></div>
            <div className="h-3 bg-gray-200 shimmer rounded w-8"></div>
          </div>
        </div>
        
        {/* Buy now link skeleton */}
        <div className="h-4 bg-gray-200 shimmer rounded w-16"></div>
      </div>
    </div>
  )
}