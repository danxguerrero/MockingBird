'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'
import { useInterview } from './InterviewContext'
import { generateQuestionFromGemini } from '../actions'
import type { Message } from '../../types/message'

export const Timer = () => {
    const { interviewActive, setInterviewActive, setQuestion, time, setTime, setMessages, setCode } = useInterview()
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const router = useRouter()

    useEffect(() => {
        if (interviewActive) {
            const timeout = setTimeout(() => {
                if (time === 0) {
                    setInterviewActive(false)
                    setCode('// Enter your code here')
                    setQuestion("")
                    router.push('/feedback')
                    return
                }

                setTime(time - 1)
            }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [time, interviewActive])

    const activateInterview = async () => {
        setInterviewActive(true)
        const geminiQuestion = await generateQuestionFromGemini()
        setQuestion(geminiQuestion ?? "No question generated.")

        // Add initial AI message
        const initialMessage: Message = {
            id: Date.now(),
            text: "Hello! I'm your AI interviewer today. Please introduce yourself and tell me a bit about your background and experience. Then we'll dive into the coding question.",
            sender: 'ai'
        }
        setMessages([initialMessage])
    }

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
                <button onClick={activateInterview} className="bg-lime-300 text-black p-2 rounded-lg hover:text-white hover:bg-lime-500 transition-colors">Start Interview</button>
            )}
        </div>
    )
}