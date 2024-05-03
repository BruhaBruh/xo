import { ClassicPage } from '@/pages/Classic';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Classic',
};

const page: React.FC = () => <ClassicPage />;

export default page;
