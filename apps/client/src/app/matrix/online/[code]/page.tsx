import { ID_COOKIE, NICKNAME_COOKIE } from '@/lib/cookie';
import { MatrixOnlinePage } from '@/pages/Matrix';
import { InfoProvider } from '@/providers/Info';
import { MatrixGameOnlineProvider } from '@/providers/Matrix';
import { Room } from '@xo/games';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Matrix Online',
};

const getRoom = async (
  code: string,
  userId: string,
  nickname: string
): Promise<Room<'matrix'> | null> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/matrix/${code}`
  );

  url.searchParams.set('userId', userId);
  url.searchParams.set('nickname', nickname);

  const res = await fetch(url, {
    cache: 'no-cache',
  });
  const room = await res.json();

  if (res.status !== 200) {
    return null;
  }

  return room;
};

const page: React.FC<{
  params: { code: string };
}> = async ({ params: { code } }) => {
  const userId = cookies().get(ID_COOKIE)?.value;
  if (!userId) redirect('/matrix');
  const nickname = cookies().get(NICKNAME_COOKIE)?.value;
  if (!nickname) redirect('/matrix');
  const room = await getRoom(code, userId, nickname);
  if (!room) redirect('/matrix');

  return (
    <InfoProvider userId={userId} nickname={nickname} room={room.info}>
      <MatrixGameOnlineProvider state={room.state}>
        <MatrixOnlinePage />
      </MatrixGameOnlineProvider>
    </InfoProvider>
  );
};

export default page;
