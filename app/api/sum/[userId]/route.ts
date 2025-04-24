// app/api/sum/[userId]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = parseInt(url.pathname.split('/').pop() || '', 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  const result = await prisma.product.aggregate({
    where: { userId },
    _sum: { numero: true },
  });

  return NextResponse.json({ sum: result._sum.numero || 0 });
}



/*// app/api/user-products-sum/[userId]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const userId = parseInt(params.userId, 10);

  const result = await prisma.product.aggregate({
    where: { userId },
    _sum: { id: true },
  });

  return NextResponse.json({ sum: result._sum.id });
}


// app/api/sum/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adapte le chemin selon ton projet

export async function GET() {
  const result = await prisma.product.aggregate({
    _sum: {
      id: true,
    },
  });

  return NextResponse.json({ sum: result._sum.id });
}
*/