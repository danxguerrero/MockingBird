'use server'

import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})

export const sendToGemini = async (userMessage: string, codeContent: string, conversationHistory: string[], codeQuestion: string | null) => {
    try {
        const prompt = `
            You are an AI interviewer conducting a coding interview.

            Current code from the candidate: ${codeContent}

            Coding Question that the user should answer: ${codeQuestion}

            Candidate's message: ${userMessage}

            Previous conversation: ${conversationHistory.join('\n')}

            Provide a helpful, constructive response as  an interviewer. Ask follow-up questions, provide feedback on their code, encourage them to ask clarifying questions or guide them through the problem only if they specifically request assistance.

            The user should be able to see the coding question so no need to say the question unless mentioned above that you should generate one. 
            
            When the user says they are done, ask them to walk through the code with an example, inquire about Big O notation for space and time and then ask them follow up questions to see how they would adjust their code.
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

export const generateQuestionFromGemini = async () => {
    try {
        const prompt = `Generate an Leetcode style coding prompt for a mock interview. The coding question should be of easy or medium difficulty. Please do not provide any other information or text other than the prompt. For example, just respond back with:

        "Write a function that determines if a string is a palindrome."
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