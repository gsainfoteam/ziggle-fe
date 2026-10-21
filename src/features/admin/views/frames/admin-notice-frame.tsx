import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { useAdminNotice } from '../../viewmodels';

export function AdminNoticeFrame() {
  const { id } = useParams({ from: '/admin/notices/$id' });
  const { t } = useTranslation('admin');
  const validId = Number.isSafeInteger(Number(id)) && Number(id) > 0;
  const {
    data: notice,
    isLoading,
    error,
    refetch,
  } = useAdminNotice(Number(id));
  return (
    <div className="space-y-6">
      <Link
        to="/admin/notices"
        search={{ page: 0 }}
        className="text-primary text-sm font-medium"
      >
        {t('notices.back')}
      </Link>
      {isLoading ? (
        <Loading />
      ) : !validId || error?.statusCode === 404 ? (
        <p role="alert">{t('notices.not_found')}</p>
      ) : error || !notice ? (
        <div role="alert" className="space-y-4">
          <p>{t('fetch_error')}</p>
          <Button variant="outlined" onClick={() => void refetch()}>
            {t('retry')}
          </Button>
        </div>
      ) : (
        <article className="border-border bg-background space-y-6 rounded-2xl border p-5 md:p-8">
          <div className="text-muted-foreground text-sm">
            #{notice.id} · {notice.author.name} ·{' '}
            {dayjs(notice.createdAt).format('YYYY.MM.DD HH:mm')} ·{' '}
            {t('notices.view_count', { count: notice.views })}
          </div>
          <h1 className="text-2xl font-semibold">{notice.title}</h1>
          <div className="flex flex-wrap gap-2">
            {notice.tags.map((tag) => (
              <span key={tag} className="bg-muted rounded-lg px-3 py-1 text-sm">
                #{tag}
              </span>
            ))}
          </div>
          {notice.currentDeadline && (
            <p className="text-muted-foreground text-sm">
              {t('notices.deadline')}:{' '}
              {dayjs(notice.currentDeadline).format('YYYY.MM.DD HH:mm')}
            </p>
          )}
          {notice.imageUrls.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`${notice.title} ${index + 1}`}
              className="mx-auto max-h-160 max-w-full rounded-xl object-contain"
            />
          ))}
          <div
            className="prose dark:prose-invert max-w-none overflow-x-auto break-words"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(notice.content),
            }}
          />
          {notice.documents.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-semibold">{t('notices.attachments')}</h2>
              {notice.documents.map((document) => (
                <a
                  key={document.url}
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary block underline"
                >
                  {document.name}
                </a>
              ))}
            </div>
          )}
          {notice.additionalContents
            .filter((content) => content.lang === 'ko')
            .map((content) => (
              <section
                key={content.id}
                className="bg-muted space-y-2 rounded-xl p-5"
              >
                <h2 className="font-semibold">{t('notices.additional')}</h2>
                <p className="text-muted-foreground text-sm">
                  {dayjs(content.createdAt).format('YYYY.MM.DD HH:mm')}
                </p>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content.content),
                  }}
                />
              </section>
            ))}
          <Link
            to="/notice/$id"
            params={{ id }}
            className="text-primary inline-block text-sm font-medium"
          >
            {t('notices.open_public')}
          </Link>
        </article>
      )}
    </div>
  );
}
