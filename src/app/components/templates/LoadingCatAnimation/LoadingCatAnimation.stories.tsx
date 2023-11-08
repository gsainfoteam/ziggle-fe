import { useTranslation } from "@/app/i18next/client";

import LoadingCatAnimation from ".";

export default {
  title: "temlates/LoadingCatAnimation",
  component: LoadingCatAnimation,
};

export const Default = () => {
  const { t } = useTranslation();
  return <LoadingCatAnimation t={t} />;
};
