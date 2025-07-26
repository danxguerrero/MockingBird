import { useState, useEffect } from 'react'
import type { Message } from '../../types/message'
import { generateFeedback } from '../actions'

export const useFeedback = (messages: Message[]) => {
    const [feedback, setFeedback] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Load feedback from localStorage
    useEffect(() => {
        let isMounted = true
        const loadOrGenerateFeedback = async () => {
            const savedFeedback = localStorage.getItem("feedback")
            if (savedFeedback) {
                if (isMounted) setFeedback(savedFeedback)
            } else if (messages.length > 1) {
                setIsLoading(true)
                setError(null)
                try {
                    const result = await generateFeedback(messages)
                    if (result && isMounted) {
                        setFeedback(result)
                        localStorage.setItem("feedback", result)
                    }
                } catch (error) {
                    console.error("Unable to generate feedback: ", error)
                    setError("Failed to generate feedback.")
                } finally {
                    setIsLoading(false)
                }
            }
        }
        loadOrGenerateFeedback()
        return () => { isMounted = false }
    }, [messages])

    // Save feedback to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("feedback", feedback)
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