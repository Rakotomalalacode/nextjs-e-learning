'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import GoogleImage from "@/public/images/google-icon-logo.svg"
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="lg:p-16 p-10 text-center rounded-lg lg:rounded-3xl bg-darkwhite">
      <h1 className="text-3xl mb-6">Connexion ou Inscription</h1>
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-1 lg:gap-6 border-2 border-gray-200 p-4 lg:px-6 rounded-lg"
      >
       <Image
        src={GoogleImage} 
        alt={"GoogleImage"} 
        width={30}
        /> 
        <p className="lg:text-xl text-sm">Se connecter avec Google</p>
      </button>
      </div>
    </div>
  )
}
