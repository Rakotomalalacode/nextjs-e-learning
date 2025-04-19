// app/components/LogoutButton.tsx
"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false }) // Déconnexion sans redirection
    router.push("/auth/login") // Redirection vers la page de login après la déconnexion
  }

  return (
    <button onClick={handleLogout} style={{ padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
      Déconnexion
    </button>
  )
}
