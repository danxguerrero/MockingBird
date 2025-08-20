'use client'

import { useInterview } from './InterviewContext'

import { Timer } from "./Timer"
import { Question } from "./Question"
import { TextEditor } from "./TextEditor"
import { Chat } from "./Chat"

export const InterviewContent = () => {
    const { interviewActive } = useInterview()

    return (
        <div className="flex flex-1 h-screen">
            <div className="w-2/5 flex flex-col">
                <div className="h-1/3 flex border rounded-lg m-4">
                    <Timer />
                </div>
                <div className="h-2/3">
                    {interviewActive && <Question />}
                </div>
            </div>
            <div className={`w-full flex flex-col h-[90vh] min-h-0 ${interviewActive ? '' : 'justify-center items-center'}`}>
                {interviewActive && (
                    <>
                        <div className="flex-1 overflow-hidden min-h-0 border rounded-lg m-4">
                            <TextEditor />
                        </div>
                        <div className="flex-1 overflow-hidden min-h-0 border rounded-lg mx-4">
                            <Chat />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}