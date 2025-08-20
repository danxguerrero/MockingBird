'use client'
import { useInterview } from './InterviewContext'

export const Question = () => {
    const { question } = useInterview()
    if (!question) return <div>Loading question...</div>
    return (
        <div className="p-4 text-lg border rounded-lg mx-4 mb-4 h-full">
            {question}
        </div>
    )
}