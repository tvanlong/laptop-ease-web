import { chatConsultService, getChatHistoryService } from '~/services/ai.service'

export const searchAndSuggestController = async (req, res, next) => {
  try {
    const { query } = req.query
    const userId = req.user?._id || null

    if (!query || !query.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập từ khoá tìm kiếm' })
    }

    const { suggestion } = await chatConsultService(userId, query)
    return res.json({ suggestion })
  } catch (error) {
    next(error)
  }
}

export const getChatHistoryController = async (req, res, next) => {
  try {
    const userId = req.user?._id || null
    if (!userId) {
      return res.status(401).json({ message: 'Chưa đăng nhập' })
    }

    const history = await getChatHistoryService(userId)
    return res.json({ history })
  } catch (error) {
    next(error)
  }
}
