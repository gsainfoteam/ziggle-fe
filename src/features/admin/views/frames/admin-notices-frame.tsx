import { useState } from 'react';

import { Link, useNavigate, useSearch } from '@tanstack/react-router';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { Category, useAdminNotices } from '../../viewmodels';

export function AdminNoticesFrame() {
  const { t } = useTranslation('admin');
  const { t: noticeT } = useTranslation('notice');
  const { page, search, category } = useSearch({ from: '/admin/notices/' });
  const navigate = useNavigate({ from: '/admin/notices/' });
  const [draft, setDraft] = useState(search ?? '');
  const [syncedSearch, setSyncedSearch] = useState(search);
  if (syncedSearch !== search) {
    setSyncedSearch(search);
    setDraft(search ?? '');
  }
  const { data, isLoading, error, refetch } = useAdminNotices({
    page,
    search,
    category,
  });
  const categories = {
    [Category.RECRUIT]: noticeT('sidebar.recruit'),
    [Category.EVENT]: noticeT('sidebar.event'),
    [Category.CLUB]: noticeT('sidebar.club'),
    [Category.ETC]: noticeT('sidebar.general'),
    [Category.ACADEMIC]: noticeT('sidebar.academic'),
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t('notices.title')}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t('notices.description')}
        </p>
      </div>
      <section className="border-border bg-background overflow-hidden rounded-2xl border">
        <div className="border-border flex flex-wrap gap-3 border-b p-5">
          <form
            className="flex min-w-0 flex-1 gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void navigate({
                search: {
                  page: 0,
                  search: draft.trim() || undefined,
                  category,
                },
              });
            }}
          >
            <label className="border-border flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3">
              <MagnifyingGlassIcon className="text-muted-foreground size-5 shrink-0" />
              <input
                aria-label={t('notices.search')}
                placeholder={t('notices.search')}
                className="min-w-0 flex-1 py-2.5 outline-none"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </label>
            <Button type="submit" variant="contained">
              {t('search')}
            </Button>
          </form>
          <select
            aria-label={t('notices.category')}
            className="border-border bg-background rounded-xl border px-3 py-2"
            value={category ?? ''}
            onChange={(event) =>
              void navigate({
                search: {
                  page: 0,
                  search,
                  category: (event.target.value as Category) || undefined,
                },
              })
            }
          >
            <option value="">{t('notices.all_categories')}</option>
            {Object.values(Category).map((value) => (
              <option key={value} value={value}>
                {categories[value]}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div role="alert" className="space-y-4 p-10 text-center">
            <p>{t('fetch_error')}</p>
            <Button variant="outlined" onClick={() => void refetch()}>
              {t('retry')}
            </Button>
          </div>
        ) : !data?.list.length ? (
          <p className="text-muted-foreground p-12 text-center">
            {t('notices.empty')}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="text-muted-foreground px-5 py-4 text-left">
                  {t('notices.total', { count: data.total })}
                </caption>
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    {(
                      [
                        'id',
                        'subject',
                        'author',
                        'category',
                        'created',
                        'views',
                      ] as const
                    ).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-5 py-3 font-medium"
                      >
                        {t(`notices.columns.${key}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.list.map((notice) => (
                    <tr
                      key={notice.id}
                      className="border-border hover:bg-muted border-t"
                    >
                      <td className="text-muted-foreground px-5 py-4">
                        {notice.id}
                      </td>
                      <td className="min-w-60 px-5 py-4">
                        <Link
                          to="/admin/notices/$id"
                          params={{ id: String(notice.id) }}
                          className="hover:text-primary font-medium"
                        >
                          {notice.title}
                        </Link>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {notice.author.name}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {categories[String(notice.category) as Category] ?? '—'}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {dayjs(notice.createdAt).format('YYYY.MM.DD')}
                      </td>
                      <td className="px-5 py-4">{notice.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="border-border flex items-center justify-between border-t p-5">
          <Button
            variant="muted"
            disabled={page === 0 || isLoading}
            onClick={() =>
              void navigate({ search: { page: page - 1, search, category } })
            }
          >
            {t('previous')}
          </Button>
          <span className="text-muted-foreground text-sm">
            {t('page', {
              page: page + 1,
              total: Math.max(1, Math.ceil((data?.total ?? 0) / 20)),
            })}
          </span>
          <Button
            variant="muted"
            disabled={!data || (page + 1) * 20 >= data.total || isLoading}
            onClick={() =>
              void navigate({ search: { page: page + 1, search, category } })
            }
          >
            {t('next')}
          </Button>
        </div>
      </section>
    </div>
  );
}
