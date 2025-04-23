"use client"

import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"
import { IoCartOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation"

const ENCRYPTION_URL = "ny_avy_any_tonga_aty_ny_aty_tonga_any"
export default function Autheme() {
  const [linksSignin, setLinksSignin] = useState('');
  const { data: session, status } = useSession();
  const [baseUrl, setBaseUrl] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentBaseUrl = window.location.origin;
      setBaseUrl(currentBaseUrl);
      const encryptedURL = CryptoJS.AES.encrypt(
        currentBaseUrl.toString(),
        ENCRYPTION_URL
      ).toString();
      setLinksSignin(`/auth/signin?${encryptedURL}${encryptedURL}`);
    }
  }, []);



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
          <button
            onClick={() => {
              if (session?.user?.role) {
                const ENCRYPTION_URLS = "ny_avy_any_tonga_aty_ny_aty_tonga_any"
                const cryptGoogleId = CryptoJS.AES.encrypt(
                  session.user?.googleId.toString(),
                  ENCRYPTION_URLS
                ).toString();
                router.push(`/dashboard/${session.user.role}?${cryptGoogleId}&${cryptGoogleId}&U=${session.user.googleId}&${session.user?.email}`);
              }
            }}
            className="bg-oranground hover:bg-oranground/90 text-white rounded-sm py-2 px-7"
          >Compte</button>
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
            href={linksSignin}
            className="bg-oranground hover:bg-oranground/90 text-white rounded-sm py-2 px-7"
          >Se connecter</Link>
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}