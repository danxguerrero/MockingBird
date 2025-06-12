import { Timer } from "./components/Timer"
import { Question } from "./components/Question"
import { TextEditor } from "./components/TextEditor"

export default function Page() {
    return (
        <div className="flex flex-1">
            <div className="bg-color-red-500 w-2/5 flex flex-col">
                <div className="h-1/3 flex">
                    <Timer />
                </div>
                <div className="h-2/3">
                    <Question/>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <div className="h-1/2">
                    <TextEditor/>
                </div>
                <div className="h-1/2">
                    <p>Chat</p>
                </div>

            </div>
        </div>
    )
}