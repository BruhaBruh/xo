import { MatrixPage } from '@/pages/Matrix';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Matrix',
};

const page: React.FC = () => <MatrixPage />;

export default page;
