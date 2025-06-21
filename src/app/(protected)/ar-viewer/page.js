import { Suspense } from "react";

import ArViewerClient from "@/components/common/ArViewerClient";
export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading AR Viewer...</div>}>
      <ArViewerClient />
    </Suspense>
  );
}
