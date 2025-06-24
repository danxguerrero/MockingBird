'use client'

import { useInterview } from './InterviewContext'

import { Timer } from "./Timer"
import { Question } from "./Question"
import { TextEditor } from "./TextEditor"
import { Chat } from "./Chat"

export const InterviewContent = () => {
    const { interviewActive } = useInterview()

    return (
        <div className="flex flex-1">
            <div className="bg-color-red-500 w-2/5 flex flex-col">
                <div className="h-1/3 flex">
                    <Timer />
                </div>
                <div className="h-2/3">
                    {interviewActive && <Question/>}
                </div>
            </div>
            <div className="w-full flex flex-col">
                <div className="h-1/2">
                    {interviewActive && <TextEditor/>}
                </div>
                <div className="h-1/2">
                    {interviewActive && <Chat/>}
                </div>

            </div>
        </div>
    )
}