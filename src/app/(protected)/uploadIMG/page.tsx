// 'use client';

// import dynamic from 'next/dynamic';
// import React from 'react';

// const ThreeDViewer = dynamic(
//   () => import('@/components/common/ThreeDViewer'),
//   { ssr: false }
// );

// const Page = () => {
//   return (
//     <div>
//       <ThreeDViewer />
//     </div>
//   );
// };

// export default Page;

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

const ThreeDViewer = dynamic(
  () => import('@/components/common/ThreeDViewer'),
  { ssr: false }
);

const Page = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div>
      <ThreeDViewer />
    </div>
  );
};

export default Page;
