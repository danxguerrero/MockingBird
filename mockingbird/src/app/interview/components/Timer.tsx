'use client'

import { useState, useEffect} from 'react'

export const Timer = () => {
    const [interviewActive, setInterviewActive] = useState<boolean>(false)
    const [time, setTime] = useState<number>(45 * 60) // 45 minutes in seconds
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(45)

    useEffect(() => {
        if (interviewActive) {
            setTimeout(() => {
                if (time === 0) {
                    setInterviewActive(false)
                    return;
                }

                setTime(time - 1)
                setMinutes(Math.floor((time - 1) / 60))
                setSeconds((time - 1) % 60)
            }, 1000)
        }
    }, [time, interviewActive])

    return (
        <div className="border border-red-500 w-full">
            {interviewActive ? (
                <h2>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}`: seconds}</h2>
                ) : (
                <button onClick={() => setInterviewActive(true)}>Start Interview</button>
                )
            }
        </div>
    )
}