import { useOverlay } from '@toss/use-overlay';
import { cloneElement } from 'react';

const useModal = () => {
  const overlay = useOverlay();

  const open = (component: React.ReactElement) => {
    return new Promise((resolve) => {
      overlay.open(({ exit }) => {
        const componentWithProps = cloneElement(component, {
          onClose: () => {
            exit();
            resolve(true);
          },
        });

        return componentWithProps;
      });
    });
  };

  return { open };
};

export default useModal;
