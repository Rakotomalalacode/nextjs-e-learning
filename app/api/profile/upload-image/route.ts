// app/api/profile/upload-image/route.ts (pour App Router)
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!userId || !imageFile) {
      return NextResponse.json({ message: 'ID utilisateur et image requis.' }, { status: 400 });
    }

    const buffer = await imageFile.arrayBuffer();
    const bytes = Buffer.from(buffer);
    const fileExtension = path.extname(imageFile.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'profile');
    const filePath = path.join(uploadDir, uniqueFilename);
    const imageUrl = `/profile/${uniqueFilename}`;

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, bytes);

    const updatedUser = await prisma.user.update({
      where: { email: userId }, // Convertir userId en Int
      data: { imageLocal: imageUrl },
      select: {
        imageLocal:true,
      }
    });

    return NextResponse.json({ message: 'Image de profil mise à jour avec succès', imageUrl: updatedUser.imageLocal });
  } catch (error: any) {
    console.error('Erreur lors du téléversement de l\'image:', error);
    return NextResponse.json({ message: 'Erreur lors du téléversement de l\'image.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'GET request not supported for this route.' }, { status: 405 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: 'PUT request not supported for this route.' }, { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: 'DELETE request not supported for this route.' }, { status: 405 });
}