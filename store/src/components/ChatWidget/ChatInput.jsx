import { Send } from 'lucide-react'
import { useState, useRef, useContext } from 'react'
import { AppContext } from '@/contexts/AppContext'

const ChatInput = ({ onSendMessage }) => {
  const { isAuthenticated } = useContext(AppContext)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const quickReplies = [
    'Tư vấn theo nhu cầu',
    'Dòng sản phẩm nào tốt nhất?',
    'Chơi game mượt mà nên mua gì?',
    'Laptop văn phòng giá rẻ'
  ]

  return (
    <div className="border-t border-gray-200">
      <div className="px-4 py-2 flex gap-2 overflow-x-auto">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onSendMessage(reply)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap transition-colors"
            disabled={!isAuthenticated}
          >
            {reply}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
          disabled={!isAuthenticated}
        />
        <button
          type="submit"
          className="bg-blue-400 text-white p-2.5 rounded-full hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          disabled={!input.trim() || !isAuthenticated}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

export default ChatInput