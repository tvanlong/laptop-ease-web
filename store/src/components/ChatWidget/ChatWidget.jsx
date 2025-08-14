import { useState } from 'react'
import ChatButton from './ChatButton'
import ChatWindow from './ChatWindow'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [minimized, setMinimized] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  const minimizeChat = () => {
    setMinimized(!minimized)
  }

  return (
    <>
      {!isOpen && (
        <ChatButton
          onClick={toggleChat}
          unreadCount={unreadCount}
        />
      )}

      {isOpen && (
        <ChatWindow
          isMinimized={minimized}
          onClose={closeChat}
          onMinimize={minimizeChat}
          onNewMessage={(count) => setUnreadCount(count)}
        />
      )}
    </>
  )
}

export default ChatWidget