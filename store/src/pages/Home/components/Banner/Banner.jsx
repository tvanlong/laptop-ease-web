import { Carousel } from 'flowbite-react'

function Banner() {
  return (
    <section className="mb-20 mt-10 px-6">
      <div className="grid xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 relative">
          <div className="2xl:h-[27.2rem] xl:h-[25rem] lg:h-[20rem] md:h-[15rem] h-[10rem]">
            <Carousel slideInterval={4000}>
              <img
                src="https://laptopkhanhtran.vn/pic/banner/Tet_Banne_638406757890754137-w.900-q.100.png"
                alt="Banner Tết Laptop Khánh Trần"
                className="object-cover w-full h-full"
              />
              <img
                src="https://laptopkhanhtran.vn/pic/banner/tra-gop-l_638265641712946875-w.900-q.100.jpg"
                alt="Banner trả góp Laptop Khánh Trần"
                className="object-cover w-full h-full"
              />
              <img
                src="https://laptopkhanhtran.vn/pic/banner/x1-nano-g_638265642050940512-w.900-q.100.jpg"
                alt="Banner Lenovo X1 Nano"
                className="object-cover w-full h-full"
              />
              <img
                src="https://laptopkhanhtran.vn/pic/banner/dell-ins-_638265639915152281-w.900-q.100.jpg"
                alt="Banner Dell Inspiron"
                className="object-cover w-full h-full"
              />
              <img
                src="https://laptopkhanhtran.vn/pic/banner/Free-shi__638265641166041347-w.900-q.100.jpg"
                alt="Banner Free Shipping"
                className="object-cover w-full h-full"
              />
            </Carousel>
          </div>
        </div>

        <div className="hidden xl:block xl:col-span-4">
          <div className="flex flex-col gap-3.5 h-full">
            {[
              {
                src: 'https://laptopkhanhtran.vn/pic/banner/Banne_638_638265643831519781-w.455-q.80.jpg',
                alt: 'Promo Laptop Khánh Trần 1'
              },
              {
                src: 'https://laptopkhanhtran.vn/pic/banner/banner_63_638265643449698805-w.455-q.80.jpg',
                alt: 'Promo Laptop Khánh Trần 2'
              },
              {
                src: 'https://laptopkhanhtran.vn/pic/banner/banner_63_638265642576398741-w.455-q.80.jpg',
                alt: 'Promo Laptop Khánh Trần 3'
              }
            ].map(({ src, alt }, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex-1">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
