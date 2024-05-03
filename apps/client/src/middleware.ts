import { ID_COOKIE, NICKNAME_COOKIE } from '@/lib/cookie';
import { randomId } from '@xo/games';
import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = (req) => {
  const userId = req.cookies.get(ID_COOKIE)?.value;
  const nickname = req.cookies.get(NICKNAME_COOKIE)?.value;

  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set({
      name: ID_COOKIE,
      value: randomId(),
      maxAge: 2147483647,
      sameSite: 'lax',
    });
  }

  if (!nickname) {
    res.cookies.set({
      name: NICKNAME_COOKIE,
      value: `P-${randomId().substring(0, 4)}`,
      maxAge: 2147483647,
      sameSite: 'lax',
    });
  }

  return res;
};

export const config: MiddlewareConfig = {
  matcher: ['/:path*'],
};
