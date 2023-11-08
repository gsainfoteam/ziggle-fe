import LoadingCatAnimation from "@/app/components/templates/LoadingCatAnimation";
import { T } from "@/app/i18next";

const Loading = ({ t }: { t: T }) => (
  <>
    <div className="h-48" />
    <LoadingCatAnimation t={t} />
    <div className="h-48" />
  </>
);

export default Loading;
