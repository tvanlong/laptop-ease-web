import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import versionsApi from '@/apis/versions.api'
import { useContext } from 'react'
import { formatCurrency } from '@/utils/format'
import { generateNameId } from '@/utils/util'
import { ComparisonContext } from '@/contexts/ComparisonContext'

function ProductItem({ version, isHover = false }) {
  const { addToComparison, removeFromComparison, isInComparison } = useContext(ComparisonContext)
  const inComparison = isInComparison(version._id)
  const queryClient = useQueryClient()
  const detailQuery = { queryKey: ['version', version._id], queryFn: () => versionsApi.getVersionById(version._id) }

  const handlePrefetchOnHover = () => {
    queryClient.prefetchQuery(detailQuery)
  }

  const handleCompareClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (inComparison) {
      removeFromComparison(version._id)
    } else {
      addToComparison({
        _id: version._id,
        name: `${version.product.name} (${version.name})`,
        image: version.product.images[0],
        current_price: version.current_price,
        old_price: version.old_price,
        description: version.description,
        product: version.product,
        version: version.name
      })
    }
  }

  return (
    <div
      className={
        'rounded-lg bg-white p-4 sm:p-6 shadow-sm' +
        (isHover
          ? ' transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:outline hover:outline-1 hover:outline-teal-500'
          : '')
      }
      onMouseEnter={handlePrefetchOnHover}
    >
      <Link
        to={`/product/${generateNameId({
          name: `${version.product.name} ${version.name}`,
          id: version._id
        })}`}
      >
        <img
          src={version.product.images[0]}
          alt={`${version.product.name} ${version.name}`}
          className='rounded-lg h-28 w-full object-contain'
        />
        <div className='my-2 line-clamp-2 text-sm font-bold'>
          {version?.product.name} ({version?.name})
        </div>
        <ol className='my-2 max-w-md list-inside list-none space-y-1 text-gray-500'>
          {version?.description.map((spec) => {
            const [key, value] = spec.split(':')
            return (
              <li key={key} className='truncate text-xs'>
                <span className='font-semibold text-gray-900'>{key} </span>
                {value}
              </li>
            )
          })}
        </ol>
        <div className='my-2 flex justify-between text-xs 2xl:text-sm'>
          <div className='font-bold text-red-700'>{formatCurrency(version.current_price)} đ</div>
          <div className='font-bold text-gray-500 line-through'>{formatCurrency(version.old_price)} đ</div>
          <div className='font-bold text-red-700'>
            -{Math.round(((version.old_price - version.current_price) / version.old_price) * 100)}%
          </div>
        </div>
        <div className='flex hover:underline' onClick={handleCompareClick}>
          <img src='https://laptopkhanhtran.vn/css/icon/arrange-square.svg' alt='' className='mr-2' />
          <span className='text-sm'>{inComparison ? 'Bỏ so sánh' : 'So sánh'}</span>
        </div>
      </Link>
    </div>
  )
}

ProductItem.propTypes = {
  version: PropTypes.object.isRequired,
  isHover: PropTypes.bool
}

export default ProductItem
