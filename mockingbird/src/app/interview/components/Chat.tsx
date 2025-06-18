'use client'

import { useState } from 'react'

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([])
    const [message, setMessage] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMessages([...messages, message])
        setMessage("")
    }

    return <div className="h-full">
        <div className="h-9/10">
            {messages.map((userMessage, idx)=> <p key={idx}>{userMessage}</p>)}
        </div>
        <form 
            className="h-1/10 flex"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                value={message}
                className="w-9/10 border rounded-lg"
                onChange={e => setMessage(e.target.value)}
            />
            <input type="submit" value="Send Message" className="bg-lime-500 w-1/10 rounded-lg"></input>
        </form>
    </div>
}