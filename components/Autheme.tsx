import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import { IoCartOutline } from "react-icons/io5"

export default async function Autheme() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      {session ? (
        <div className="flex gap-8">
          <div className="transition-transform duration-300 hover:scale-105">
            <div className="z-0 ml-4 absolute">
              <span className="relative flex h-4  w-4">
                <span className="absolute h-full w-full animate-ping rounded-full bg-oranground opacity-25"></span>
                <span className="relative text-sm h-4 w-4 rounded-full flex items-center justify-center bg-oranground text-white">
                  0
                </span>
              </span>
            </div>
            <IoCartOutline size={23} className="mt-2" />
          </div>
          <Link
            href="/dashboard"
            className="bg-oranground hover:bg-oranground/90 text-white rounded-sm py-2 px-7"
          >dashboard</Link>
          <ThemeToggle />
        </div>
      ) : (
        <div className="flex gap-8">
          <div className="transition-transform duration-300 hover:scale-105">
            <div className="z-0 ml-4 absolute">
              <span className="relative flex h-4  w-4">
                <span className="absolute h-full w-full animate-ping rounded-full bg-oranground opacity-25"></span>
                <span className="relative text-sm h-4 w-4 rounded-full flex items-center justify-center bg-oranground text-white">
                  0
                </span>
              </span>
            </div>
            <IoCartOutline size={23} className="mt-2" />
          </div>
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