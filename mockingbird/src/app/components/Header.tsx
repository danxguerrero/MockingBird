'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Header = () => {
    const pathname = usePathname()

    return (
        <div className="border-b border-gray-700 h-16 p-6 flex justify-between items-center">
            <p>MockingBird</p>
            {pathname === '/' ? 
                <Link href="/interview" className="inline-block bg-lime-300 text-black px-3 rounded-lg hover:bg-lime-500 hover:text-white transition-colors">Start New Interview</Link> 
                : 
                <Link href="/" className="inline-block bg-lime-300 text-black px-3 rounded-lg hover:bg-lime-500 hover:text-white transition-colors">Home</Link>
            }
        </div>
    )
}