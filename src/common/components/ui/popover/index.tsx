import { PopoverBody } from './body';
import { PopoverContent, PopoverMenu, PopoverTrigger } from './menu';
import { PopoverRoot } from './root';

export type { PopoverRootProps } from './root';

export const Popover = {
  // controlled
  Root: PopoverRoot,
  Body: PopoverBody,
  // uncontrolled (state 내부 관리)
  Menu: PopoverMenu,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
