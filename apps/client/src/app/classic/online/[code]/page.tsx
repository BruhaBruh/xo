import { ID_COOKIE, NICKNAME_COOKIE } from '@/lib/cookie';
import { ClassicOnlinePage } from '@/pages/Classic';
import { ClassicGameOnlineProvider } from '@/providers/Classic';
import { InfoProvider } from '@/providers/Info';
import { Room } from '@xo/games';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Classic Online',
};

const getRoom = async (
  code: string,
  userId: string,
  nickname: string
): Promise<Room<'classic'> | null> => {
  const url = new URL(
    `http://${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/classic/${code}`
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
  if (!userId) redirect('/classic');
  const nickname = cookies().get(NICKNAME_COOKIE)?.value;
  if (!nickname) redirect('/classic');
  const room = await getRoom(code, userId, nickname);
  if (!room) redirect('/classic');

  return (
    <InfoProvider userId={userId} nickname={nickname} room={room.info}>
      <ClassicGameOnlineProvider state={room.state}>
        <ClassicOnlinePage />
      </ClassicGameOnlineProvider>
    </InfoProvider>
  );
};

export default page;
