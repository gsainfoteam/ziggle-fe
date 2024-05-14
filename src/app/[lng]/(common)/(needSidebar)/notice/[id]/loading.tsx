import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import { PropsWithLng } from '@/app/i18next';

const Loading = ({ lng }: PropsWithLng) => (
  <>
    <div className="h-48" />
    <LoadingCatAnimation lng={lng} />
    <div className="h-48" />
  </>
);

export default Loading;
