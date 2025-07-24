import { useState, useEffect } from 'react'
import type { Message } from '../../types/message'
import { generateFeedback } from '../actions'

export const useFeedback = (messages: Message[]) => {
    const [feedback, setFeedback] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Load feedback from localStorage
    useEffect(() => {
        const savedFeedback = localStorage.getItem("feedback")
        if (savedFeedback) {
            setFeedback(savedFeedback)
        }
    }, [])

    // Save feedback to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("feedback", feedback)
    }, [feedback])

    // Generates feedback when theres more than one message and no existing feedback
    useEffect(() => {
        if (messages.length > 1 && !feedback) {
            setIsLoading(true)
            setError(null)

            generateFeedback(messages)
                .then((result) => {
                    if (result) {
                        setFeedback(result)
                    }
                })
                .catch ((error) => {
                    console.error("Unable to generate feedback: ", error)
                    setError("Failed to generate feedback.")
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [messages])

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
    
    return { feedback, isLoading, error}
}