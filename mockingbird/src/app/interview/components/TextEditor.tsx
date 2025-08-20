'use client'

import { useRef, useState } from 'react'
import Editor, { OnMount, OnChange } from "@monaco-editor/react"
import { editor } from 'monaco-editor'
import { useInterview } from './InterviewContext'

// TODO #22: Implement an option to allow users to 

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    roundedSelection: false,
    scrollbar: {
        vertical: "visible" as const,
        horizontal: "visible" as const
    },
    // Disable all auto-completion features
    suggestOnTriggerCharacters: false,
    quickSuggestions: false,
    parameterHints: { enabled: false },
    suggest: { showWords: false },
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "none",
    formatOnPaste: false,
    formatOnType: false
}

// Langauges user can choose from. 
const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' }
]

export const TextEditor = () => {
    const { code, setCode } = useInterview()
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
    const [language, setLanguage] = useState('python')

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor

        if (code) {
            editor.setValue(code)
        }
    }

    const handleEditorChange: OnChange = (value) => {
        if (value !== undefined) {
            setCode(value)
        }
    }

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage)
        // Clear the editor when changing languages
        if (editorRef.current) {
            editorRef.current.setValue('')
        }
        setCode('')
    }

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-end gap-2 p-2 bg-neutral-800 border-b flex-shrink-0">
                <label htmlFor="language-select" className="text-sm font-medium text-white">
                    Language:
                </label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1 border border-lime-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    defaultValue='//Enter your code here'
                    options={editorOptions}
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    )
}