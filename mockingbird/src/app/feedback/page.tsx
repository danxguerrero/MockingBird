'use client'

import { useEffect, useState } from 'react'
import type { Message } from '../types/message'
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
            <h1 className="text-2xl font-bold mb-4">Interview Feedback</h1>

            {isLoading && (
                <div className="text-blue-600">Generating feedback...</div>
            )}

            {error && (
                <div className="text-red-600">Error: {error}</div>
            )}

            {feedback && (
                <div className="border p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2">Feedback</h2>
                    <p className="whitespace-pre-wrap">{feedback}</p>
                </div>
            )}

            <div>
                <h2 className="text-lg font-semibold mb-2">Chat History</h2>
                <div className="space-y-2">
                    {messages.map((msg,idx) => (
                        <div key={idx} className="border p-2 rounded">
                            <strong className={msg.sender == "user" ? "text-blue-600" : "text-gray-600"}>
                                {msg.sender === "user" ? "You" : "Interviewer"}
                            </strong>
                            <p className="ml-2">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}