import { Link, Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// TODO: file name 추후 백엔드에서 전달할 예정

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
  crawledUrl?: string;
  documentUrls: string[];
}

export function DocumentUrls({ crawledUrl, documentUrls }: DocumentUrlsProps) {
  const { t } = useTranslation('notice');

  if (!crawledUrl && documentUrls.length === 0) return null;

  return (
    <div className="border-greyLight border-y py-3">
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-6 gap-y-3">
        {crawledUrl && (
          <>
            <Label icon={<Link size={18} />}>{t('detail.source_url')}</Label>
            <a
              href={crawledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondaryText break-all underline"
            >
              {crawledUrl}
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
