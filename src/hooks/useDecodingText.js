import { useState, useEffect, useRef } from 'react'

// Characters pool for random cycling
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

export function useDecodingText(targetText) {
  const [displayText, setDisplayText] = useState('')
  const [decodedIndices, setDecodedIndices] = useState(new Set())
  const decodeIntervalRef = useRef(null)

  useEffect(() => {
    // Initialize with random characters
    const initialText = targetText.split('').map(() => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
    setDisplayText(initialText)

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
          return newDecoded
        }

        // Decode the next character sequentially (left to right)
        const nextIndex = newDecoded.size
        newDecoded.add(nextIndex)

        return newDecoded
      })
    }, 100) // Update every 100ms for slower decoding

    return () => {
      if (decodeIntervalRef.current) {
        clearInterval(decodeIntervalRef.current)
      }
    }
  }, [targetText])

  useEffect(() => {
    // Update display text based on decoded indices
    const updateText = () => {
      const newText = targetText.split('').map((char, index) => {
        if (decodedIndices.has(index)) {
          return char
        } else {
          // Cycle through random characters for undecoded positions
          return chars[Math.floor(Math.random() * chars.length)]
        }
      }).join('')
      setDisplayText(newText)
    }

    // Update text for character cycling
    const textUpdateInterval = setInterval(updateText, 60)

    return () => clearInterval(textUpdateInterval)
  }, [decodedIndices, targetText])

  return displayText
}

