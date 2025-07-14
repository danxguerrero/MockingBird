import { useState, useEffect } from 'react'
import type { Message } from '../../types/message'
import { generateFeedback } from '../actions'

export const useFeedback = (messages: Message[]) => {
    const [feedback, setFeedback] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (messages.length > 1) {
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
    
    return { feedback, isLoading, error}
}