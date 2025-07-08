'use server'

import { GoogleGenAI } from "@google/genai"
// TODO: #20 Move Message type to be global
import type { Message } from "../interview/types"

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

export const generateFeedback = async (chatHistory: Message[]) => {
    try {
        const prompt = `You are reviewing a mock technical interview that the user just had. Based on the provided chat History, write feedback on the users performance.
        
        The feedback should focus on the following areas:
        1. Communication - Does the candidate make clarifications, communicate their approach and explain while coding?
        2. Problem Solving - Does the candidate show they understand the problem and are able to come up with a sound approach, conduct trade-offs analysis and optimize their approach?
        3. Technical Competency - How fast and accurate is the implementation? Were there syntax errors?
        4. Testing - Was the code tested for common and corner cases? Did they self-correct bugs?

        Provide a score of 1-4 for every dimension and then sum them up into an overall score. The scoring bands should be: 

        Strong hire
        Hire
        No hire
        Strong no hire

        For higher scores, give feeback on what made them great and encourage them to continue doing this or tips for improving even more.
        For lower scores, provide very brief examples of what needs improvement and how to help them improve. The overall focus is to help the user eventuall get a strong hire score.

        Chat History: 
        ${chatHistory}
        `

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })

        return response.text
    } catch (error) {
        console.error("Error calling Gemini: ", error)
        return 'Sorry, I encountered an error. Please try again.'
    }
}