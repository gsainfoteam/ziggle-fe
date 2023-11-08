"use client";

import { Suspense, useEffect, useState } from "react";

import LoadingCatAnimation from "@/app/components/templates/LoadingCatAnimation";
import { useTranslation } from "@/app/i18next/client";

import Notices from "./Notices";

const NoticesLoadingWrapper = () => {
  // This is a workaround for Suspense not working with SSR.
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setMounted(true), []);
  return (
    <Suspense fallback={mounted ? <LoadingCatAnimation t={t} /> : <div />}>
      <Notices />
    </Suspense>
  );
};

export default NoticesLoadingWrapper;
