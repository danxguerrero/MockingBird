'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useInterview } from '../interview/components/InterviewContext'

export const InterviewStateManager = () => {
    const pathname = usePathname()
    const { resetInterview, interviewActive, question, messages } = useInterview()

    useEffect(() => {
        // If we're not on the interview page and we have any interview data, reset the state
        if (pathname !== '/interview' && (interviewActive || question || messages.length > 0)) {
            resetInterview()
        }
    }, [pathname, interviewActive, question, messages, resetInterview])

    // This component doesn't render anything, it just manages state
    return null
}
