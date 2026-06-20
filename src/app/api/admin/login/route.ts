import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedId = process.env.ADMIN_USERNAME || 'Asset01';
    const expectedPass = process.env.ADMIN_PASSWORD || 'AGOV0010';

    if (username === expectedId && password === expectedPass) {
      cookies().set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ detail: 'بيانات الدخول غير صحيحة' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ detail: 'حدث خطأ' }, { status: 500 });
  }
}
