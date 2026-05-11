import { DialogBody } from './body';
import { DialogClose } from './close';
import { DialogDescription } from './description';
import { DialogFooter } from './footer';
import { DialogHeader } from './header';
import { DialogRoot } from './root';
import { DialogTitle } from './title';

export type { DialogRootProps, DialogSize } from './root';
export { alertDialog, type AlertDialogOptions } from './alert';
export { confirmDialog, type ConfirmDialogOptions } from './confirm';
export {
  chooseDialog,
  type ChooseDialogOptions,
  type ChooseDialogResult,
} from './choose';

export const Dialog = {
  Root: DialogRoot,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
};
