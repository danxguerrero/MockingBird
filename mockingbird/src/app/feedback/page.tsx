'use client'

import { useEffect, useState } from 'react'
import type { Message } from '../types/message'
import { useFeedback } from './hooks/useFeedback'

import { ChatHistory } from './components/ChatHistory'
import { Feedback } from './components/Feedback'
// TODO: #28 
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
                <Feedback isLoading={isLoading} feedback={feedback} />
                <div className="h-2/5 min-h-0 overflow-y-auto border p-4 rounded-lg">
                    {messages && <ChatHistory messages={messages} />}
                </div>
            </div>

        </div>
    )
}
