import Link from "next/link";

export default function Home() {
  return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1>MockingBird</h1>
          <p>Practice your technical interview skills with AI</p>
          <div className="space-y-4">
            <Link 
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start New Interview
            </Link>
          </div>
        </div>
      </main>
  );
}
