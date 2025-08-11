import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 flex p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="relative h-[300px] md:h-100 md:min-w-1/2 p-4 rounded-lg overflow-hidden">
          <Image 
            src="/MockingBird.png" 
            alt="MockingBird Logo" 
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4">Ace Your Next Software Engineering Interview</h1>
          <p className="text-xl mb-6">Practice with realistic technical mock interviews. Get immediate feedback and improve your skills.</p>
          <div>
            <Link
              href="/interview"
              className="inline-block bg-lime-300 text-black px-6 py-2 rounded-lg hover:bg-lime-500 hover:text-white transition-colors w-full text-center"
            >
              Start New Interview
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
