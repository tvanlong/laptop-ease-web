import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import versionsApi from '~/apis/versions.api'
import Loading from '~/components/Loading'
import ProductItem from '~/components/ProductItem'
import { useVersions } from '~/hooks/useVersions'
import Banner from '~/pages/Home/components/Banner'
import SlickSlider from '~/pages/Home/components/SlickSlider'
import CountdownTimer from './components/CountdownTimer'

function Home({ setProgress }) {
  const { data, isLoading } = useVersions()
  const versions = useMemo(() => data?.data?.data?.docs || [], [data])
  const { data: featuredVersionsData } = useQuery({
    queryKey: ['featured-versions'],
    queryFn: versionsApi.getAllFeaturedVersions
  })
  const featuredVersions = useMemo(() => featuredVersionsData?.data?.data || [], [featuredVersionsData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  if (isLoading) return <Loading />

  return (
    <>
      <div className='mx-auto xl:max-w-[1400px] lg:max-w-[1100px] w-full overflow-hidden'>
        <Helmet>
          <title>Trang chủ | Laptop Ease</title>
          <meta name='description' content='Laptop Ease - Chuyên cung cấp laptop chính hãng' />
        </Helmet>
        <Banner />
        <SlickSlider />
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: 'https://laptopkhanhtran.vn/images/giaohang.svg',
                title: 'Giao hàng toàn quốc',
                subtitle: 'Miễn phí giao hàng tại Hà Nội',
                alt: 'Icon giao hàng'
              },
              {
                icon: 'https://laptopkhanhtran.vn/images/support.svg',
                title: 'Hỗ trợ trực tuyến',
                subtitle: 'Chúng tôi luôn hỗ trợ 24/7',
                alt: 'Icon hỗ trợ trực tuyến'
              },
              {
                icon: 'https://laptopkhanhtran.vn/images/promotion.svg',
                title: 'Giá cả phải chăng',
                subtitle: 'Chúng tôi luôn có giá tốt nhất cho khách hàng',
                alt: 'Icon giá cả phải chăng'
              },
              {
                icon: 'https://laptopkhanhtran.vn/images/cashback.svg',
                title: 'Chính sách hoàn tiền',
                subtitle: 'Hoàn tiền 100% nếu sản phẩm không tốt',
                alt: 'Icon hoàn tiền'
              }
            ].map(({ icon, title, subtitle, alt }, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 rounded-lg border border-transparent hover:border-green-600 transition-colors shadow hover:shadow-md cursor-default"
              >
                <img
                  className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0"
                  src={icon}
                  alt={alt}
                  loading="lazy"
                />
                <div className="ml-5">
                  <h4 className="text-green-900 text-sm xl:text-base font-semibold">{title}</h4>
                  <p className="text-gray-600 text-xs lg:text-sm mt-1">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='relative mb-8 sm:mb-12 lg:mb-20 overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-red-600 to-red-500 rounded-t-xl'>
            <div className='flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4'>
              <div className='flex items-center'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0'>
                  <img
                    src='https://laptopkhanhtran.vn/css/icon/lightning.svg'
                    alt='Flash Sale'
                    className='w-full h-full'
                  />
                </div>
                <h2 className='ml-2 sm:ml-3 text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wide'>
          Giờ Vàng Giá Sốc
                </h2>
              </div>

              <div className='flex items-center'>
                <span className='hidden sm:block text-xs sm:text-sm lg:text-base font-medium text-white/90 mr-2'>
          Kết thúc sau
                </span>
                <CountdownTimer />
              </div>
            </div>
          </div>

          {/* Swiper Container */}
          <div className='bg-red-500 rounded-b-xl shadow-lg'>
            <div className='relative px-2 sm:px-4 py-4 sm:py-6'>
              {/* Navigation Buttons */}
              <button
                className='swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md
                   flex items-center justify-center hover:shadow-lg transition-shadow
                   disabled:opacity-50 disabled:cursor-not-allowed'
                aria-label='Previous slide'
              >
                <svg className='w-4 h-4 sm:w-5 sm:h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>

              <button
                className='swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md
                   flex items-center justify-center hover:shadow-lg transition-shadow
                   disabled:opacity-50 disabled:cursor-not-allowed'
                aria-label='Next slide'
              >
                <svg className='w-4 h-4 sm:w-5 sm:h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>

              <Swiper
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 12
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 16
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 20
                  }
                }}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom'
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                loop={featuredVersions.length > 5}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className='px-8 sm:px-12'
              >
                {featuredVersions.length > 0 &&
          featuredVersions.map((version) => (
            <SwiperSlide key={version._id}>
              <div className='py-2'>
                <ProductItem version={version} />
              </div>
            </SwiperSlide>
          ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className='mb-20'>
          <h2 className='mb-5 text-center text-xl font-extrabold'>LAPTOP DOANH NHÂN CAO CẤP</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-6'>
            {versions.length > 0 &&
              versions.map((version) => <ProductItem key={version._id} version={version} isHover />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
