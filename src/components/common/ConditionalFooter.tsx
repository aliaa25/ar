"use client";

import { useFooter } from "@/components/providers/FooterContext";
import Footer from "@/components/common/Footer";

export default function ConditionalFooter() {
  const { showFooter } = useFooter();

  if (!showFooter) return null;

  return <Footer />;
}
