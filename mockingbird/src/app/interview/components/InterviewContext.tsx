'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type InterviewContextType = {
    interviewActive: boolean
    setInterviewActive: (active: boolean) => void
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if (!context) throw new Error("useInterview must be used within InterviewProvider")
    return context
}

export const InterviewProvider = ({ children }: {children: ReactNode }) => {
    const [interviewActive, setInterviewActive] = useState(false)

    return (
        <InterviewContext.Provider value={{ interviewActive, setInterviewActive }}>
            {children}
        </InterviewContext.Provider>
    )
}