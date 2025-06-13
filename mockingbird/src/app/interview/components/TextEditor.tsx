'use client'

import Editor from "@monaco-editor/react"

const editorOptions = {
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
    autoClosingBrackets: "true",
    autoClosingQuotes: "true",
    autoIndent: "none",
    formatOnPaste: false,
    formatOnType: false
}

export const TextEditor = () => {
    return (
    <Editor 
        height="100%" 
        defaultLanguage="javascript"
        theme="vs-dark"
        options = {editorOptions}
    />
    )
}