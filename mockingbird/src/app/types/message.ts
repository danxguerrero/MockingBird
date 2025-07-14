// This is the type used for the chat messages in the interview
export type Message = {
    id: number
    text: string
    sender: 'user' | 'ai'
}