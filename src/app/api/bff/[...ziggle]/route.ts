import { NextResponse } from 'next/server';

import { auth } from '@/api/auth/auth';

const router = async (
  request: Request,
  context: {
    params: { ziggle: string[] };
  },
) => {
  const url = new URL(request.url);
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const path = context.params.ziggle.join('/');
  const search = url.searchParams;
  const session = await auth();
  const res = await fetch(`${base}${path}${search}`, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await request.json()),
  });
  const json = await res.json();

  return NextResponse.json(json, res);
};

export {
  router as DELETE,
  router as GET,
  router as PATCH,
  router as POST,
  router as PUT,
};
