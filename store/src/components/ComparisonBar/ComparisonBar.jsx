import { useContext, useState } from 'react'
import { X, Plus, Eye, Trash2, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'
import { ComparisonContext } from '@/contexts/ComparisonContext'
import { Link } from 'react-router-dom'

const ComparisonBar = () => {
  const { comparisonItems, removeFromComparison, clearComparison, showComparison, setShowComparison } = useContext(ComparisonContext)
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (comparisonItems.length === 0) return null

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="fixed bottom-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setShowComparison(true)}
          className="bg-black text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="relative">
            <ArrowUpDown className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {comparisonItems.length}
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Comparison Modal */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
        showComparison ? 'visible' : 'invisible'
      }`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            showComparison ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setShowComparison(false)}
        />
        <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 transform ${
          showComparison ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-gray-800 text-lg">So sánh sản phẩm</h3>
                <span className="bg-gradient-to-r from-black-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {comparisonItems.length}/4
                </span>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 max-h-[50vh] overflow-y-auto">
              {comparisonItems.map((item, index) => (
                <div
                  key={item._id}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 hover:border-black-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <button
                    onClick={() => removeFromComparison(item._id)}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute top-2 left-2 bg-black-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold z-10">
                    {index + 1}
                  </div>
                  <div className="relative mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain mx-auto"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'
                      }}
                    />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xs font-medium text-center line-clamp-2 mb-2 text-gray-800">
                      {item.name}
                    </h4>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-bold text-red-600">
                        {new Intl.NumberFormat('vi-VN').format(item.current_price)} đ
                      </p>
                      {item.old_price && item.old_price > item.current_price && (
                        <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-semibold inline-block">
                          -{Math.round(((item.old_price - item.current_price) / item.old_price) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {Array.from({ length: Math.max(0, 4 - comparisonItems.length) }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-gray-400 min-h-[140px]"
                >
                  <Plus className="w-6 h-6 mb-2" />
                  <span className="text-xs text-center font-medium">
                    <span className="block">Thêm sản phẩm</span>
                    <span className="block">để so sánh</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearComparison}
                className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa tất cả
              </button>
              {comparisonItems.length >= 2 && (
                <Link
                  to="/comparison"
                  onClick={() => setShowComparison(false)}
                  className="flex-1 bg-black text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  SO SÁNH
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Comparison Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transition-all duration-500 ease-in-out transform hidden md:block ${
        isCollapsed ? 'translate-y-[100%]' : 'translate-y-0'
      }`}>
        <div className="h-10"></div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-t-lg px-4 py-2 shadow-lg border-t border-x border-gray-200 hover:bg-gray-50 transition-colors duration-200 group"
        >
          <div className="flex items-center space-x-2">
            {isCollapsed ? (
              <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-black-600 transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-black-600 transition-colors" />
            )}
            <span className="text-sm font-medium text-gray-700 group-hover:text-black-600 transition-colors">
              So sánh ({comparisonItems.length})
            </span>
          </div>
        </button>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-black-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-gray-800 text-lg">
                  So sánh sản phẩm
                </h3>
                <span className="bg-gradient-to-r from-black-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {comparisonItems.length}/4
                </span>
              </div>

              <button
                onClick={clearComparison}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium flex items-center px-2 py-1 rounded-md transition-all duration-200 group"
              >
                <Trash2 className="w-4 h-4 mr-1 group-hover:animate-bounce" />
                <span className="hidden sm:inline">Xóa tất cả</span>
                <span className="sm:hidden">Xóa</span>
              </button>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {comparisonItems.length >= 2 && (
                <Link
                  to="/comparison"
                  className="flex-1 sm:flex-none bg-black text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform group"
                >
                  <Eye className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  <span className="text-sm">SO SÁNH</span>
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
            {comparisonItems.map((item, index) => (
              <div
                key={item._id}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 lg:p-4 border border-gray-200 hover:border-black-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => removeFromComparison(item._id)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 hover:scale-100 z-10"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute top-2 left-2 bg-black-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold z-10">
                  {index + 1}
                </div>
                <div className="relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h4 className="text-xs lg:text-sm font-medium text-center line-clamp-2 mb-2 text-gray-800 group-hover:text-black-700 transition-colors">
                    {item.name}
                  </h4>
                  <div className="text-center space-y-1">
                    <p className="text-sm lg:text-base font-bold text-red-600">
                      {new Intl.NumberFormat('vi-VN').format(item.current_price)} đ
                    </p>
                    {item.old_price && item.old_price > item.current_price && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xs text-gray-500 line-through">
                          {new Intl.NumberFormat('vi-VN').format(item.old_price)} đ
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                          -{Math.round(((item.old_price - item.current_price) / item.old_price) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}

            {Array.from({ length: Math.max(0, 4 - comparisonItems.length) }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="border-2 border-dashed border-gray-300 rounded-xl p-3 lg:p-4 flex flex-col items-center justify-center text-gray-400 hover:border-black-400 hover:text-black-500 hover:bg-black-50 transition-all duration-300 min-h-[140px] lg:min-h-[160px] group cursor-pointer"
              >
                <Plus className="w-6 h-6 lg:w-8 lg:h-8 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs lg:text-sm text-center font-medium">
                  <span className="block">Thêm sản phẩm</span>
                  <span className="block">để so sánh</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ComparisonBar