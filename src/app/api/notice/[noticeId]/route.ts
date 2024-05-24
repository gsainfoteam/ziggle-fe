import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/api/auth/auth';

export async function DELETE(
  request: NextRequest,
  {
    params: { noticeId },
  }: {
    params: {
      noticeId: string;
    };
  },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}notice/${noticeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 401) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (response.status === 403) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
