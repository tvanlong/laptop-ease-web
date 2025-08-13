import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 text-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 pb-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover shadow-md"
                alt="LapEase Logo"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">LapEase</h3>
                <p className="text-xs text-gray-500">Your Tech Partner</p>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-lg">
            <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
              📧 Nhận ưu đãi độc quyền
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Đăng ký để nhận thông tin mới nhất về sản phẩm và khuyến mãi.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                  transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700
                  text-white px-6 py-2.5 text-sm rounded-lg font-semibold shadow-md
                  transform transition-all duration-200 hover:scale-105"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Dịch vụ
            </h4>
            <ul className="space-y-2">
              {['Mua hàng trả góp', 'Bảo hành', 'Sửa chữa', 'Đổi trả'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200
                    inline-flex items-center gap-1 group">
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Tin tức
            </h4>
            <ul className="space-y-2">
              {['Blog công nghệ', 'Sự kiện', 'Khuyến mãi', 'Review sản phẩm'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Về chúng tôi
            </h4>
            <ul className="space-y-2">
              {['Giới thiệu', 'Liên hệ', 'Tuyển dụng', 'Đối tác'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Hỗ trợ
            </h4>
            <ul className="space-y-2">
              {['Hướng dẫn mua hàng', 'Chính sách bảo mật', 'Điều khoản', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              {['Download', 'Hướng dẫn', 'Drivers', 'Cộng đồng'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Kết nối với chúng tôi
            </h4>
            <div className="flex gap-2 mb-4">
              {[
                { icon: '📘', name: 'Facebook', color: 'hover:bg-blue-500' },
                { icon: '📷', name: 'Instagram', color: 'hover:bg-pink-500' },
                { icon: '🐦', name: 'Twitter', color: 'hover:bg-sky-500' },
                { icon: '📺', name: 'Youtube', color: 'hover:bg-red-500' }
              ].map((social) => (
                <Link
                  key={social.name}
                  to="/"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 
                    bg-white ${social.color} hover:text-white hover:border-transparent
                    transition-all duration-200 shadow-sm hover:shadow-md`}
                  title={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-600 mb-1">Hotline hỗ trợ:</p>
              <p className="text-lg font-bold text-teal-600">1900 xxxx</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>&copy; 2024 LapEase.</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Designed with ❤️ in Vietnam</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {['Điều khoản', 'Chính sách', 'Cookies', 'Sitemap'].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-gray-500 hover:text-teal-600 transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-2">Chấp nhận:</span>
              {['💳', '🏦', '💰'].map((payment, index) => (
                <span key={index} className="text-lg" title="Payment method">
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer