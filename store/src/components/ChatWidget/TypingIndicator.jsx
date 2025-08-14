const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator