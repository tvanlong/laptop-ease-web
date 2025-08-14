import { formatCurrency } from '@/utils/format'
import { generateNameId } from '@/utils/util'
import { Link } from 'react-router-dom'

const ProductCards = ({ products }) => {
  return (
    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
      {products.map((version, index) => (
        <Link
          key={version._id || index}
          to={`/product/${generateNameId({
            name: `${version.product?.name || ''} ${version.name}`,
            id: version._id
          })}`}
          className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-100 transition-colors"
        >
          <img
            src={version.product.images[0]}
            alt={`${version.product.name} ${version.name}`}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-700 truncate">{version?.product.name} ({version?.name})</p>
            <p className="text-xs font-semibold text-red-600">
              {formatCurrency(version.current_price)} đ
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductCards