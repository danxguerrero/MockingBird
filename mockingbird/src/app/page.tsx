import Link from "next/link";

export default function Home() {
  return (
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-slate-500 rounded-lg p-8 h-100 flex flex-col items-center justify-center">
          <h1>MockingBird</h1>
          <p>Practice your technical interview skills with AI</p>
          <div className="space-y-4">
            <Link 
              href="/interview"
              className="inline-block bg-lime-300 text-black px-6 rounded-lg hover:bg-lime-500 hover:text-white transition-colors"
            >
              Start New Interview
            </Link>
          </div>
        </div>
        <div className="flex justify-around p-12">
          <div className="bg-slate-500 h-60 w-80 rounded-lg">
            <p>Realistic Interview Simulations</p>
          </div>
          <div className="bg-slate-500 h-60 w-80 rounded-lg">
            <p>Immediate Feedback and Analysis</p>
          </div>
          <div className="bg-slate-500 h-60 w-80 rounded-lg"></div>
        </div>
      </main>
  );
}
