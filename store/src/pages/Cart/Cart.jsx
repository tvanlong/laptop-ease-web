import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import cartApi from '@/apis/carts.api'
import Loading from '@/components/Loading'
import { path } from '@/constants/path'
import { AppContext } from '@/contexts/AppContext'
import { useCart } from '@/hooks/useCart'
import InputQuantity from '@/pages/Cart/components/InputQuantity'
import { formatCurrency } from '@/utils/format'
import { generateNameId } from '@/utils/util'

function Cart({ setProgress }) {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: cartData, isLoading, refetch } = useCart()
  const cart = useMemo(() => cartData?.data?.data, [cartData])
  const totalAmount = useMemo(
    () => cart?.cart_items?.map((item) => item.version.current_price * item.quantity).reduce((a, b) => a + b, 0),
    [cart]
  )

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync: removeItemAsync } = useMutation({
    mutationFn: (data) => cartApi.removeItem(profile?._id, data),
    onSuccess: () => refetch()
  })

  const { mutateAsync: removeCartAsync } = useMutation({
    mutationFn: () => cartApi.removeCart(profile?._id)
  })

  const handleRemoveItem = async (id) => {
    toast.promise(removeItemAsync({ versionId: id }), {
      loading: 'Đang xóa sản phẩm khỏi giỏ hàng...',
      success: () => 'Xóa sản phẩm thành công',
      error: 'Xóa sản phẩm thất bại'
    })
  }

  const refreshCart = () => {
    if (!cart?.cart_items?.length) return toast.error('Giỏ hàng trống')
    refetch()
  }

  const handleRemoveCart = async () => {
    if (!cart?.cart_items?.length) return toast.error('Giỏ hàng trống')
    toast.promise(removeCartAsync(), {
      loading: 'Đang xóa tiến hành xóa giỏ hàng...',
      success: () => {
        window.location.reload()
        return 'Xóa giỏ hàng thành công'
      },
      error: 'Xóa thất bại'
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6 overflow-hidden'>
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name='description' content='Giỏ hàng' />
      </Helmet>
      <nav className='flex' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link
              to={path.home}
              className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'
            >
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
            <Link to={path.cart} className='flex items-center'>
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
              <span className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'>Giỏ hàng</span>
            </Link>
          </li>
        </ol>
      </nav>
      <h2 className='my-5 text-xl xl:text-2xl font-bold'>Giỏ hàng</h2>
      {/* Desktop */}
      <div className='xl:grid xl:grid-cols-12 gap-8'>
        <div className='xl:col-span-9'>
          <div className='relative shadow-lg sm:rounded-lg'>
            <table className='hidden md:table w-full text-left text-sm text-gray-500'>
              <thead className='bg-[#f4f4f4] text-xs uppercase text-gray-700'>
                <tr>
                  <th scope='col' className='p-4'></th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Sản phẩm
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold hidden xl:table-cell'>
                    Đơn giá
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Số lượng
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.cart_items?.map((item) => (
                  <tr key={item._id} className='border-b bg-white hover:bg-gray-50'>
                    <td className='cursor-pointer p-4 text-center font-bold'>
                      <button onClick={() => handleRemoveItem(item.version._id)}>
                        <svg
                          className='h-6 w-6 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-red-500'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fillRule='evenodd'
                            d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </td>
                    <td className='flex items-center px-6 py-4 font-medium text-gray-900'>
                      <img
                        className='mr-3 h-14 w-14 rounded-lg border border-gray-300 object-cover'
                        src={item.version.product.images[0]}
                        alt={`${item.version.product.name} ${item.version.name}`}
                      />
                      <Link
                        to={`/product/${generateNameId({
                          name: `${item.version.product.name} ${item.version.name}`,
                          id: item.version._id
                        })}`}
                        className='font-semibold text-xs xl:text-sm'
                      >
                        [Mới 100%] {item.version.product.name} ({item.version.name})
                      </Link>
                    </td>
                    <td className='px-6 py-4 text-center font-bold hidden xl:table-cell'>
                      ₫{formatCurrency(item.version.current_price)}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <InputQuantity item={item} />
                    </td>
                    <td className='px-6 py-4 text-center font-bold text-[#d62454]'>
                      ₫{formatCurrency(item.version.current_price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='md:hidden px-3'>
              {cart?.cart_items?.map((item) => (
                <div key={item._id} className='flex items-center border-b py-4 gap-3'>
                  <div className='flex items-center gap-3'>
                    <img
                      className='h-14 w-14 rounded-lg border border-gray-300 object-cover'
                      src={item.version.product.images[0]}
                      alt={`${item.version.product.name} ${item.version.name}`}
                    />
                    <div>
                      <Link
                        to={`/product/${generateNameId({
                          name: `${item.version.product.name} ${item.version.name}`,
                          id: item.version._id
                        })}`}
                        className='font-semibold text-xs xl:text-sm line-clamp-1'
                      >
                        [Mới 100%] {item.version.product.name} ({item.version.name})
                      </Link>
                      <div className='text-xs text-gray-500'>
                        Đơn giá: ₫{formatCurrency(item.version.current_price)}
                      </div>
                      <div className='text-xs text-gray-500'>
                        Tổng: ₫{formatCurrency(item.version.current_price * item.quantity)}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 ml-auto'>
                    <InputQuantity item={item} />
                    <button onClick={() => handleRemoveItem(item.version._id)}>
                      <svg
                        className='h-4 w-4 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-red-500'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fillRule='evenodd'
                          d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Empty cart */}
            {!cart?.cart_items?.length && (
              <div className='flex h-80 items-center justify-center'>
                <div className='text-center'>
                  <h3 className='my-5 text-2xl font-semibold'>Giỏ hàng trống</h3>
                  <Link to={path.home} className='text-sm font-semibold hover:underline'>
                    Tiếp tục mua hàng
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className='mt-5 flex justify-end gap-5'>
            <div
              className='mr-4 cursor-pointer text-xs md:text-sm font-semibold hover:underline'
              onClick={handleRemoveCart}
            >
              Xóa toàn bộ sản phẩm
            </div>
            <Link to={path.home} className='text-xs md:text-sm font-semibold hover:underline'>
              Tiếp tục mua hàng
            </Link>
          </div>
          {cart?.cart_items?.length > 0 && (
            <button
              className='hidden xl:block rounded-lg bg-yellow-400 px-3 py-2 text-white hover:bg-yellow-300'
              onClick={refreshCart}
            >
              Cập nhật giỏ hàng
            </button>
          )}
        </div>
        <div className='hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3'>
          <div className='sticky top-20 bg-white shadow-lg border border-gray-100 p-4 sm:p-6'>
            <h3 className='mb-6 text-lg sm:text-xl font-bold text-gray-800'>
              Thông tin đơn hàng
            </h3>
            <div className='space-y-4 mb-6'>
              <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                <span className='text-sm text-gray-600'>Tạm tính:</span>
                <span className='font-medium text-gray-800'>
                  ₫{totalAmount ? formatCurrency(totalAmount) : 0}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-base font-semibold text-gray-800'>
                  Tổng thanh toán:
                </span>
                <span className='text-xl sm:text-2xl font-bold text-[#d62454]'>
                  ₫{totalAmount ? formatCurrency(totalAmount) : 0}
                </span>
              </div>
            </div>
            <button
              className='w-full rounded-xl bg-[#e00] p-4
                 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl
                 active:scale-[0.98] cursor-pointer'
              onClick={() => {
                if (cart?.length === 0 || cart?.cart_items?.length === 0) {
                  return toast.warning('Vui lòng chọn sản phẩm trước khi mua hàng')
                }
                navigate(path.checkout)
              }}
            >
              <div className='flex flex-col items-center space-y-1'>
                <span className='text-base font-bold uppercase text-white'>
                  Mua ngay
                </span>
                <span className='text-xs text-white/90'>
                  Giao hàng tận nơi hoặc nhận tại cửa hàng
                </span>
              </div>
            </button>
            <div className='mt-6 space-y-3'>
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <svg className='w-5 h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <span>Miễn phí vận chuyển đơn từ 500k</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <svg className='w-5 h-5 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span>Giao hàng nhanh trong 2-3 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className='lg:hidden fixed bottom-0 inset-x-0 z-50'>
        <div className='absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-black/5 to-transparent pointer-events-none'></div>
        <div className='bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]'>
          <div className='px-4 py-3 pb-safe'>
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-500'>Tổng cộng</span>
                <span className='text-xs text-gray-400'>({cart?.cart_items?.length || 0} sản phẩm)</span>
              </div>
              <div className='text-right'>
                <span className='text-lg font-bold text-[#d62454]'>
                  ₫{totalAmount ? formatCurrency(totalAmount) : 0}
                </span>
              </div>
            </div>
            <button
              className='w-full bg-gradient-to-r from-[#e00] to-[#d62454] rounded-xl py-3.5 px-6
                   transform transition-all duration-200 active:scale-[0.98]
                   disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500
                   shadow-lg shadow-red-500/25'
              onClick={() => {
                if (cart?.cart_items?.length === 0) {
                  return toast.warning('Vui lòng chọn sản phẩm trước khi mua hàng')
                }
                navigate(path.checkout)
              }}
            >
              <div className='flex items-center justify-center gap-3'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
                <span className='text-base font-bold text-white'>
                  Mua ngay
                </span>
              </div>
            </button>

            {totalAmount < 500000 && (
              <div className='mt-2 text-center'>
                <span className='text-xs text-gray-500'>
                  Mua thêm ₫{formatCurrency(500000 - totalAmount)} để được freeship
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
