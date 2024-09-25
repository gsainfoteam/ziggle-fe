import { Meta, StoryFn } from '@storybook/react';

import useModal from '@/utils/useModal';

import Button from '../Button';
import Modal from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const args = {
  children: '',
  onClose: () => {},
  title: 'Modal Title',
  text: 'Modal text content. Modal text content. ',
  hasXButton: true,
};

const Template: StoryFn<typeof Modal> = (args) => {
  const modal = useModal();

  return (
    <Button
      onClick={() =>
        modal.open(
          <Modal {...args}>
            <Modal.ButtonContainer>
              <Modal.Button variant={'outlined'} isClose>
                Cancel
              </Modal.Button>
              <Modal.Button variant={'contained'} onClick={() => {}}>
                Confirm
              </Modal.Button>
            </Modal.ButtonContainer>
          </Modal>,
        )
      }
    >
      <p>Show modal</p>
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = { ...args };

export const WithXButton = Template.bind({});
WithXButton.args = { ...args, hasXButton: true };
