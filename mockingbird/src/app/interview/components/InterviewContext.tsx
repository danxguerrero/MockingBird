'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type InterviewContextType = {
    interviewActive: boolean
    setInterviewActive: (active: boolean) => void
    question: string | null
    setQuestion: (q: string) => void
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if (!context) throw new Error("useInterview must be used within InterviewProvider")
    return context
}

export const InterviewProvider = ({ children }: {children: ReactNode }) => {
    const [interviewActive, setInterviewActive] = useState(false)
    const [question, setQuestion] = useState<string | null>(null)

    return (
        <InterviewContext.Provider value={{ interviewActive, setInterviewActive, question, setQuestion }}>
            {children}
        </InterviewContext.Provider>
    )
}