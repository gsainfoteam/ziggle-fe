import { Meta, StoryFn } from '@storybook/react';
import { useOverlay } from '@toss/use-overlay';

import Modal from './Modal';

export default {
  title: 'app/components/organisms/Modal/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const overlay = useOverlay();

  return (
    <Modal {...args}>
      <Modal.Title>Modal Title</Modal.Title>
      <Modal.ButtonContainer>
        <Modal.Button variant={'outlined'} onClick={() => {}}>
          Cancel
        </Modal.Button>
        <Modal.Button variant={'contained'} onClick={() => {}}>
          Confirm
        </Modal.Button>
      </Modal.ButtonContainer>
    </Modal>
  );
};

const SimpleTemplate: StoryFn<typeof Modal> = (args) => (
  <Modal {...args} title={'Modal Title'} text={'Modal Text'}>
    <Modal.ButtonContainer>
      <Modal.Button variant={'contained'} onClick={() => {}}>
        Close
      </Modal.Button>
    </Modal.ButtonContainer>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {};

export const Simple = SimpleTemplate.bind({});
