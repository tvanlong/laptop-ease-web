import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

function MobileMenu({ categories, isAuthenticated, totalQuantity, handleSignOut, navigateToSubcategory }) {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
  const [isOpenMenuCategory, setIsOpenMenuCategory] = useState(false)

  return (
    <>
      <button
        className={`lg:hidden relative inline-flex items-center justify-center p-2 border border-white rounded-full text-white cursor-pointer transition-colors duration-300 ${
          isOpenMobileMenu ? 'bg-gray-700' : 'bg-[#242525]'
        }`}
        onClick={() => setIsOpenMobileMenu((prev) => !prev)}
        aria-label={isOpenMobileMenu ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={isOpenMobileMenu}
      >
        {isOpenMobileMenu ? (
          <svg
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <svg
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
        )}
      </button>
      {isOpenMobileMenu && (
        <div
          className='fixed inset-0 z-20 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300'
          onClick={() => setIsOpenMobileMenu(false)}
          aria-hidden='true'
        ></div>
      )}
      <nav
        className={`fixed inset-y-0 left-0 z-30 top-[80px] w-56 bg-[#1f2021] shadow-2xl overflow-y-auto scrollbar-custom transform transition-transform duration-300 ease-in-out will-change-transform lg:hidden
          ${isOpenMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label='Mobile menu'
      >
        <div className='space-y-1 px-4 py-3'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-600 text-white shadow-inner'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            onClick={() => setIsOpenMobileMenu(false)}
          >
            Trang chủ
          </NavLink>

          <div>
            <button
              className='w-full flex justify-between items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none transition'
              onClick={() => setIsOpenMenuCategory((prev) => !prev)}
              aria-expanded={isOpenMenuCategory}
              aria-controls='category-menu'
            >
              Danh mục sản phẩm
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                  isOpenMenuCategory ? 'rotate-180 text-gray-400' : 'text-gray-400'
                }`}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </button>
            <ul
              id='category-menu'
              className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
                isOpenMenuCategory ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-3'
              }`}
            >
              {categories.map((category) => (
                <li key={category._id} className='text-gray-300'>
                  <Link
                    to={`/category/${category._id}`}
                    className='block rounded-md px-5 py-2 text-sm font-semibold hover:text-gray-100 transition-colors'
                    onClick={() => {
                      setIsOpenMobileMenu(false)
                      setIsOpenMenuCategory(false)
                    }}
                  >
                    {category.name}
                  </Link>
                  <div className='flex flex-col pl-8'>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory._id}
                        to={`/subcategory/${subcategory._id}`}
                        className='py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors'
                        onClick={() => {
                          setIsOpenMobileMenu(false)
                          setIsOpenMenuCategory(false)
                          navigateToSubcategory(category._id, subcategory._id)
                        }}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <NavLink
            to='/about'
            className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
            onClick={() => setIsOpenMobileMenu(false)}
          >
            Giới thiệu
          </NavLink>

          <NavLink
            to='/products'
            className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
            onClick={() => setIsOpenMobileMenu(false)}
          >
            Sản phẩm
          </NavLink>

          <NavLink
            to='/news'
            className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
            onClick={() => setIsOpenMobileMenu(false)}
          >
            Tin tức
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to='/profile'
                className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
                onClick={() => setIsOpenMobileMenu(false)}
              >
                Tài khoản
              </NavLink>
              <button
                className='w-full text-left block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
                onClick={() => {
                  handleSignOut()
                  setIsOpenMobileMenu(false)
                }}
              >
                Đăng xuất
              </button>
              <NavLink
                to='/cart'
                className={({ isActive }) =>
                  isActive
                    ? 'block rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white shadow-inner'
                    : 'block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
                }
                onClick={() => setIsOpenMobileMenu(false)}
              >
                Giỏ hàng {totalQuantity > 0 && <span className='text-red-500'>({totalQuantity})</span>}
              </NavLink>
            </>
          ) : (
            <Link
              to='/login'
              className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
              onClick={() => setIsOpenMobileMenu(false)}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default MobileMenu
