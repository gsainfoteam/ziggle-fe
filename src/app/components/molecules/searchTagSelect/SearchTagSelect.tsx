import { NoticeKind } from '@/api/notice/notice';
import React from 'react';
import Button from '../../atoms/Button';
import Chip from '../Chip';

//import React from 'react';
interface NoticeTypeCheckboxProps {
  selected: NoticeKind[];
  onChange: (selected: NoticeKind[]) => void;
}

const SearchTagSelect = ({ selected, onChange }: NoticeTypeCheckboxProps) => {
  const handleCheckboxChange = (type: NoticeKind) => {
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
      <Button onClick={() => handleCheckboxChange(NoticeKind.RECRUIT)}>
        <Chip
          variant={
            selected.includes(NoticeKind.RECRUIT) ? 'contained' : 'outlined'
          }
        >
          {'🎯 모집'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeKind.EVENT)}>
        <Chip
          variant={
            selected.includes(NoticeKind.EVENT) ? 'contained' : 'outlined'
          }
        >
          {'🎈 행사'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeKind.NORMAL)}>
        <Chip
          variant={
            selected.includes(NoticeKind.NORMAL) ? 'contained' : 'outlined'
          }
        >
          {'🔔 일반'}
        </Chip>
      </Button>
      <Button onClick={() => handleCheckboxChange(NoticeKind.ACADEMIC)}>
        <Chip
          variant={
            selected.includes(NoticeKind.ACADEMIC) ? 'contained' : 'outlined'
          }
        >
          {'🎈 행사'}
        </Chip>
      </Button>
    </div>
  );
};

export default SearchTagSelect;
