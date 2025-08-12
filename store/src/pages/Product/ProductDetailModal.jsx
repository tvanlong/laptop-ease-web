import { useState } from 'react'

const ProductDetailModal = ({ isOpen, onClose, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !data) return null
  const discountPercentage = Math.round(((data.old_price - data.current_price) / data.old_price) * 100)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Chi tiết sản phẩm</h2>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={data.product.images[currentImageIndex]}
                    alt={data.product.name}
                    className="w-full h-full object-contain"
                  />
                  {data.is_featured && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nổi bật
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {data.product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${data.product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {data.product.name}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Danh mục: {data.product.subcategory.name}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(data.current_price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(data.old_price)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      -{discountPercentage}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Tiết kiệm: {formatPrice(data.old_price - data.current_price)}
                  </p>
                </div>

                <div className="mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    data.status === 'Còn hàng'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {data.status}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Cấu hình chi tiết</h3>
                  <div className="space-y-2">
                    {data.description.map((spec, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Tên đầy đủ:</p>
                  <p className="text-gray-800 font-medium">{data.name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal