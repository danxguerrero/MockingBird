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
        <div className="w-full flex justify-center items-center">
            {interviewActive ? (
                <div className="flex space-x-4 flex-1 w-full justify-center">
                    <div className="flex flex-col gap-4 items-center justify-center w-1/4 text-center">
                        <p className="text-4xl p-3 bg-lime-300 text-black rounded-lg w-full">{minutes < 10 ? `0${minutes}` : minutes}</p>
                        <p>Minutes</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center justify-center w-1/4">
                        <p className="text-4xl p-3 bg-lime-300 text-black rounded-lg w-full text-center">{seconds < 10 ? `0${seconds}` : seconds}</p>
                        <p>Seconds</p>
                    </div>
                </div>
            ) : (
                <button onClick={() => setInterviewActive(true)} className="bg-lime-300 text-black p-2 rounded-lg hover:text-white hover:bg-lime-500 transition-colors">Start Interview</button>
            )}
        </div>
    )
}