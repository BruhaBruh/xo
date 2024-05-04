import { MatrixOfflinePage } from '@/pages/Matrix';
import { MatrixGameOfflineProvider } from '@/providers/Matrix';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Matrix Offline',
};

const page: React.FC = () => (
  <MatrixGameOfflineProvider>
    <MatrixOfflinePage />
  </MatrixGameOfflineProvider>
);

export default page;
