'use client'

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import type { Message } from '../../types/message'

type InterviewContextType = {
    interviewActive: boolean
    setInterviewActive: (active: boolean) => void
    question: string | null
    setQuestion: (q: string) => void
    time: number
    setTime: (t: number) => void
    code: string
    setCode: (code: string) => void
    messages: Message[]
    setMessages: Dispatch<SetStateAction<Message[]>>
    resetInterview: () => void
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if (!context) throw new Error("useInterview must be used within InterviewProvider")
    return context
}

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
    const [interviewActive, setInterviewActive] = useState(false)
    const [question, setQuestion] = useState<string | null>(null)
    const [time, setTime] = useState<number>(45 * 60)
    const [code, setCode] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])

    // Function to reset all interview state
    const resetInterview = () => {
        setInterviewActive(false)
        setQuestion(null)
        setTime(45 * 60)
        setCode("")
        setMessages([])
        // Clear localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem("interviewActive")
            localStorage.removeItem("question")
            localStorage.removeItem("time")
            localStorage.removeItem("code")
            localStorage.removeItem("messages")
        }
    }

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return
        
        const savedActive = localStorage.getItem("interviewActive")
        if (savedActive !== null) {
            try {
                setInterviewActive(JSON.parse(savedActive))
            } catch (error) {
                console.error('Error parsing interview:', error)
                localStorage.removeItem("interviewActive")
            }
        }

        const savedQuestion = localStorage.getItem("question")
        if (savedQuestion) setQuestion(savedQuestion)

        const savedTime = localStorage.getItem("time")
        if (savedTime) setTime(Number(savedTime))

        const savedCode = localStorage.getItem("code")
        if (savedCode) setCode(savedCode)

        const savedMessages = localStorage.getItem("messages")
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages))
            } catch (error) {
                console.error("Error parsing messages:", error)
                localStorage.removeItem("messages")
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        localStorage.setItem("interviewActive", JSON.stringify(interviewActive))
    }, [interviewActive])
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (question) localStorage.setItem("question", question)
    }, [question])
    useEffect(() => {
        if (typeof window === 'undefined') return
        localStorage.setItem("time", String(time))
    }, [time])
    useEffect(() => {
        if (typeof window === 'undefined') return
        localStorage.setItem("code", code)
    }, [code])
    useEffect(() => {
        if (typeof window === 'undefined') return
        localStorage.setItem("messages", JSON.stringify(messages))
    }, [messages])
    return (
        <InterviewContext.Provider value={{ interviewActive, setInterviewActive, question, setQuestion, time, setTime, code, setCode, messages, setMessages, resetInterview }}>
            {children}
        </InterviewContext.Provider>
    )
}