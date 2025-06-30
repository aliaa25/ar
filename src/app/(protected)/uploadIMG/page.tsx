'use client';
import dynamic from 'next/dynamic';
const ThreeDViewer = dynamic(
  () => import('@/components/common/ThreeDViewer'),
  { ssr: false }
);

const Page = () => {
  return (
    <>
      <ThreeDViewer />
    </>
  );
};

export default Page;
