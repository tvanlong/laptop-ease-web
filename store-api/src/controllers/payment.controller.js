import Payment_method from '~/models/payment.model'

// @desc    Lấy tất cả phương thức thanh toán
// @route   GET /api/payments
// @access  Private (admin, staff, member)
const getAllPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await Payment_method.find()
    return res.status(200).json({
      message: 'Lấy danh sách phương thức thanh toán thành công',
      data: paymentMethods
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Tạo mới phương thức thanh toán
// @route   POST /api/payments
// @access  Private (admin)
const createPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = new Payment_method({
      name: req.body.name
    })
    await paymentMethod.save()
    return res.status(201).json({
      message: 'Tạo phương thức thanh toán thành công',
      data: paymentMethod
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllPaymentMethods,
  createPaymentMethod
}
