'use client'

import { useState } from 'react'
import { sendFeedbackEmail } from '../actions'
import { Message } from '../../types/message'

export const Feedback = ({isLoading, feedback, messages}: {
    isLoading: boolean, 
    feedback: string,
    messages: Message[]
}) => {
    const [email, setEmail] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [emailStatus, setEmailStatus] = useState<{
        success?: boolean;
        message?: string;
    } | null>(null)

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !feedback) return

        setIsSending(true)
        setEmailStatus(null)

        try {
            const result = await sendFeedbackEmail(email, feedback, messages)
            setEmailStatus(result)
        } catch (error) {
            setEmailStatus({
                success: false,
                message: 'Failed to send email. Please try again. ' + error
            })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="border p-4 rounded-lg h-3/5 mb-4 min-h-0 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Feedback</h2>
            {isLoading && <div className="text-blue-600">Generating feedback...</div>}
            <p className="whitespace-pre-wrap mb-4">{feedback}</p>
            
            {feedback && !isLoading && (
                <div className="border-t pt-4">
                    <h3 className="text-md font-semibold mb-2">Email Feedback</h3>
                    <form onSubmit={handleSendEmail} className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSending || !email}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isSending ? 'Sending...' : 'Send Feedback to Email'}
                        </button>
                    </form>
                    
                    {emailStatus && (
                        <div className={`mt-3 p-3 rounded-md ${
                            emailStatus.success 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            {emailStatus.message}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
} 