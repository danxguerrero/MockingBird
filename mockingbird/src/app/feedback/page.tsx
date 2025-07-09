'use client'

import { useEffect, useState } from 'react'
import type { Message } from '../interview/types'
import { generateFeedback } from './actions'

export default function FeedbackPage() {
    const [messages, setMessages] = useState<Message[]>([])

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
            <h1>Interview Feedback</h1>
            {messages.length > 1 ? messages.map((msg, idx) => (
                <div key={idx}>
                    <strong>{msg.sender}:</strong> {msg.text}
                </div>
            )): "No Chat messages found"}
        </div>
    )
}