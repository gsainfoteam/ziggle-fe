import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

export function SearchInput({
  value,
  onSubmit,
}: {
  value: string;
  onSubmit: (query: string) => void;
}) {
  const { t } = useTranslation('notice');
  const [text, setText] = useState(value);

  // 외부(URL 등)에서 query가 바뀌면 입력값 동기화
  useEffect(() => setText(value), [value]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text.trim());
      }}
      className="border-border bg-muted flex items-center gap-2 rounded-xl border px-4 py-2.5"
    >
      <MagnifyingGlassIcon className="text-muted-foreground size-5 shrink-0" />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('search.bar.placeholder')}
        className="text-foreground placeholder-muted-foreground min-w-0 flex-1 bg-transparent text-base outline-none"
      />
      {text.length > 0 && (
        <LogClick eventName={LogEvents.searchClickClear}>
          <button
            type="button"
            aria-label={t('search.bar.collapse')}
            onClick={() => {
              setText('');
              onSubmit('');
            }}
            className="shrink-0"
          >
            <XIcon className="text-muted-foreground size-4" />
          </button>
        </LogClick>
      )}
    </form>
  );
}
