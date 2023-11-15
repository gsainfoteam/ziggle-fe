import { useState } from 'react';

import { T } from '@/app/i18next';
import CloseIcon from '@/assets/icons/close.svg';

export interface Tag {
  id: number;
  name: string;
}

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagInput = ({ tags, setTags, t }: TagInputProps & { t: T }) => {
  const [keyword, setKeyword] = useState<string>('');

  // need to add API

  return (
    <div className="flex flex-col">
      <div className="flex gap-1.5 items-center border-solid border-2 rounded-lg border-primary p-3 md:p-2">
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
          placeholder={tags.length === 0 ? t('write.writeTags') : ''}
          className="flex-grow text-sm md:text-base bg-transparent outline-none p-1 md:p-2"
        />
      </div>

      <div className="relative">
        <div className="absolute top-[-4px] left-2.5 z-10 bg-white w-[calc(100%-20px)]"></div>
      </div>
    </div>
  );
};

const TagChip = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={
        'flex items-center gap-2 w-max  bg-primary ' +
        'md:h-8 md:pr-1 md:pl-2.5 md:rounded-2x h-6 pr-1 pl-1.5 rounded-xl'
      }
    >
      <div className="font-medium text-white text-sm md:text-base">
        #{children}
      </div>

      <div onClick={onClick} className="cursor-pointer">
        <div className="bg-white w-4 h-4 md:w-5 md:h-5 rounded-xl">
          <CloseIcon className="w-1.5 h-1.5 md:w-2 md:h-2" />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
