import { useEffect, useState } from 'react';

import { getGroupByName } from '@/api/group/group';
import useDebouncedState from '@/hooks/useDebouncedState';

export const useGroupNameValidation = () => {
  const [debouncedGroupName, setGroupName] = useDebouncedState<string>('');
  const [isGroupNameExists, setIsGroupNameExists] = useState<boolean | null>(
    null,
  );
  const [isNextButtonValid, setIsNextButtonValid] = useState<boolean>(false);

  const getIfGroupNameAlreadyExists = async (groupName: string) => {
    const result = await getGroupByName(groupName);
    return !!result;
  };

  useEffect(() => {
    const handleGroupName = async () => {
      if (debouncedGroupName.length > 0) {
        const resultOfgetIfGroupNameAlreadyExists =
          await getIfGroupNameAlreadyExists(debouncedGroupName);
        setIsGroupNameExists(resultOfgetIfGroupNameAlreadyExists);
        setIsNextButtonValid(!resultOfgetIfGroupNameAlreadyExists);
      } else {
        setIsGroupNameExists(null);
        setIsNextButtonValid(false);
      }
    };

    handleGroupName();
  }, [debouncedGroupName]);

  return {
    debouncedGroupName,
    setGroupName,
    isGroupNameExists,
    isNextButtonValid,
  };
};

export default useGroupNameValidation;
