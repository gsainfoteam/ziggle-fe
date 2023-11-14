import { NoticeType } from '@/app/[lng]/search/page';

import Button from '../../atoms/Button';
import Chip from '../Chip';

//import React from 'react';
interface NoticeTypeCheckboxProps {
  selected: NoticeType[];
  onChange: (selected: NoticeType[]) => void;
}

const SearchTagSelect = ({ selected, onChange }: NoticeTypeCheckboxProps) => {
  const handleCheckboxChange = (type: NoticeType) => {
    const index = selected.indexOf(type);
    if (index === -1) {
      // Add the type to the selected array
      onChange([...selected, type]);
    } else {
      // Remove the type from the selected array
      const updatedSelected = [...selected];
      updatedSelected.splice(index, 1);
      onChange(updatedSelected);
    }
  };

  return (
    <div
      className={
        'flex gap-2 md:gap-3 justify-between md:justify-start px-[2px]'
      }
    >
      <Button onClick={() => handleCheckboxChange(NoticeType.RECRUIT)}>
        <Chip
          variant={
            selected.includes(NoticeType.RECRUIT) ? 'contained' : 'outlined'
          }
        >
          {'🎯 모집'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.EVENT)}>
        <Chip
          variant={
            selected.includes(NoticeType.EVENT) ? 'contained' : 'outlined'
          }
        >
          {'🎈 행사'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.NORMAL)}>
        <Chip
          variant={
            selected.includes(NoticeType.NORMAL) ? 'contained' : 'outlined'
          }
        >
          {'🔔 일반'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeType.ACADEMIC)}>
        <Chip
          variant={
            selected.includes(NoticeType.ACADEMIC) ? 'contained' : 'outlined'
          }
        >
          {'🎈 행사'}
        </Chip>
      </Button>
    </div>
  );
};

export default SearchTagSelect;
