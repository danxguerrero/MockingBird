'use client'

import { useRef } from 'react'
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

export const TextEditor = () => {

    const { code, setCode } = useInterview()
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

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


   return (
        <div className="h-full w-full">
        <Editor 
            height="calc(50vh - 1rem)" 
            defaultLanguage="python"
            theme="vs-dark"
            defaultValue='//Enter your code here'
            options = {editorOptions}
            onMount={handleEditorDidMount}
            onChange = {handleEditorChange}
        />
        </div>

    )
}