'use client'

import { useState } from 'react'

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    return <div className="h-full">
        <div className="h-9/10 border border-blue-500">
            {messages.map(message => <p>{message}</p>)}
        </div>
        <form className="border border-red-500 h-1/10 flex">
            <input type="text" className="w-9/10 border rounded-lg"></input>
            <input type="submit" value="Send Message" className="bg-lime-500 w-1/10 rounded-lg"></input>
        </form>
    </div>
}