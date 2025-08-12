import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pagination, Spinner } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import categoriesApi from '~/apis/categories.api'
import versionsApi from '~/apis/versions.api'
import FilterDropdown from '~/components/FilterDropdown'
import FilterProductMobile from '~/components/FilterProductMobile'
import Loading from '~/components/Loading'
import ProductItem from '~/components/ProductItem'
import SortProductList from '~/components/SortProductList'
import SortProductListMobile from '~/components/SortProductListMobile'
import { LIMIT_PRODUCTS } from '~/constants/default'
import { cpuOptions, memoryOptions, priceOptions, ramOptions, screenSizeOptions, vgaOptions } from '~/constants/options'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'

function Category({ setProgress }) {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const queryParamsConfig = useQueryParamsConfig()

  const { data: categoryData } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoriesApi.getCategoryById(categoryId)
  })
  const category = categoryData?.data?.data || {}

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['versions-by-category', categoryId, queryParamsConfig],
    queryFn: () => versionsApi.getAllVersionsByCategoryId(categoryId, { ...queryParamsConfig, limit: LIMIT_PRODUCTS }),
    placeholderData: keepPreviousData
  })
  const versions = data?.data?.data?.docs || []

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const onPageChange = (page) => {
    navigate({
      pathname: `/category/${categoryId}`,
      search: createSearchParams({
        ...queryParamsConfig,
        page
      }).toString()
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6'>
      <Helmet>
        <title>{`Danh mục sản phẩm ${category?.name}`}</title>
        <meta name='description' content={`Danh mục sản phẩm ${category?.name}`} />
      </Helmet>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6'>
        <h2 className='hidden sm:block text-xl lg:text-2xl xl:text-3xl font-bold uppercase text-gray-900'>
          {category?.name}
        </h2>
        <nav className='flex w-full sm:w-auto' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center text-xs sm:text-sm'>
            <li className='inline-flex items-center'>
              <Link
                to='/'
                className='inline-flex items-center font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200'
              >
                <svg
                  className='mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                </svg>
                <span className='hidden sm:inline'>Trang chủ</span>
                <span className='sm:hidden'>Home</span>
              </Link>
            </li>
            <li className='mx-1 sm:mx-2'>
              <svg
                className='h-3 w-3 sm:h-4 sm:w-4 text-gray-400'
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
            </li>
            <li>
              <Link
                to={`/category/${categoryId}`}
                className='font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200'
              >
                {category?.name}
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className='mt-10 lg:hidden flex justify-end gap-4 border-t border-gray-300'>
        <SortProductListMobile pathname={`/category/${categoryId}`} queryParamsConfig={queryParamsConfig} />
        <FilterProductMobile queryParamsConfig={queryParamsConfig} />
      </div>
      <div className='mt-10 lg:grid lg:grid-cols-12 gap-8'>
        <div className='hidden lg:block xl:col-span-2 lg:col-span-3'>
          <div className='rounded-lg border border-gray-300 px-3 py-5'>
            <h3 className='mb-4 text-xl font-semibold'>Lọc sản phẩm</h3>
            <FilterDropdown title='Khoảng giá' options={priceOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown
              title='Kích thước màn hình'
              options={screenSizeOptions}
              queryParamsConfig={queryParamsConfig}
            />
            <FilterDropdown title='RAM' options={ramOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='Bộ nhớ trong' options={memoryOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='CPU' options={cpuOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='Card màn hình' options={vgaOptions} queryParamsConfig={queryParamsConfig} />
          </div>
        </div>
        <div className='xl:col-span-10 lg:col-span-9'>
          <SortProductList pathname={`/category/${categoryId}`} queryParamsConfig={queryParamsConfig} />
          {!isFetching ? (
            <div className='mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6'>
              {versions.map((version) => (
                <ProductItem key={version._id} version={version} isHover />
              ))}
            </div>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <div className='text-center'>
                <Spinner size='xl' aria-label='Center-aligned spinner example' />
              </div>
            </div>
          )}
          {data?.data?.data.totalPages > 1 && (
            <div className='mt-10 flex overflow-x-auto sm:justify-center'>
              <Pagination
                className='text-sm'
                currentPage={queryParamsConfig.page}
                totalPages={data?.data?.data.totalPages}
                onPageChange={onPageChange}
                previousLabel='Trang trước'
                nextLabel='Trang sau'
              />
            </div>
          )}
          {!isFetching && versions.length === 0 && (
            <div className='mt-10 text-center text-lg font-bold'>Không có sản phẩm nào</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Category
