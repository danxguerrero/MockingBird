'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useInterview } from '../interview/components/InterviewContext'

export const InterviewStateManager = () => {
    const pathname = usePathname()
    const { resetInterview, interviewActive } = useInterview()

    useEffect(() => {
        // If we're not on the interview page and interview is active, reset the state
        if (pathname !== '/interview' && interviewActive) {
            resetInterview()
        }
    }, [pathname, interviewActive, resetInterview])

    // This component doesn't render anything, it just manages state
    return null
}
