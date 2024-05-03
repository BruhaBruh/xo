import { ClassicOfflinePage } from '@/pages/Classic';
import { Metadata } from 'next';
import React from 'react';
import { ClassicGameOfflineProvider } from '@/providers/Classic';

export const metadata: Metadata = {
  title: 'Classic Offline',
};

const page: React.FC = () => (
  <ClassicGameOfflineProvider>
    <ClassicOfflinePage />
  </ClassicGameOfflineProvider>
);

export default page;
