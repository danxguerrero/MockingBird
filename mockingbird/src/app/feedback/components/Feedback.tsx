export const Feedback = ({isLoading, feedback}: {isLoading: boolean, feedback: string}) => {
    return (
    <div className="border p-4 rounded-lg h-3/5 mb-4 min-h-0 overflow-y-auto">
    <h2 className="text-lg font-semibold mb-2">Feedback</h2>
    {isLoading && <div className="text-blue-600">Generating feedback...</div>}
    <p className="whitespace-pre-wrap">{feedback}</p>
</div>
    )
}