'use client'

import { useEffect, useState } from 'react'
import type { Message } from '../types/message'
import { useFeedback } from './hooks/useFeedback'

import { ChatHistory } from './components/ChatHistory'

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
        <div className="mx-42 mb-3 h-[90vh] flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Interview Feedback</h1>

            {error && (
                <div className="text-red-600">Error: {error}</div>
            )}

            <div className="flex-1 flex flex-col min-h-0">
                <div className="border p-4 rounded-lg h-3/5 mb-4 min-h-0 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-2">Feedback</h2>
                    {isLoading && <div className="text-blue-600">Generating feedback...</div>}
                    <p className="whitespace-pre-wrap">{feedback}</p>
                </div>
                <div className="h-2/5 min-h-0 overflow-y-auto border p-4 rounded-lg">
                    {messages && <ChatHistory messages={messages} />}
                </div>
            </div>

        </div>
    )
}
