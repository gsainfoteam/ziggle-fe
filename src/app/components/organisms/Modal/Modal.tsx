import { createContext, useContext, useEffect, useRef, useState } from 'react';

import CloseIcon from '@/assets/icons/close.svg';

import { default as ButtonAtom } from '../../atoms/Button';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  text?: string;
  hasXButton?: boolean;
}

const ModalContext = createContext<{
  onClose?: () => void;
  title?: string;
  text?: string;
}>({});

/** A compound component made of Title, ButtonContainer, MajorButton, MinorButton, and Icon */
const Modal = ({ children, onClose, title, text, hasXButton }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const closeWithSlideDown = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  return (
    <ModalContext.Provider value={{ onClose: closeWithSlideDown, title, text }}>
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.1)] md:items-center ${
          isClosing ? 'animate-fadeOut' : ''
        }`}
        onClick={onClose}
      >
        <div
          className={`relative box-content flex w-full flex-col rounded-t-[20px] bg-white p-[25px] md:w-[400px] md:rounded-[20px] ${
            isClosing ? 'animate-slideDown' : 'animate-slideUp'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && <Title>{title}</Title>}
          {text && <p className={'text-lg text-text'}>{text}</p>}

          {children}

          {hasXButton && (
            <Button onClick={onClose} className={'absolute right-4 top-4'}>
              <CloseIcon className={'w-8'} />
            </Button>
          )}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <p className={'text-[28px] font-bold text-text'}>{children}</p>;
};

const ButtonContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={'mt-5 flex gap-[10px]'}>{children}</div>;
};

/** Close modal on click when isClose is true */
const Button = ({
  onClick,
  children,
  isClose,
  ...props
}: React.ComponentProps<typeof ButtonAtom> & { isClose?: boolean }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <ButtonAtom
      className={'flex-grow rounded-[10px] px-[15px] py-2.5 text-lg'}
      onClick={(e) => {
        onClick?.(e);
        isClose && onClose?.();
      }}
      {...props}
    >
      {children}
    </ButtonAtom>
  );
};

Modal.Title = Title;
Modal.ButtonContainer = ButtonContainer;
Modal.Button = Button;

export default Modal;
