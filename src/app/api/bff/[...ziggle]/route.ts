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
  const newReq = new Request(`${base}${path}?${search}`, request);
  newReq.headers.set('Authorization', `Bearer ${session?.accessToken}`);
  const res = await fetch(newReq);
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
