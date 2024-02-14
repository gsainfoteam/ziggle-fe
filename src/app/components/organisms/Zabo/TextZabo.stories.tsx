import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { useTranslation } from '@/app/i18next/client';
import { fallbackLng } from '@/app/i18next/settings';

import Zabo from '.';

export default {
  title: 'organisms/zabo/TextZabo',
  component: Zabo,
} as Meta<typeof Zabo>;

const Template: StoryFn<typeof Zabo> = (args) => {
  const { t } = useTranslation(fallbackLng);
  const lineClampLevel =
    args.title.length > 40 ? 2 : args.title.length > 20 ? 1 : 0;

  return (
    <>
      <div>length of title: {args.title.length}</div>
      <br />
      <code className="whitespace-pre">
        {'const lineClampLevel = title.length > 40 ? 2 : title.length > 20 ? 1 : 0;\n\n' +
          `(origin === 'height'
  ? `}
        {args.height ? (
          <>
            {`[`}
            <span
              className={lineClampLevel === 0 ? 'text-red-500' : undefined}
            >{`'line-clamp-2'`}</span>
            {`, `}
            <span
              className={lineClampLevel === 1 ? 'text-red-500' : undefined}
            >{`'line-clamp-3'`}</span>
            {`, `}
            <span
              className={lineClampLevel === 2 ? 'text-red-500' : undefined}
            >{`'line-clamp-5'`}</span>
            {`]`}
          </>
        ) : (
          `['line-clamp-2', 'line-clamp-3', 'line-clamp-5']`
        )}
        {`
  : `}
        {args.width ? (
          <>
            {`[`}
            <span
              className={lineClampLevel === 0 ? 'text-red-500' : undefined}
            >{`'line-clamp-6'`}</span>
            {`, `}
            <span
              className={lineClampLevel === 1 ? 'text-red-500' : undefined}
            >{`'line-clamp-8'`}</span>
            {`, `}
            <span
              className={lineClampLevel === 2 ? 'text-red-500' : undefined}
            >{`'line-clamp-10'`}</span>
            {`]`}
          </>
        ) : (
          `['line-clamp-6', 'line-clamp-8', 'line-clamp-10']`
        )}
        {`)[
  lineClampLevel
]`}
      </code>
      <Zabo {...args} t={t} />
    </>
  );
};

const args = {
  title: '23년도 인포팀 신규 부원 모집',
  content: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
  createdAt: dayjs('2023-02-14T11:57:18.740Z'),
  views: 110,
  author: { name: '인포팀', uuid: 'info' },
  deadline: dayjs().add(1, 'd'),
  // organization: "INFOTEAM",
};

export const Height = Template.bind({});
Height.args = { ...args, height: 300 };

export const Width = Template.bind({});
Width.args = { ...args, width: 300 };
