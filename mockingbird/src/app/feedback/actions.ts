'use server'

import { GoogleGenAI } from "@google/genai"
import type { Message } from "../types/message"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export const generateFeedback = async (chatHistory: Message[]) => {
    try {
        const historyString = chatHistory
            .map(msg => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`)
            .join('\n')

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
        ${historyString}
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

export const sendFeedbackEmail = async (email: string, feedback: string, messages: Message[]) => {
    try {
        // Importing Resend dynamically to avoid issues with server-side rendering
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Interview Feedback</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .feedback-section { background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 20px; }
        .summary { background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin-top: 20px; }
        .footer { text-align: center; color: #6c757d; font-size: 14px; margin-top: 30px; }
        h1 { color: #2c3e50; margin-bottom: 10px; }
        h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        .pre-wrap { white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Your Interview Feedback from MockingBird</h1>
        <p>Hi there! Here's your comprehensive feedback from your recent mock technical interview.</p>
    </div>
    
    <div class="feedback-section">
        <h2>📝 Detailed Feedback</h2>
        <div class="pre-wrap">${feedback}</div>
    </div>
    
    <div class="summary">
        <h2>📊 Interview Summary</h2>
        <ul>
            <li><strong>Total messages exchanged:</strong> ${messages.length}</li>
            <li><strong>Interview date:</strong> ${new Date().toLocaleDateString()}</li>
            <li><strong>Interview time:</strong> ${new Date().toLocaleTimeString()}</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>Keep practicing and you'll ace your next interview! 🚀</p>
        <p><strong>The MockingBird Team</strong></p>
        <p><em>This email was sent from MockingBird - Your AI Interview Coach</em></p>
    </div>
</body>
</html>
        `

        // Send email 
        const result = await resend.emails.send({
            from: 'MockingBird <feedback@resend.dev>', 
            to: [email],
            subject: '🎯 Your Interview Feedback from MockingBird',
            html: htmlContent,
            text: `Your Interview Feedback from MockingBird\n\n${feedback}\n\n---\nInterview Summary:\n- Total messages: ${messages.length}\n- Interview date: ${new Date().toLocaleDateString()}\n\nBest regards,\nThe MockingBird Team`
        })

        if (result.error) {
            console.error('Resend error:', result.error)
            return { 
                success: false, 
                message: `Failed to send email: ${result.error.message}` 
            }
        }

        console.log('Email sent successfully:', result.data?.id)
        return { 
            success: true, 
            message: 'Email sent successfully! Check your inbox.' 
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return { 
            success: false, 
            message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }
    }
}