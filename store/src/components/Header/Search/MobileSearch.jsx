import { useEffect, useRef } from 'react'

function MobileSearch({ isOpenSearch, setIsOpenSearch, searchValue, setSearchValue, onSubmit }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpenSearch) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpenSearch])

  return (
    <>
      <div className='md:hidden flex basis-3/5 justify-end w-1/6'>
        <button
          className='p-2 mr-4 border border-gray-400 rounded-full hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500'
          onClick={() => setIsOpenSearch(true)}
          aria-label='Mở tìm kiếm'
        >
          <svg
            className='w-5 h-5 text-gray-200'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' d='M21 21l-4.35-4.35' />
            <circle cx='10' cy='10' r='6' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpenSearch ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpenSearch(false)}
        aria-hidden={!isOpenSearch}
      >
        <div
          className='relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg p-5'
          onClick={(e) => e.stopPropagation()}
          role='dialog'
          aria-modal='true'
          aria-labelledby='search-label'
        >
          <header className='flex items-center justify-between mb-4'>
            <h2 id='search-label' className='text-lg font-semibold text-gray-900'>
              Tìm kiếm sản phẩm
            </h2>
            <button
              onClick={() => setIsOpenSearch(false)}
              aria-label='Đóng tìm kiếm'
              className='text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded'
            >
              <svg
                className='w-5 h-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
              setIsOpenSearch(false)
            }}
          >
            <input
              ref={inputRef}
              type='text'
              className='w-full border border-gray-300 rounded-md px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
              placeholder='Nhập tên dòng sản phẩm cần tìm...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.trimStart())}
              spellCheck={false}
            />
            <button
              type='submit'
              className='mt-4 w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-900 transition-colors'
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MobileSearch
