'use client'

import { useRef } from 'react'
import Editor, { OnMount } from "@monaco-editor/react"
import { editor } from 'monaco-editor'

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

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor
    }

   return (
        <div className="h-full w-full">
        <Editor 
            height="90%" 
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue='//Enter your code here'
            options = {editorOptions}
            onMount={handleEditorDidMount}
        />
        </div>

    )
}