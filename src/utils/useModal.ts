import { useOverlay } from '@toss/use-overlay';

const useModal = () => {
  const overlay = useOverlay();

  const open = (component: React.ReactElement) => {
    return new Promise((resolve) => {
      overlay.open(({ exit }) =>
        component.props({
          onClose: () => {
            exit();
            resolve(true);
          },
        }),
      );
    });
  };

  return { open };
};

export default useModal;
