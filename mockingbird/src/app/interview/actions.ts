'use server'

import { GoogleGenAI } from '@google/genai'
import fs from 'fs'
import path from 'path'
import type { Question, QuestionsData } from '../types/question'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export const sendToGemini = async (userMessage: string, codeContent: string, conversationHistory: string[], codeQuestion: string | null) => {
    try {
        const prompt = `
            You are an AI interviewer conducting a coding interview.

            Current code from the candidate: ${codeContent}

            Coding Question that the user should answer: ${codeQuestion}

            Candidate's message: ${userMessage}

            Previous conversation: ${conversationHistory.join('\n')}

            Provide a helpful, constructive response as  an interviewer. Ask follow-up questions, provide feedback on their code, encourage them to ask clarifying questions or guide them through the problem only if they specifically request assistance.

            Your response should be fairly short and concise. There is no need to reiterate the user's response unless they ask for it. Instead, let the user know briefly if they are on the right track or not.

            The user should be able to see the coding question so no need to say the question unless mentioned above that you should generate one. 
            
            When the user says they are done, ask them to walk through the code with an example, inquire about Big O notation for space and time and then ask them follow up questions to see how they would adjust their code.

            Be sure to remain on topic and do not deviate from the coding interview. If the user asks a question that is not related to the coding interview, politely tell them that you are not able to answer that question and ask them to focus on the coding interview.
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

export const getRandomQuestion = async (difficulty?: 'easy' | 'medium' | 'hard'): Promise<Question | null> => {
    try {
        // Read the questions.json file
        const questionsPath = path.join(process.cwd(), 'src', 'app', 'data', 'questions.json')
        const fileContent = fs.readFileSync(questionsPath, 'utf-8')
        const questionsData: QuestionsData = JSON.parse(fileContent)
        
        // Filter questions by difficulty if specified
        let availableQuestions = questionsData.questions
        if (difficulty) {
            availableQuestions = questionsData.questions.filter(q => q.difficulty === difficulty)
        }
        
        // Return null if no questions match the criteria
        if (availableQuestions.length === 0) {
            console.error('No questions available for the specified difficulty level')
            return null
        }
        
        // Select a random question
        const randomIndex = Math.floor(Math.random() * availableQuestions.length)
        return availableQuestions[randomIndex]
        
    } catch (error) {
        console.error('Error reading questions from file:', error)
        return null
    }
}