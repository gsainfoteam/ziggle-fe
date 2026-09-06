import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

import { PopoverRoot, type PopoverRootProps } from './root';

interface PopoverMenuContextValue {
  open: boolean;
  anchor: HTMLElement | null;
  toggle: (anchor: HTMLElement) => void;
  close: () => void;
}

const PopoverMenuContext = createContext<PopoverMenuContextValue | null>(null);

const usePopoverMenuContext = () => {
  const context = useContext(PopoverMenuContext);
  if (!context) {
    throw new Error(
      'Popover.Trigger/Content must be used within <Popover.Menu>',
    );
  }
  return context;
};

/**
 * 열림 상태와 anchor를 내부에서 관리하는 uncontrolled 팝오버.
 * 트리거에 직접 state를 들 필요가 없다.
 *
 *   <Popover.Menu>
 *     <Popover.Trigger>{(open) => <button>...</button>}</Popover.Trigger>
 *     <Popover.Content>{({ close }) => <Popover.Body>...</Popover.Body>}</Popover.Content>
 *   </Popover.Menu>
 */
export const PopoverMenu = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const value = useMemo<PopoverMenuContextValue>(
    () => ({
      open,
      anchor,
      toggle: (element) => {
        setAnchor(element);
        setOpen((value) => !value);
      },
      close: () => setOpen(false),
    }),
    [open, anchor],
  );

  return (
    <PopoverMenuContext.Provider value={value}>
      {children}
    </PopoverMenuContext.Provider>
  );
};

type TriggerChild = ReactElement<{ onClick?: React.MouseEventHandler }>;

// asChild — 자식 엘리먼트를 그대로 트리거로 쓰되 onClick(토글+anchor)을 주입한다.
export const PopoverTrigger = ({
  children,
}: {
  children: TriggerChild | ((open: boolean) => TriggerChild);
}) => {
  const { open, toggle } = usePopoverMenuContext();
  const element = typeof children === 'function' ? children(open) : children;
  const child = Children.only(element);

  return cloneElement(child, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      toggle(event.currentTarget);
      child.props.onClick?.(event);
    },
  });
};

export const PopoverContent = ({
  children,
  ...rootProps
}: {
  children: ReactNode | ((ctx: { close: () => void }) => ReactNode);
} & Omit<PopoverRootProps, 'isOpen' | 'onClose' | 'anchor' | 'children'>) => {
  const { open, anchor, close } = usePopoverMenuContext();
  return (
    <PopoverRoot isOpen={open} onClose={close} anchor={anchor} {...rootProps}>
      {typeof children === 'function' ? children({ close }) : children}
    </PopoverRoot>
  );
};
