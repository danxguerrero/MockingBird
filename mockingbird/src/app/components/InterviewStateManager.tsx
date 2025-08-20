'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useInterview } from '../interview/components/InterviewContext'

export const InterviewStateManager = () => {
    const pathname = usePathname()
    const { resetInterview, interviewActive, question, messages } = useInterview()

    useEffect(() => {
        // Only reset if we're not on interview or feedback pages and we have interview data
        if (pathname !== '/interview' && pathname !== '/feedback' && (interviewActive || question || messages.length > 0)) {
            resetInterview()
        }
    }, [pathname, interviewActive, question, messages, resetInterview])

    // This component doesn't render anything, it just manages state
    return null
}
