import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/api/auth/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { noticeId: string } },
) {
  const { noticeId } = params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}notice/${noticeId}/additional`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  if (response.status === 401) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
