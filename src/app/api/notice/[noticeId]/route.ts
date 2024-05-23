import { NextRequest, NextResponse } from 'next/server';

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
  const accessToken = request.cookies.get('access_token');
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}notice/${noticeId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
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
