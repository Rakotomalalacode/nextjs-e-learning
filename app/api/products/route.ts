import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const tagcours = formData.get('tagcours') as string;
    const prixcours = parseFloat(formData.get('prixcours') as string);
    const maincoursFile = formData.get('maincours') as File | null;
    const intocoursFile = formData.get('intocours') as File | null;
    const thumcoursFile = formData.get('thumcours') as File | null;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }
  
    // Récupère l'utilisateur connecté
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!name || !tagcours || isNaN(prixcours)) {
      return NextResponse.json({ error: 'Le nom, la catégorie et le prix sont requis.' }, { status: 400 });
    }

    const courseData: any = {
      name,
      description,
      tag: tagcours,
      price: prixcours,
    };
    console.log(courseData)
    // Gestion de l'upload des fichiers
    if (maincoursFile) {
      const bytes = await maincoursFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const maincoursFilename = Date.now() + '-' + maincoursFile.name;
      const maincoursPath = path.join(process.cwd(), 'public', 'uploads', maincoursFilename); // Assurez-vous que le dossier 'public/uploads' existe
      await writeFile(maincoursPath, buffer);
      courseData.maincoursUrl = `/uploads/${maincoursFilename}`; // Stockez le chemin relatif dans la base de données
    }

    if (intocoursFile) {
      const bytes = await intocoursFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const intocoursFilename = Date.now() + '-' + intocoursFile.name;
      const intocoursPath = path.join(process.cwd(), 'public', 'uploads', intocoursFilename);
      await writeFile(intocoursPath, buffer);
      courseData.intocoursUrl = `/uploads/${intocoursFilename}`;
    }

    if (thumcoursFile) {
      const bytes = await thumcoursFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const thumcoursFilename = Date.now() + '-' + thumcoursFile.name;
      const thumcoursPath = path.join(process.cwd(), 'public', 'uploads', thumcoursFilename);
      await writeFile(thumcoursPath, buffer);
      courseData.thumbnailUrl = `/uploads/${thumcoursFilename}`;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        tag: tagcours,
        price: prixcours,
        maincoursUrl: courseData.maincoursUrl,
        intocoursUrl: courseData.intocoursUrl,
        thumbnailUrl: courseData.thumbnailUrl,
       
            userId: user.id, // Remplacez userId par l'ID de l'utilisateur connecté
         
      },
    });

    return NextResponse.json(newProduct);
  } catch (error: any) {
    console.error('Erreur lors de l\ajout du produit:', error);
    
    return NextResponse.json({ error: 'Erreur serveur lors de l\'ajout du produit.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}