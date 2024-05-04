import { OnlyThreeOfflinePage } from '@/pages/OnlyThree';
import { OnlyThreeGameOfflineProvider } from '@/providers/OnlyThree';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Only Three Offline',
};

const page: React.FC = () => (
  <OnlyThreeGameOfflineProvider>
    <OnlyThreeOfflinePage />
  </OnlyThreeGameOfflineProvider>
);

export default page;
