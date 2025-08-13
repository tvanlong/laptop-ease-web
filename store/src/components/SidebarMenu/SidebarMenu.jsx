import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import categoriesApi from '@/apis/categories.api'
import { AppContext } from '@/contexts/AppContext'

function SidebarMenu() {
  const { isOpenSidebarMenu, setIsOpenSidebarMenu } = useContext(AppContext)
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAllCategories
  })
  const categories = categoriesData?.data?.data || []

  const [expandedCategories, setExpandedCategories] = useState({})

  const handleCategoryClick = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }))
  }

  const handleNavigateCategory = (categoryId) => {
    navigate(`/category/${categoryId}`)
    setIsOpenSidebarMenu(false) // đóng menu khi chọn category
  }

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    navigate(`/subcategory/${subcategoryId}`, {
      state: { categoryId }
    })
    setIsOpenSidebarMenu(false) // đóng menu khi chọn subcategory
  }

  return (
    <div className='relative'>
      {isOpenSidebarMenu && (
        <div
          className='fixed inset-0 bg-black opacity-40 z-40 pointer-events-auto'
          onClick={() => setIsOpenSidebarMenu(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 bottom-0 left-0 w-64 bg-gray-50 text-gray-900 z-50 shadow-lg transition-transform transform duration-300 ease-in-out ${
          isOpenSidebarMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between h-16 px-4 bg-gray-200 border-b border-gray-300'>
          <span className='font-semibold text-lg'>Danh mục sản phẩm</span>
          <button
            className='text-gray-700 hover:text-gray-900 focus:outline-none'
            aria-label='Đóng menu'
            onClick={() => setIsOpenSidebarMenu(false)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <ul className='py-4 overflow-y-auto scrollbar-custom h-[calc(100vh-64px)]'>
          {categories.map((category) => {
            const isActiveCategory = pathname.includes(category._id)
            const isExpanded = expandedCategories[category._id]

            return (
              <li key={category._id} className='select-none'>
                <div
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-r-md ${
                    isActiveCategory ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'
                  }`}
                >
                  <span onClick={() => handleNavigateCategory(category._id)} className='flex-1'>
                    {category.name}
                  </span>
                  {category.subcategories.length > 0 && (
                    <button
                      className={`ml-2 transition-transform duration-300 focus:outline-none ${
                        isExpanded ? 'rotate-90 text-blue-600' : 'text-gray-400'
                      }`}
                      onClick={() => handleCategoryClick(category._id)}
                      aria-label={isExpanded ? 'Thu gọn danh mục' : 'Mở rộng danh mục'}
                    >
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                      </svg>
                    </button>
                  )}
                </div>
                {isExpanded && (
                  <ul className='pl-6 mt-1'>
                    {category.subcategories.map((subcategory) => {
                      const isActiveSubcategory = pathname.includes(subcategory._id)
                      return (
                        <li
                          key={subcategory._id}
                          className={`py-1 cursor-pointer rounded-r-md px-2 ${
                            isActiveSubcategory
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                          onClick={() => handleSubcategoryClick(category._id, subcategory._id)}
                        >
                          {subcategory.name}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SidebarMenu
