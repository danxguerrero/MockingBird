import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})

export const sendToGemini = async (userMessage: string, codeContent: string, conversationHistory: string[]) => {
    try {
        const prompt = `
            You are an AI interviewer conducting a coding interview.

            Current code from the candidate: ${codeContent}

            Candidate's message: ${userMessage}

            Previous conversation: ${conversationHistory.join('\n')}

            Provide a helpful, constructive response as  an interviewer. Ask follow-up questions, provide feedback on their code, or guide them through the problem only if they specifically request assistance.
        `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })

        return response.text
    } catch (error) {
        console.error('Error calling Gemini', error)
        return 'Sorry, I encountered an error. Please try again.'
    }
}