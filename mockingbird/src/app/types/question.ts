interface Question {
    id: string
    description: string
    difficulty: 'easy' | 'medium' | 'hard'
}

interface QuestionsData {
    questions: Question[]
}

export type { Question, QuestionsData}