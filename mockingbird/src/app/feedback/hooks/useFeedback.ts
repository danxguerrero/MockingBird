import { useState, useEffect, useRef } from 'react'
import type { Message } from '../../types/message'
import { generateFeedback } from '../actions'

export const useFeedback = (messages: Message[]) => {
    const [feedback, setFeedback] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const previousMessagesRef = useRef<Message[]>([])

    // Load feedback from localStorage on mount
    useEffect(() => {
        const savedFeedback = localStorage.getItem("feedback")
        if (savedFeedback) {
            setFeedback(savedFeedback)
        }
    }, [])

    // Generate feedback only when messages change (new interview)
    useEffect(() => {
        let isMounted = true
        
        // Check if messages have actually changed (new interview)
        const messagesChanged = JSON.stringify(messages) !== JSON.stringify(previousMessagesRef.current)
        
        if (messagesChanged && messages.length > 1) {
            setIsLoading(true)
            setError(null)
            
            generateFeedback(messages)
                .then((result) => {
                    if (result && isMounted) {
                        setFeedback(result)
                        localStorage.setItem("feedback", result)
                    }
                })
                .catch((error) => {
                    console.error("Unable to generate feedback: ", error)
                    if (isMounted) setError("Failed to generate feedback.")
                })
                .finally(() => {
                    if (isMounted) setIsLoading(false)
                })
        }
        
        // Update the previous messages reference
        previousMessagesRef.current = messages
    }, [messages])

    // Save feedback to localStorage when it changes
    useEffect(() => {
        if (feedback) {
            localStorage.setItem("feedback", feedback)
        }
    }, [feedback])

    // Clear feedback from localStorage when navigating away
    useEffect(() => {
        const clearFeedback = () => {
            localStorage.removeItem("feedback")
        }
        window.addEventListener('beforeunload', clearFeedback)
        return () => {
            window.removeEventListener("beforeunload", clearFeedback)
            clearFeedback()
        }
    }, [])

    return { feedback, isLoading, error }
}