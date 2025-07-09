'use client'

import { useEffect, useState } from 'react'
import type { Message } from '../interview/types'
import { useFeedback } from './hooks/useFeedback'

export default function FeedbackPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const { feedback, isLoading, error } = useFeedback(messages)

    useEffect(() => {
        const saved = localStorage.getItem('messages')
        if (saved) {
            try {
                setMessages(JSON.parse(saved))
            } catch (error) {
                console.error("Unable to set messages: ", error)
                setMessages([])
            }
        }
    }, [])

    return (
        <div className="flex-1">
            {isLoading && (
                <div className="text-blue-600">Generating feedback...</div>
            )}

            {error && (
                <div>Error: {error}</div>
            )}

            {feedback && (
                <div>
                    <h2>Feedback</h2>
                    <p>{feedback}</p>
                </div>
            )}
        </div>
    )
}