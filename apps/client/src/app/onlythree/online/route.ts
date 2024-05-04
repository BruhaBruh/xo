import { ID_COOKIE, NICKNAME_COOKIE } from '@/lib/cookie';
import { Room, randomId } from '@xo/games';
import { NextRequest, NextResponse } from 'next/server';

const createRoom = async (
  userId: string,
  nickname: string
): Promise<Room<'onlythree'> | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/onlythree`,
    {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        nickname,
      }),
    }
  );
  const room = await res.json();

  if (res.status !== 200) {
    return null;
  }

  return room;
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const userId = req.cookies.get(ID_COOKIE)?.value || randomId();

  const nickname =
    req.cookies.get(NICKNAME_COOKIE)?.value ||
    `P-${randomId().substring(0, 4)}`;

  const room = await createRoom(userId, nickname);
  if (!room) return NextResponse.redirect(new URL('/onlythree', req.url));

  const res = NextResponse.redirect(
    new URL(`/onlythree/online/${room.info.code}`, req.url)
  );

  res.cookies.set({
    name: ID_COOKIE,
    value: userId,
    maxAge: 2147483647,
    sameSite: 'lax',
  });

  res.cookies.set({
    name: NICKNAME_COOKIE,
    value: nickname,
    maxAge: 2147483647,
    sameSite: 'lax',
  });

  return res;
};
