import { useState, useRef, useEffect, useCallback, useContext } from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { playNotificationSound } from '@/utils/sound'
import { Bot, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import aiApi from '@/apis/ai.api'
import { AppContext } from '@/contexts/AppContext'

const ChatWindow = ({ isMinimized, onClose, onMinimize }) => {
  const { isAuthenticated } = useContext(AppContext)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: isAuthenticated ? 'Xin chào! Tôi là trợ lý tư vấn của bạn. Bạn cần giúp đỡ gì hôm nay?' : 'Vui lòng đăng nhập để trò chuyện.',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [currentUserQuery, setCurrentUserQuery] = useState(null)

  const messagesEndRef = useRef(null)

  const { data: aiResponse, isFetching, isLoading, error: aiError } = useQuery({
    queryKey: ['ai-search', currentUserQuery],
    queryFn: () => aiApi.suggest({ query: currentUserQuery }),
    enabled: !!currentUserQuery?.trim(),
    staleTime: 0,
    cacheTime: 0,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const { data: historyData } = useQuery({
    queryKey: ['ai-history'],
    queryFn: aiApi.getHistory,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (historyData?.data?.history?.length) {
      setMessages(historyData.data.history.flatMap((m, index) => {
        const msgs = [{
          id: index * 2 + 1,
          text: m.message,
          sender: m.sender,
          timestamp: m.timestamp ? new Date(m.timestamp).toISOString() : new Date().toISOString()
        }]

        if (m.reply) {
          msgs.push({
            id: index * 2 + 2,
            text: m.reply,
            sender: 'bot',
            timestamp: m.timestamp ? new Date(m.timestamp).toISOString() : new Date().toISOString()
          })
        }

        return msgs
      }))
    }
  }, [historyData])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (messages.length > 2 && messages[messages.length - 1]?.sender === 'bot') {
      playNotificationSound()
    }
  }, [messages])

  useEffect(() => {
    if (aiResponse && currentUserQuery) {
      try {
        const botMessage = {
          id: Date.now(),
          text: aiResponse.data.suggestion || 'Xin lỗi, tôi chưa có câu trả lời phù hợp.',
          sender: 'bot',
          timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
        setCurrentUserQuery(null)
      } catch (error) {
        handleError()
      }
    }
  }, [aiResponse, currentUserQuery])

  useEffect(() => {
    if (aiError && currentUserQuery) {
      handleError()
    }
  }, [aiError, currentUserQuery])

  const handleError = useCallback(() => {
    const errorMessage = {
      id: Date.now(),
      text: 'Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.',
      sender: 'bot',
      timestamp: new Date().toISOString(),
      isError: true
    }

    setMessages(prev => [...prev, errorMessage])
    setIsTyping(false)
    setCurrentUserQuery(null)
  }, [])

  const handleSendMessage = useCallback((text) => {
    if (!text?.trim()) return

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setCurrentUserQuery(text.trim())
  }, [])

  const _isTyping = isTyping || isFetching || isLoading

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-[600px] md:h-[600px]'
      } md:w-[380px] w-full md:bottom-6 md:right-6 bottom-0 right-0 
        md:max-w-[calc(100vw-48px)] bg-white md:rounded-lg shadow-2xl 
        flex flex-col overflow-hidden`}
    >
      <div
        className="bg-blue-600 text-white p-4 flex items-center justify-between cursor-pointer"
        onClick={onMinimize}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Trợ lý tư vấn</h3>
            <p className="text-xs text-blue-100">Sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="p-1 hover:bg-blue-700 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <MessageList messages={messages} isTyping={_isTyping} />
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  )
}

export default ChatWindow
