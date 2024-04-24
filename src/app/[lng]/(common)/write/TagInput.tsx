import { useEffect, useState } from 'react';

import { searchTags } from '@/api/tag/tag';
import { PropsWithT } from '@/app/i18next';
import CloseIcon from '@/assets/icons/close.svg';

export interface Tag {
  id: number;
  name: string;
}

interface TagInputProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagInput = ({ tags, setTags, t }: PropsWithT<TagInputProps>) => {
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
      <div className="flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-solid border-primary p-1">
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
          className="flex-grow bg-transparent p-1 outline-none md:p-2 md:text-base"
        />
      </div>

      <div className="relative flex">
        <div className="absolute left-2.5 top-[-4px] z-10 flex w-[calc(100%-20px)] flex-col bg-white">
          {searchedTags.slice(0, 5).map((tag) => (
            <div
              className="p-2.5 [&:hover]:bg-secondary"
              key={tag.id}
              onClick={() => handleTagOptionClick(tag)}
            >
              <div className="font-regular text-left text-sm text-black">
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
        'flex w-max items-center gap-2  bg-primary ' +
        'md:rounded-2x h-6 rounded-2xl pl-1.5 pr-4 md:h-8 md:pl-2.5 md:pr-1'
      }
    >
      <div className="text-sm font-medium text-white md:text-base">
        #{children}
      </div>

      <div onClick={onClick} className="cursor-pointer">
        <div className="flex h-4 w-4 items-center justify-center rounded-xl bg-white md:h-5 md:w-5">
          <CloseIcon className="h-1.5 w-1.5 fill-primary md:h-2 md:w-2" />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
