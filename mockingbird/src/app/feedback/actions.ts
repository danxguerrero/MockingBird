'use server'

import { GoogleGenAI } from "@google/genai"
// TODO: #20 Move Message type to be global
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
        // For now, we'll use a simple approach with a service like Resend or Nodemailer
        // You'll need to set up an email service provider
        
        const emailContent = `
Subject: Your Interview Feedback from MockingBird

Hi there!

Here's your interview feedback from your recent mock technical interview:

${feedback}

---
Interview Summary:
- Total messages: ${messages.length}
- Interview date: ${new Date().toLocaleDateString()}

Best regards,
The MockingBird Team
        `

        // Option 1: Using Resend (recommended for production)
        // You'll need to install: npm install resend
        // And set up RESEND_API_KEY in your environment variables
        
        // Option 2: Using Nodemailer (for custom SMTP)
        // You'll need to install: npm install nodemailer
        
        // For now, we'll simulate the email sending
        console.log('Email would be sent to:', email)
        console.log('Email content:', emailContent)
        
        // TODO: Implement actual email sending
        // Example with Resend:
        // const { Resend } = require('resend');
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: 'feedback@yourdomain.com',
        //   to: email,
        //   subject: 'Your Interview Feedback from MockingBird',
        //   html: emailContent
        // });
        
        return { success: true, message: 'Email sent successfully!' }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, message: 'Failed to send email. Please try again.' }
    }
}