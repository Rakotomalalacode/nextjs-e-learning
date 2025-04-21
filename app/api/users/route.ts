import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adapte le chemin selon ton projet

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const googleId = searchParams.get("U");

  if (!googleId) {
    return NextResponse.json({ error: "Paramètre 'id' manquant." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { googleId },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}