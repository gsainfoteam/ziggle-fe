import { Link, Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function getFileName(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const name = pathname.split('/').pop();
    return name ? decodeURIComponent(name) : url;
  } catch {
    return url;
  }
}

interface DocumentUrlsProps {
  // TODO(ZGB-51): 백엔드 sourceUrl 필드 추가 후 gen:api 재실행 및 notice-info.tsx에서 전달 필요
  sourceUrl?: string;
  documentUrls: string[];
}

export function DocumentUrls({ sourceUrl, documentUrls }: DocumentUrlsProps) {
  const { t } = useTranslation('notice');

  if (!sourceUrl && documentUrls.length === 0) return null;

  return (
    <div className="border-greyLight border-y py-3">
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-6 gap-y-3">
        {sourceUrl && (
          <>
            <Label icon={<Link size={18} />}>{t('detail.source_url')}</Label>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondaryText break-all underline"
            >
              {sourceUrl}
            </a>
          </>
        )}

        {documentUrls.length > 0 && (
          <>
            <Label icon={<Paperclip size={18} />}>
              {t('detail.attachments')}
            </Label>
            <div className="flex flex-col gap-1">
              {documentUrls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondaryText underline"
                >
                  {getFileName(url)}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Label({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="text-greyDark dark:text-dark_greyLight flex items-center gap-1.5 font-medium">
      {icon}
      <span>{children}</span>
    </div>
  );
}
