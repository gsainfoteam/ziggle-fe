import { useEffect, useId, useState } from 'react';

import { searchTags } from '@/api/tag/tag';
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
  const [searchedTags, setSearchedTags] = useState<Tag[]>([]);

  const [tempTagId, setTempTagId] = useState<number>(0);

  useEffect(() => {
    const fetchTags = async () => {
      if (keyword === '') {
        setSearchedTags([]);
        return;
      }

      const tags = await searchTags(keyword);
      setSearchedTags(tags);
    };

    fetchTags();
  }, [keyword]);

  //   const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.value.includes(' ')) {
  //       const newTag = event.target.value.trim();
  //       if (tags.find((tag) => tag.name === newTag)) {
  //         setKeyword('');
  //         return;
  //       }

  //       const existingTag = searchedTags?.find((tag) => tag.name === newTag);
  //       if (existingTag) {
  //         setTags([...tags, existingTag]);
  //         setKeyword('');
  //         return;
  //       }
  //       return;
  //     }

  //     setKeyword(event.target.value);
  //   };

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
          onChange={handleKeywordChange}
          placeholder={tags.length === 0 ? t('write.writeTags') : ''}
          className="flex-grow text-sm md:text-base bg-transparent outline-none p-1 md:p-2"
        />
      </div>

      <div className="flex relative">
        <div className="flex flex-col absolute top-[-4px] left-2.5 z-10 bg-white w-[calc(100%-20px)]">
          {searchedTags.slice(0, 5).map((tag) => (
            <div
              className="p-2.5 [&:hover]:bg-secondary"
              key={tag.id}
              onClick={() => handleTagOptionClick(tag)}
            >
              <div className="font-regular text-sm text-left text-black">
                {tag.name}
              </div>
            </div>
          ))}
        </div>
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
        'md:h-8 md:pr-1 md:pl-2.5 md:rounded-2x h-6 pr-4 pl-1.5 rounded-2xl'
      }
    >
      <div className="font-medium text-white text-sm md:text-base">
        #{children}
      </div>

      <div onClick={onClick} className="cursor-pointer">
        <div className="bg-white w-4 h-4 md:w-5 md:h-5 rounded-xl flex justify-center items-center">
          <CloseIcon className="w-1.5 h-1.5 md:w-2 md:h-2 fill-primary" />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
