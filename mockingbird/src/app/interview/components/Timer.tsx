'use client'

import { useState} from 'react'

export const Timer = () => {
    const [interviewActive, setInterviewActive] = useState(false)

    return (
        <div>
            {interviewActive ? <p>Interview Active</p> : <button onClick={()=>setInterviewActive(true)}>Start Interview</button>}
        </div>
    )
}