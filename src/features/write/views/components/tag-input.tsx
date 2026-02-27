import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import CloseIcon from '@/assets/icons/close.svg?react';

import { useSearchTags } from '../../viewmodels';

export interface Tag {
  id: number;
  name: string;
}

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [tempTagId, setTempTagId] = useState<number>(0);
  const { data: searchedTags } = useSearchTags({ keyword });
  const { t } = useTranslation('notice');

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
      <div className="border-primary flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-solid px-2 py-1">
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
          placeholder={tags.length === 0 ? t('write.writeTags') : ''}
          className="grow bg-transparent p-2 outline-none md:text-base"
        />
      </div>

      {searchedTags && searchedTags?.length !== 0 && (
        <div className="relative flex">
          <div className="border-greyBorder absolute top-[-4px] left-2.5 z-10 flex w-[calc(100%-20px)] flex-col border-2 bg-white">
            {searchedTags.slice(0, 5).map((tag) => (
              <div
                className="[&:hover]:bg-secondary p-2.5"
                key={tag.id}
                onClick={() => handleTagOptionClick(tag)}
              >
                <div className="font-regular text-text text-left text-sm">
                  {tag.name}
                </div>
              </div>
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
    <div
      className={
        'bg-primary flex w-max items-center gap-2 ' +
        'md:rounded-2x h-6 rounded-2xl pr-1 pl-1.5 md:h-8 md:pr-1 md:pl-2.5'
      }
    >
      <div className="text-sm font-medium text-white md:text-base">
        #{children}
      </div>

      <div onClick={onClick} className="cursor-pointer">
        <div className="flex h-4 w-4 items-center justify-center rounded-xl bg-white md:h-5 md:w-5">
          <CloseIcon className="fill-primary h-3 w-3" />
        </div>
      </div>
    </div>
  );
};
