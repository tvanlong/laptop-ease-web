import jwt from 'jsonwebtoken'
import User from '~/models/user.model'

export const checkPermission = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập!' })
      }

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
      const user = await User.findById(decoded._id)
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại!' })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này!' })
      }

      req.user = user
      next()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
