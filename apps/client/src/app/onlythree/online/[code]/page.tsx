import { ID_COOKIE, NICKNAME_COOKIE } from '@/lib/cookie';
import { OnlyThreeOnlinePage } from '@/pages/OnlyThree';
import { InfoProvider } from '@/providers/Info';
import { OnlyThreeGameOnlineProvider } from '@/providers/OnlyThree';
import { Room } from '@xo/games';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Only Three Online',
};

const getRoom = async (
  code: string,
  userId: string,
  nickname: string
): Promise<Room<'onlythree'> | null> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/onlythree/${code}`
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
  if (!userId) redirect('/onlythree');
  const nickname = cookies().get(NICKNAME_COOKIE)?.value;
  if (!nickname) redirect('/onlythree');
  const room = await getRoom(code, userId, nickname);
  if (!room) redirect('/onlythree');

  return (
    <InfoProvider userId={userId} nickname={nickname} room={room.info}>
      <OnlyThreeGameOnlineProvider state={room.state}>
        <OnlyThreeOnlinePage />
      </OnlyThreeGameOnlineProvider>
    </InfoProvider>
  );
};

export default page;
