import { useState, createContext } from 'react'

export const ComparisonContext = createContext()

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  const addToComparison = (product) => {
    if (comparisonItems.length >= 4) {
      alert('Tối đa chỉ có thể so sánh 4 sản phẩm cùng lúc')
      return
    }

    const exists = comparisonItems.find(item => item._id === product._id)
    if (!exists) {
      setComparisonItems([...comparisonItems, product])
    }
  }

  const removeFromComparison = (productId) => {
    setComparisonItems(comparisonItems.filter(item => item._id !== productId))
  }

  const clearComparison = () => {
    setComparisonItems([])
    setShowComparison(false)
  }

  const isInComparison = (productId) => {
    return comparisonItems.some(item => item._id === productId)
  }

  return (
    <ComparisonContext.Provider value={{
      comparisonItems,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      showComparison,
      setShowComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  )
}