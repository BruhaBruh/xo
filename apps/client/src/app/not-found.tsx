import { redirect } from 'next/navigation';
import React from 'react';

const NotFound: React.FC = () => {
  redirect('/');
};

export default NotFound;
