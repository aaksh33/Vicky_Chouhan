import { User, Package, Mail, Calendar, LogOut, ShoppingBag } from 'lucide-react'

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Profile Header */}
        <div className="bg-white sm:rounded-lg sm:shadow-sm sm:border border-gray-200 p-3 sm:p-6 mb-3 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 text-center sm:text-left min-w-0 w-full">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-32 sm:w-48 mb-2 mx-auto sm:mx-0 animate-pulse" />
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-40 sm:w-56 animate-pulse" />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-40 animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2 justify-center w-full sm:w-auto">
              <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium opacity-50 cursor-not-allowed">
                <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Orders</span>
              </button>
              <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium opacity-50 cursor-not-allowed">
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white sm:rounded-lg sm:shadow-sm sm:border border-gray-200 p-3 sm:p-6">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200">Personal Information</h2>
            <div className="space-y-3 sm:space-y-4">
              {['Full Name', 'Email', 'Phone', 'Address'].map((label) => (
                <div key={label}>
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">{label}</label>
                    {(label === 'Phone' || label === 'Address') && (
                      <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
                    )}
                  </div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-full sm:w-3/4 mt-1 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white sm:rounded-lg sm:shadow-sm sm:border border-gray-200 p-3 sm:p-6">
            <div className='flex justify-between items-center mb-3 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200'>
              <h2 className="text-sm sm:text-lg font-semibold text-gray-900">Recent Orders</h2>
              <span className='text-[10px] sm:text-sm font-medium text-blue-600'>View All</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-2 sm:p-3 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 mb-1.5 sm:mb-2" />
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-20 sm:w-28" />
                    </div>
                    <div className="text-right ml-2">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 mb-1.5 sm:mb-2 ml-auto" />
                      <div className="h-4 sm:h-5 bg-gray-200 rounded w-16 sm:w-20 ml-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
