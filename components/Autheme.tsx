import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"

export default async function Autheme() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      {session ? (
        <Link href="/dashboard" className="text-blue-500 underline">Aller au dashboard</Link>
      ) : (
        <div className="flex gap-8">
          <Link 
          href="/auth/signin" 
                          className="bg-oranground hover:bg-oranground/90 text-white rounded-sm py-2 px-7"
          >Se connecter</Link>
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}