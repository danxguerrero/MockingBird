import type { Message } from '../../types/message'

export const ChatHistory = ({ messages }: { messages: Message[] }) => {

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Chat History</h2>
            <div className="space-y-2">
                {messages.map((msg) => (
                    <div key={msg.id} className="border p-2 rounded">
                        <strong className={msg.sender == "user" ? "text-blue-600" : "text-gray-600"}>
                            {msg.sender === "user" ? "You" : "Interviewer"}
                        </strong>
                        <p className="ml-2">{msg.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}