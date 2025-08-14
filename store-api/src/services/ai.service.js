import { Chat } from '~/models/chat.model'
import { Recommendation } from '~/models/recommendation.model'
import OpenAI from 'openai'

const { OPENAI_MODEL, OPENAI_API_KEY } = process.env
const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export const chatConsultService = async (userId, query) => {
  if (!query || typeof query !== 'string') {
    throw new Error('Thiếu hoặc sai định dạng tham số query')
  }

  const chatDoc = await Chat.create({ user: userId, message: query })

  const prompt = `
    Khách hàng hỏi: "${query}"
    Bạn là nhân viên tư vấn laptop, hãy trả lời ngắn gọn, thân thiện và dễ hiểu.
    Không liệt kê sản phẩm cụ thể, chỉ tư vấn chung dựa trên nhu cầu.
  `.trim()

  let suggestion = 'Xin lỗi, hiện tại tôi chưa thể tư vấn.'

  try {
    const aiResponse = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'Bạn là nhân viên tư vấn laptop, trả lời ngắn gọn, thân thiện.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 150
    })

    suggestion = aiResponse.choices?.[0]?.message?.content?.trim() || suggestion
  } catch (err) {
    console.error('AI consult error:', err)
  }

  await Chat.findByIdAndUpdate(chatDoc._id, { $set: { reply: suggestion } })

  await Recommendation.create({
    chat: chatDoc._id,
    message: suggestion
  })

  return { suggestion }
}

export const getChatHistoryService = async (userId) => {
  if (!userId) throw new Error('Thiếu userId')

  const chats = await Chat.find({ user: userId })
    .sort({ createdAt: 1 })
    .lean()

  const recs = await Recommendation.find({
    chat: { $in: chats.map(c => c._id) }
  }).lean()

  return chats.map(chat => ({
    _id: chat._id,
    message: chat.message,
    sender: 'user',
    timestamp: chat.createdAt,
    reply: recs.find(r => r.chat.toString() === chat._id.toString())?.message || null
  }))
}
