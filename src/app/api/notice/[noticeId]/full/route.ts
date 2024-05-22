import { NextRequest, NextResponse } from 'next/server';
import * as process from 'node:process';
import { NoticeDetail } from '@/api/notice/notice';

export async function GET(
  request: NextRequest,
  {
    params: { noticeId },
  }: {
    params: { noticeId: string };
  },
): Promise<
  NextResponse<
    NoticeDetail & {
      enTitle?: string;
      enContent?: string;
    }
  >
> {
  const responseKo = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}notice/${noticeId}?lang=ko`,
  );

  const notice = await responseKo.json();

  if (notice.langs.includes('en')) {
    const responseEn = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}notice/${noticeId}?lang=en`,
    );

    const noticeEn = await responseEn.json();

    notice.enContent = noticeEn.content;
    notice.enTitle = noticeEn.title;
  }

  return NextResponse.json(notice);
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}notice`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
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
