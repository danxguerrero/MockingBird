import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <div className="w-full bg-slate-500 rounded-lg p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">MockingBird</h1>
        <p className="text-xl mb-6">Practice your technical interview skills with AI</p>
        <div>
          <Link 
            href="/interview"
            className="inline-block bg-lime-300 text-black px-6 py-2 rounded-lg hover:bg-lime-500 hover:text-white transition-colors min-w-[160px] text-center"
          >
            Start New Interview
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-500 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px]">
          <p className="text-xl font-semibold">Realistic Interview Simulations</p>
        </div>
        <div className="bg-slate-500 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px]">
          <p className="text-xl font-semibold">Immediate Feedback and Analysis</p>
        </div>
        <div className="bg-slate-500 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px]">
          <p className="text-xl font-semibold">AI-Powered Learning</p>
        </div>
      </div>
    </main>
  );
}
