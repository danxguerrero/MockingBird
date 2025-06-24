import { InterviewProvider } from './components/InterviewContext'
import { InterviewContent } from './components/InterviewContent'

export default function Page() {
    return (
        <InterviewProvider>
            <InterviewContent />
        </InterviewProvider>
    )
}