import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const total = await prisma.student.count();
    const quranCount = await prisma.student.count({
      where: {
        quran_memorized: { not: "لا أحفظ" }
      }
    });

    const recent = await prisma.student.findMany({
      take: 5,
      orderBy: { submitted_at: 'desc' }
    });

    return NextResponse.json({
      total_submissions: total,
      quran_memorizers: quranCount,
      talents_count: 0,
      recent_submissions: recent
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
