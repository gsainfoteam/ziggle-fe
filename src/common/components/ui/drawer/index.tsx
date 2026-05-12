import { DrawerBody } from './body';
import { DrawerClose } from './close';
import { DrawerDescription } from './description';
import { DrawerFooter } from './footer';
import { DrawerHeader } from './header';
import { DrawerRoot } from './root';
import { DrawerTitle } from './title';

export type { DrawerRootProps } from './root';
export type { DrawerSide } from './context';

export const Drawer = {
  Root: DrawerRoot,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Close: DrawerClose,
};
