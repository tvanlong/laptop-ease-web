import Message from './Message'
import TypingIndicator from './TypingIndicator'

const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map(message => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  )
}

export default MessageList
