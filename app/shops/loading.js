// app/shops/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-6">
              <div className="bg-gray-200 p-4 rounded-lg h-12 w-12"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 grid grid-cols-2 gap-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"></div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}