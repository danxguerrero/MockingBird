'use client'

import { InterviewProvider } from '../interview/components/InterviewContext'
import { InterviewStateManager } from './InterviewStateManager'

export const InterviewWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <InterviewProvider>
            <InterviewStateManager />
            {children}
        </InterviewProvider>
    )
}
