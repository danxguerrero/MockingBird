'use client'

import { useState } from 'react'
import { sendToGemini } from '../actions'
import { useInterview } from './InterviewContext'

type Message = {
    id: number
    text: string
    sender: 'user' | 'ai'
}

export const Chat = () => {
    const { messages, setMessages, code, question } = useInterview()
    const [message, setMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: message,
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
            const aiResponse = await sendToGemini(message, codeContent, conversationHistory, codingQuestion)

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

    return <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender == 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                            ? 'bg-blue-500 text-white'
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
        </div>
        <form
            className="p-4 border-t"
            onSubmit={handleSubmit}
        >
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={message}
                    className="flex-1 border rounded-lg px-3 py-2"
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
        </form>
    </div>
}