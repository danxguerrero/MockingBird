export const Question = () => {
    return (
        <div className="flex flex-col gap-3 mx-10 max-w-60">
            <h2 className="text-xl font-semibold">Question</h2>
            <div className="break-words whitespace-normal">
                This is where the Questions content will be. 
                <br/><br/>
                Sample Question
                <br/><br/>
                Remove all digits from a string and replace them with # symbol.
                <br/><br/>
                Example 1: "12345" should return "#####"
                <br/>
                <br/>
                Example 2: "1!2@3#4$" should return "#!#@###$"
            </div>
        </div>
    )
}