import { OnlyThreePage } from '@/pages/OnlyThree';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Only Three',
};

const page: React.FC = () => <OnlyThreePage />;

export default page;
