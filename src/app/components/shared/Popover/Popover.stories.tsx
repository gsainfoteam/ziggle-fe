import { Meta, StoryFn } from '@storybook/react';

import Lang from '@/assets/icons/lang.svg';
import LangEn from '@/assets/icons/lang-en.svg';
import LangEnFull from '@/assets/icons/lang-en-full.svg';
import LangFull from '@/assets/icons/lang-full.svg';
import LangKo from '@/assets/icons/lang-ko.svg';
import LangKoFull from '@/assets/icons/lang-ko-full.svg';
import Moon from '@/assets/icons/moon.svg';
import MoonFull from '@/assets/icons/moon-full.svg';
import Palette from '@/assets/icons/palette.svg';
import PaletteFull from '@/assets/icons/palette-full.svg';
import Sun from '@/assets/icons/sun.svg';
import SunFull from '@/assets/icons/sun-full.svg';
import System from '@/assets/icons/system.svg';
import SystemFull from '@/assets/icons/system-full.svg';

import { Popover } from '.';

export default {
  title: 'shared/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    selectedIndex: {
      control: { type: 'select' },
      options: [undefined, 0, 1, 2, 3],
    },
    onSelect: {
      action: 'selected',
    },
  },
} as Meta<typeof Popover>;

const mockItems = [
  {
    icon: Palette,
    boldIcon: PaletteFull,
    label: '테마',
  },
  {
    icon: Lang,
    boldIcon: LangFull,
    label: '언어',
  },
  {
    icon: Sun,
    boldIcon: SunFull,
    label: '라이트',
  },
  {
    icon: Moon,
    boldIcon: MoonFull,
    label: '다크',
  },
  {
    icon: System,
    boldIcon: SystemFull,
    label: '자동',
  },
  {
    icon: LangKo,
    boldIcon: LangKoFull,
    label: '한국어',
  },
  {
    icon: LangEn,
    boldIcon: LangEnFull,
    label: 'English',
  },
];

const Template: StoryFn<typeof Popover> = (args) => {
  return (
    <div className="w-48">
      <Popover {...args}>
        <Popover.Trigger
          icon={Palette}
          boldIcon={PaletteFull}
          label="테마"
          isSelected={false}
        />
      </Popover>
    </div>
  );
};

const args = {
  items: mockItems,
  selectedIndex: undefined,
};

export const Default = Template.bind({});
Default.args = { ...args };

export const FirstSelected = Template.bind({});
FirstSelected.args = { ...args, selectedIndex: 0 };

export const SecondSelected = Template.bind({});
SecondSelected.args = { ...args, selectedIndex: 1 };

export const LastSelected = Template.bind({});
LastSelected.args = { ...args, selectedIndex: 3 };

export const TwoItems = Template.bind({});
TwoItems.args = {
  ...args,
  items: mockItems.slice(0, 2),
  selectedIndex: 0,
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  ...args,
  items: mockItems.slice(0, 1),
  selectedIndex: 0,
};

export const ChangeTheme = () => {
  return (
    <Popover
      items={[
        { icon: Sun, boldIcon: SunFull, label: '라이트' },
        { icon: Moon, boldIcon: MoonFull, label: '다크' },
        { icon: System, boldIcon: SystemFull, label: '자동' },
      ]}
      onSelect={(index) => {
        console.log('Selected index:', index);
      }}
    >
      <Popover.Trigger
        icon={Palette}
        boldIcon={PaletteFull}
        label="테마"
        isSelected={false}
      />
    </Popover>
  );
};
