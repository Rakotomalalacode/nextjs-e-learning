import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <img src={session?.user?.image || ""} alt="Photo de profil" className="w-20 h-20 rounded-full mt-4" />
      <form action="/api/auth/signout" method="post">
        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded">Se déconnecter</button>
      </form>
    </div>
  )
}
