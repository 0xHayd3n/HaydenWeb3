import { useState, useEffect, useRef } from 'react'

// Characters pool for random cycling
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

// Helper function to get initial text
const getInitialText = (targetText) => {
  return targetText.split('').map((char, index) => {
    if (index === 0) {
      return char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
    } else {
      return char === ' ' ? ' ' : ''
    }
  }).join('')
}

export function useDecodingText(targetText) {
  // Initialize with proper initial state - only first character cycling
  const [displayText, setDisplayText] = useState(() => getInitialText(targetText))
  const [decodedIndices, setDecodedIndices] = useState(new Set())
  const decodedIndicesRef = useRef(new Set())
  const decodeIntervalRef = useRef(null)
  const textUpdateIntervalRef = useRef(null)

  useEffect(() => {
    // Reset state when targetText changes
    const newSet = new Set()
    setDecodedIndices(newSet)
    decodedIndicesRef.current = newSet
    
    // Set initial display text immediately
    const initialText = getInitialText(targetText)
    setDisplayText(initialText)

    // Clear any existing intervals
    if (decodeIntervalRef.current) {
      clearInterval(decodeIntervalRef.current)
    }
    if (textUpdateIntervalRef.current) {
      clearInterval(textUpdateIntervalRef.current)
    }

    // Start the text cycling animation immediately
    // This continuously updates the random character for the next position
    textUpdateIntervalRef.current = setInterval(() => {
      const nextIndex = decodedIndicesRef.current.size
      const newText = targetText.split('').map((char, index) => {
        if (decodedIndicesRef.current.has(index)) {
          return char
        } else if (index === nextIndex) {
          return chars[Math.floor(Math.random() * chars.length)]
        } else {
          return char === ' ' ? ' ' : ''
        }
      }).join('')
      setDisplayText(newText)
    }, 60)

    // Small delay before starting decode animation
    const startDelay = setTimeout(() => {
      // Decode each character sequentially from left to right
      decodeIntervalRef.current = setInterval(() => {
        setDecodedIndices(prev => {
          const newDecoded = new Set(prev)
          
          // If all characters are decoded, stop
          if (newDecoded.size >= targetText.length) {
            if (decodeIntervalRef.current) {
              clearInterval(decodeIntervalRef.current)
              decodeIntervalRef.current = null
            }
            decodedIndicesRef.current = newDecoded
            return newDecoded
          }

          // Decode the next character sequentially (left to right)
          const nextIndex = newDecoded.size
          newDecoded.add(nextIndex)
          decodedIndicesRef.current = newDecoded

          return newDecoded
        })
      }, 100) // Update every 100ms for slower decoding
    }, 50) // Small delay to ensure proper initialization

    return () => {
      clearTimeout(startDelay)
      if (decodeIntervalRef.current) {
        clearInterval(decodeIntervalRef.current)
      }
      if (textUpdateIntervalRef.current) {
        clearInterval(textUpdateIntervalRef.current)
      }
    }
  }, [targetText])

  return displayText
}

