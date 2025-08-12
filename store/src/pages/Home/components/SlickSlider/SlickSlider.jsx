import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const categories = [
  { name: 'Laptop Dell', img: 'https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' },
  { name: 'Lenovo Thinkpad', img: 'https://laptopkhanhtran.vn/pic/product/thinkpa_638159618614796253-w.150-q.80.jpg' },
  { name: 'Laptop HP', img: 'https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' },
  { name: 'Laptop Asus', img: 'https://laptopkhanhtran.vn/pic/product/asu_638159618788111097-w.150-q.80.jpg' },
  { name: 'Laptop Samsung', img: 'https://laptopkhanhtran.vn/pic/product/samsun_638159618865042754-w.150-q.80.jpg' },
  { name: 'Laptop LG', img: 'https://laptopkhanhtran.vn/pic/icon/no_image.gif' },
  { name: 'Microsoft Surface', img: 'https://laptopkhanhtran.vn/pic/product/surfac_638159618953001630-w.150-q.80.jpg' },
  { name: 'Laptop Đồ Họa', img: 'https://laptopkhanhtran.vn/pic/product/desig_638159619107981928-w.150-q.80.jpg' },
  { name: 'Laptop Gaming', img: 'https://laptopkhanhtran.vn/pic/product/gamin_638159619022147369-w.150-q.80.jpg' },
  { name: 'Linh Kiện Máy Tính', img: 'https://laptopkhanhtran.vn/pic/product/p_638159619247537734-w.150-q.80.jpg' }
]

function SlickSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } }
    ]
  }

  return (
    <div className='slider-container mb-20 mt-10 px-4'>
      <h2 className='mb-10 text-center text-lg lg:text-2xl font-extrabold text-gray-800'>Thương hiệu nổi bật</h2>
      <Slider {...settings}>
        {categories.map(({ name, img }, idx) => (
          <div key={idx}>
            <div className='flex flex-col items-center justify-center cursor-pointer'>
              <img
                className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover rounded-md shadow-md'
                src={img}
                alt={name}
                loading='lazy'
              />
              <div className='hidden sm:block mt-3 text-sm font-semibold text-gray-700 uppercase text-center'>
                {name}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SlickSlider
