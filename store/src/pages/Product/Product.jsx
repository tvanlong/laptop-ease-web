import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Carousel, Spinner } from 'flowbite-react'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import cartApi from '@/apis/carts.api'
import productsApi from '@/apis/products.api'
import versionsApi from '@/apis/versions.api'
import Loading from '@/components/Loading'
import { AppContext } from '@/contexts/AppContext'
import { formatCurrency } from '@/utils/format'
import { generateNameId, getIdFromNameId } from '@/utils/util'
import ProductDetailModal from './ProductDetailModal'
import ImageGalleryModal from './ImageGalleryModal'
import { ComparisonContext } from '@/contexts/ComparisonContext'

function Product({ setProgress }) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const { addToComparison, removeFromComparison, isInComparison } = useContext(ComparisonContext)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const queryClient = useQueryClient()
  const { nameId } = useParams()
  const versionId = getIdFromNameId(nameId)
  const {
    data: versionData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['version', versionId],
    queryFn: () => versionsApi.getVersionById(versionId),
    enabled: !!versionId
  })
  const version = useMemo(() => versionData?.data?.data || {}, [versionData])
  const inComparison = useMemo(() => isInComparison(version._id), [isInComparison, version._id])

  const { data: productData } = useQuery({
    queryKey: ['product', version?.product?._id],
    queryFn: () => productsApi.getProductById(version?.product?._id),
    enabled: !!version?.product?._id
  })
  const product = useMemo(() => productData?.data?.data || {}, [productData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => cartApi.addToCart(profile?._id, data)
  })

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }

    if (version?.status === 'Hết hàng') {
      toast.warning('Sản phẩm đã hết hàng')
      return
    }

    toast.promise(mutateAsync({ versionId }), {
      loading: 'Đang thêm sản phẩm vào giỏ hàng...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', profile?._id] })
        return 'Thêm sản phẩm vào giỏ hàng thành công'
      },
      error: 'Thêm sản phẩm vào giỏ hàng thất bại'
    })
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

  if (isLoading || isFetching) return <Loading />

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6 overflow-hidden'>
      <Helmet>
        <title>
          [ Mới 100% ] {version?.product?.name} {version?.name}
        </title>
        <meta name='description' content={`[ Mới 100% ] ${version?.product?.name} ${version?.name}`} />
      </Helmet>
      <nav className='flex'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
              <svg
                className='mr-2.5 h-3 w-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
              </svg>
              Trang chủ
            </Link>
          </li>
          <li className='opacity-60'>
            <div className='flex items-center'>
              <svg
                className='mx-1 h-3 w-3 text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
              <Link
                to={`/product/${generateNameId({ name: version?.product?.name, id: version?.product?._id })}`}
                className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'
              >
                Sản phẩm
              </Link>
            </div>
          </li>
          <li className='opacity-60 hidden md:block'>
            <div className='flex items-center'>
              <svg
                className='mx-1 h-3 w-3 text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
              <Link
                to={`/product/${generateNameId({
                  name: version?.product?.name,
                  id: version?.product?._id
                })}`}
                className='ml-1 text-sm text-gray-500 md:ml-2 line-clamp-1'
              >
                [ Mới 100% ] {version?.product?.name} {version?.name}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className='mt-10 grid grid-cols-12 gap-8'>
        <div className='lg:col-span-6 md:col-span-5 col-span-12'>
          <div className="relative group">
            <Carousel
              className='lg:h-[30rem] h-[20rem]'
              indicators={false}
              theme={{
                control: {
                  base: 'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100',
                  icon: 'h-6 w-6 text-gray-800'
                }
              }}
            >
              {version?.product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${version.product.name} ${version.name}`}
                  className='h-full w-full object-cover'
                />
              ))}
            </Carousel>
          </div>
          <div className='mt-10 hidden md:flex justify-center gap-4'>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 cursor-pointer hover:border-green-600' onClick={() => setShowGalleryModal(true)}>
              <img className='w-4 h-4 lg:h-8 lg:w-8' src='https://laptopkhanhtran.vn/css/icon/images.svg' alt='' />
              <span className='text-xs'>Xem ảnh thực tế</span>
            </div>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 cursor-pointer hover:border-green-600' onClick={() => setShowDetailModal(true)}>
              <img
                className='w-4 h-4 lg:h-8 lg:w-8'
                src='https://laptopkhanhtran.vn/css/icon/configuration.svg'
                alt=''
              />
              <span className='text-xs' >Thông số kỹ thuật</span>
            </div>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 cursor-pointer hover:border-green-600' onClick={() => setShowDetailModal(true)}>
              <img className='w-4 h-4 lg:h-8 lg:w-8' src='https://laptopkhanhtran.vn/css/icon/article2.svg' alt='' />
              <span className='text-xs'>Thông tin sản phẩm</span>
            </div>
          </div>
          <div className='mt-10 hidden md:block rounded-lg bg-[#f4f4f4] py-6'>
            <div className='grid lg:grid-cols-2 gap-4'>
              <div className='flex items-center px-4'>
                <img className='w-8 h-8 lg:h-14 lg:w-14' src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Giao hàng toàn quốc</div>
                  <div className='text-xs'>Miễn phí giao hàng tại Hà Nội</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-8 h-8 lg:h-14 lg:w-14' src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Hỗ trợ trực tuyến</div>
                  <div className='text-xs'>Chúng tôi luôn hỗ trợ 24/7</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-8 h-8 lg:h-14 lg:w-14' src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Giá cả phải chăng</div>
                  <div className='text-xs'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-8 h-8 lg:h-14 lg:w-14' src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Chính sách hoàn tiền</div>
                  <div className='text-xs'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-6 md:col-span-7 col-span-12'>
          <h2 className='mb-5 lg:text-2xl md:text-xl font-bold'>
            [ Mới 100% ] {version?.product?.name} {version?.name}
          </h2>
          <div className='my-2 flex items-end gap-3'>
            <div className='text-xl lg:text-3xl font-bold text-red-500'>{formatCurrency(version?.current_price)} đ</div>
            <div className='lg:text-lg font-semibold text-gray-500 line-through'>
              {formatCurrency(version?.old_price)} đ
            </div>
          </div>
          <ol className='my-5 list-inside list-none space-y-1 text-gray-500'>
            {version?.description?.map((spec, index) => {
              const [key, value] = spec.split(':')
              return (
                <li key={index} className='text-sm'>
                  <span className='font-semibold text-gray-700'>{key}</span>
                  {value}
                </li>
              )
            })}
          </ol>
          <div className='flex'>
            <div
              className='text-sm text-green-700 underline cursor-pointer'
              onClick={() => setShowDetailModal(true)}
            >
              Xem chi tiết cấu hình
            </div>

            {/* Product Detail Modal */}
            <ProductDetailModal
              isOpen={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              data={version}
            />
            {/* Image Gallery Modal */}
            <ImageGalleryModal
              isOpen={showGalleryModal}
              onClose={() => setShowGalleryModal(false)}
              images={version?.product?.images}
              productName={version?.product?.name}
            />
            <div className='mx-3 border-r'></div>
            <div className='text-sm text-green-700 underline cursor-pointer' onClick={handleCompareClick}>{inComparison ? 'Bỏ so sánh' : 'So sánh'}</div>
          </div>
          <h3 className='my-5 text-xl font-semibold'>Tùy chọn cấu hình</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4'>
            {product?.versions?.map((version, index) => (
              <div
                key={version._id || index}
                className={`
                  group relative overflow-hidden border transition-all duration-300 ease-in-out
                  ${versionId === version._id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50/50 hover:shadow-lg'
              }
                `}
              >
                <Link
                  to={`/product/${generateNameId({
                    name: `${product.name} ${version.name}`,
                    id: version._id
                  })}`}
                  className='block p-3 sm:p-4 h-full'
                  aria-label={`Select ${version.name} version`}
                >
                  {versionId === version._id && (
                    <div className='absolute -top-1 -right-1 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-xl shadow-sm'>
                      Đang chọn
                    </div>
                  )}
                  <div className='mb-3 font-medium text-gray-800 text-sm line-clamp-2'>
                    {version?.name}
                  </div>
                  <div className='space-y-2'>
                    <div className='text-red-600 font-bold text-base sm:text-lg lg:text-xl'>
                      {formatCurrency(version.current_price)}
                      <span className='text-sm font-normal text-red-600 ml-1'>đ</span>
                    </div>
                    {version.old_price && version.old_price > version.current_price && (
                      <div className='flex items-center gap-2 flex-wrap'>
                        <div className='text-gray-500 text-xs sm:text-sm line-through'>
                          {formatCurrency(version.old_price)} đ
                        </div>
                        <div className='bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full'>
                          -{Math.round(((version.old_price - version.current_price) / version.old_price) * 100)}%
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`
                    absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 
                    transition-transform duration-300 ease-in-out
                    ${versionId === version._id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>
              </div>
            ))}
          </div>
          <ul className='mt-5 list-none rounded-lg bg-[#f4f4f4] px-5 py-6 text-sm'>
            <li className='py-2'>🎁Giảm tới 1.000.000VNĐ khi quý khách mua máy lần 2.</li>
            <li className='py-2'>🎁Tặng Windows bản quyền theo máy</li>
            <li className='py-2'>🎁Chế độ bảo hành 12 tháng lỗi 1 đổi 1</li>
            <li className='py-2'>🎁Tặng balo hoặc túi xách thời trang</li>
            <li className='py-2'>🎁Chuột quang không dây + bàn di chuột</li>
            <li className='py-2'>🎁Tặng gói cài đặt + vệ sinh, bảo dưỡng, trọn đời</li>
          </ul>
          <div className='mt-5'>
            <button
              disabled={isPending}
              className={
                isPending
                  ? 'w-full cursor-not-allowed rounded-lg bg-[#d62454] p-3 text-sm uppercase text-white transition duration-300 ease-in-out hover:bg-[#d62454]/90'
                  : 'w-full rounded-lg bg-[#d62454] p-3 text-sm uppercase text-white transition duration-300 ease-in-out hover:bg-[#d62454]/90'
              }
              onClick={handleAddToCart}
            >
              {isPending ? <Spinner size='sm' /> : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
