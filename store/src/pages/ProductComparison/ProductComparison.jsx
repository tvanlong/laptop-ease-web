import { useContext } from 'react'
import { X, ShoppingCart, ArrowLeft } from 'lucide-react'
import { ComparisonContext } from '@/contexts/ComparisonContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ProductComparison = () => {
  const { comparisonItems, removeFromComparison, clearComparison } = useContext(ComparisonContext)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const calculateDiscount = (oldPrice, currentPrice) => {
    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
  }

  const getSpecValue = (description, specType) => {
    const spec = description.find(desc => desc.toLowerCase().includes(specType.toLowerCase()))
    return spec ? spec.split(':')[1]?.trim() : '-'
  }

  const specTypes = ['CPU', 'RAM', 'Ổ cứng', 'Màn hình', 'VGA', 'Pin', 'Tình trạng']

  const getLowestPriceProduct = () => {
    if (comparisonItems.length === 0) return null
    return comparisonItems.reduce((min, product) =>
      product.current_price < min.current_price ? product : min
    )
  }

  const lowestPriceProduct = getLowestPriceProduct()

  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>
          So sánh sản phẩm
        </title>
        <meta name='description' content='So sánh sản phẩm' />
      </Helmet>
      <div className="mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">So sánh sản phẩm</h1>
            { comparisonItems.length > 0 && <p className="text-gray-600 mt-1">Đang so sánh {comparisonItems.length} sản phẩm</p>}
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link
              to="/product-list"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover: transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
            {comparisonItems.length > 0 && (
              <button
                onClick={clearComparison}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Xóa tất cả
              </button>
            )}
          </div>
        </div>

        {comparisonItems.length >= 2 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bảng so sánh chi tiết</h2>
                <span className="text-sm text-gray-600">
                  {comparisonItems.length}/4 sản phẩm
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-700  sticky left-0 z-10 min-w-[150px]">
                      Thông tin
                    </th>
                    {comparisonItems.map((product) => (
                      <th key={product._id} className="p-4 text-center min-w-[200px] relative group">
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromComparison(product._id)
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10 opacity-0 group-hover:opacity-100 sm:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <img
                              src={product.product.images[0]}
                              alt={product.product.name}
                              className="w-32 h-32 object-cover rounded-md mb-2 mx-auto"
                            />
                            {product._id === lowestPriceProduct?._id && (
                              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                Giá tốt nhất
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900 line-clamp-2">{product.product.name}</h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover: transition-colors">
                    <td className="p-4 font-medium text-gray-700 sticky left-0">Giá hiện tại</td>
                    {comparisonItems.map((product) => {
                      const discount = calculateDiscount(product.old_price, product.current_price)
                      return (
                        <td key={product._id} className="p-4 text-center">
                          <p className={`text-xl font-bold ${
                            product._id === lowestPriceProduct?._id ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {formatPrice(product.current_price)}
                          </p>
                          {discount > 0 && (
                            <>
                              <p className="text-sm text-gray-500 line-through">{formatPrice(product.old_price)}</p>
                              <p className="text-sm text-green-600">
                                Tiết kiệm {discount}%
                              </p>
                            </>
                          )}
                        </td>
                      )
                    })}
                  </tr>

                  <tr className="border-b bg-white">
                    <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Đánh giá</td>
                    {comparisonItems.map((product) => (
                      <td key={product._id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {specTypes.map((specType, index) => (
                    <tr key={specType} className={`border-b ${index % 2 === 0 ? '' : 'bg-white'}`}>
                      <td className={`p-4 font-medium text-gray-700 sticky left-0 ${index % 2 === 0 ? '' : 'bg-white'}`}>
                        {specType}
                      </td>
                      {comparisonItems.map((product) => {
                        const value = getSpecValue(product.description, specType)
                        return (
                          <td key={product._id} className="p-4 text-center text-gray-600">
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-md text-sm">
                              {value}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}

                  <tr className="border-t-2 ">
                    <td className="p-4 sticky left-0 "></td>
                    {comparisonItems.map((product) => (
                      <td key={product._id} className="p-4 text-center">
                        <div className="border border-gray-300 rounded-md hover:bg-blue-500 transition-colors overflow-hidden group">
                          <Link
                            to={`/product/${product._id}`}
                            className="block w-full text-gray-700 px-4 py-2 text-center group-hover:text-white"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {comparisonItems.length < 2 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">
                Vui lòng chọn ít nhất 2 sản phẩm để so sánh
              </p>
              { comparisonItems.length > 0 && <p className="text-gray-400 text-sm mb-6">
                Bạn đã chọn {comparisonItems.length}/4 sản phẩm
              </p>}
              <Link
                to="/product-list"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Chọn sản phẩm
              </Link>
            </div>
          </div>
        )}

        {comparisonItems.length > 0 && comparisonItems.length < 2 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 Mẹo: Thêm ít nhất {2 - comparisonItems.length} sản phẩm nữa để bắt đầu so sánh
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductComparison