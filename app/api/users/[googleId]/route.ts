// app/api/user/route.ts

import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; // adapte le chemin si besoin

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const googleId = searchParams.get("U");

  if (!googleId) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { googleId },
      select: {
        image:true,
        id:true,
        createdAt:true,
        googleId:true,
        imageLocal:true,
        role:true,
        updatedAt:true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur API user:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}