'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ThreeDViewer = dynamic(
  () => import('@/components/common/ThreeDViewer'),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <ThreeDViewer />
    </div>
  );
};

export default Page;
