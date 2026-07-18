import { useState } from 'react';

import { XIcon } from '@phosphor-icons/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  useSearchTags,
  type NoticeFormValues,
  type Tag,
} from '@/features/write/viewmodels';

import { writeFieldShellClassName } from '../field-styles';

export const TagInput = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [tempTagId, setTempTagId] = useState<number>(0);
  const { data: searchedTags } = useSearchTags({ keyword });
  const { t } = useTranslation('write');

  const { control } = useFormContext<NoticeFormValues>();
  const { field } = useController({ control, name: 'tags' });
  const tags = field.value;
  const setTags = (next: Tag[]) => field.onChange(next);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;

    setKeyword(inputVal);

    if (inputVal.endsWith(' ')) {
      let newTag = inputVal.trim();

      if (newTag.startsWith('#')) {
        newTag = newTag.substring(1);
      }

      if (newTag === '') {
        setKeyword('');
        return;
      }
      if (!tags.find((tag) => tag.name === newTag)) {
        const newTagObj = { id: tempTagId, name: newTag };
        setTags([...tags, newTagObj]);
        setTempTagId(tempTagId + 1);
      }
      setKeyword('');
    }
  };

  const handleTagOptionClick = (tag: Tag) => {
    setTags([...tags, tag]);
    setKeyword('');
  };

  return (
    <div className="flex flex-col">
      <div className={writeFieldShellClassName}>
        {tags.map((tag) => (
          <TagChip
            key={tag.name}
            onClick={() => {
              setTags(tags.filter((t) => t.id !== tag.id));
            }}
          >
            {tag.name}
          </TagChip>
        ))}
        <input
          value={keyword}
          onChange={handleKeywordChange}
          placeholder={tags.length === 0 ? t('fields.tags.placeholder') : ''}
          className="placeholder:text-muted-foreground text-foreground min-w-24 grow bg-transparent px-2 py-1.5 text-base outline-none"
        />
      </div>

      {searchedTags && searchedTags?.length !== 0 && (
        <div className="relative flex">
          <div className="border-border bg-background absolute top-1.5 left-0 z-10 flex w-full flex-col overflow-hidden rounded-xl border shadow-sm">
            {searchedTags.slice(0, 5).map((tag) => (
              <button
                type="button"
                className="hover:bg-muted text-foreground px-3.5 py-2.5 text-left text-sm transition"
                key={tag.id}
                onClick={() => handleTagOptionClick(tag)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TagChip = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <span className="bg-primary text-on-primary flex h-7 w-max items-center gap-1 rounded-full pr-1 pl-2.5 text-sm font-medium">
      #{children}
      <button
        type="button"
        onClick={onClick}
        aria-label={`remove ${children}`}
        className="text-on-primary/80 hover:bg-on-primary/15 flex size-5 items-center justify-center rounded-full transition"
      >
        <XIcon className="size-3" weight="bold" />
      </button>
    </span>
  );
};
