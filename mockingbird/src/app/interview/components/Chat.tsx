'use client'

import { useState, useEffect, useRef } from 'react'
import { sendToGemini } from '../actions'
import { useInterview } from './InterviewContext'
import type { Message } from '../../types/message'

export const Chat = () => {
    const { messages, setMessages, code, question } = useInterview()
    const [message, setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const submitMessage = async (messageText: string) => {
        if (!messageText.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: messageText,
            sender: 'user'
        }

        setMessages((prev: Message[]) => [...prev, userMessage])
        setMessage("")
        setIsLoading(true)

        try {
            const codeContent = code || "User has not written any code yet."

            const conversationHistory = messages.map(m => `${m.sender}: ${m.text}`)

            const codingQuestion = question || "A question could not be generated. Please generate an easy or medium leetcode style question to ask the user."

            // Make call to Gemini
            const aiResponse = await sendToGemini(messageText, codeContent, conversationHistory, codingQuestion)

            if (aiResponse) {
                const aiMessage: Message = {
                    id: Date.now() + 1,
                    text: aiResponse,
                    sender: 'ai'
                }
                setMessages((prev: Message[]) => [...prev, aiMessage])
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submitMessage(message)
    }

    return <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender == 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user'
                            ? 'bg-lime-300 text-gray-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                        Interviwer is typing...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <form
            className="p-4 border-t flex-shrink-0"
            onSubmit={handleSubmit}
        >
            <div className="flex gap-2">
                <textarea
                    value={message}
                    className="flex-1 border rounded-lg px-3 py-2 resize-none h-12 max-h-24 overflow-y-auto"
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            if (message.trim() && !isLoading) {
                                submitMessage(message)
                            }
                        }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-lime-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-lime-500 disabled:opacity-50"
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
        </form>
    </div>
}