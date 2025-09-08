import '@/app/components/layout/initDayjs';

import { Meta, StoryFn } from '@storybook/react';

import { Notice } from '@/api/notice/notice';
import { Locale } from '@/app/i18next/settings';

import Zabo from './Zabo';

export default {
  title: 'shared/Zabo',
  component: Zabo,
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof Zabo>;

const mockNotice: Notice = {
  id: 1,
  title: '지스트 개발자 동아리 GDSC GIST 신입 부원 모집',
  content:
    'Google Developer Student Clubs GIST에서 새로운 멤버를 모집합니다. 프로그래밍에 관심이 있는 모든 학생들을 환영합니다. 다양한 프로젝트와 스터디를 통해 함께 성장해요!',
  createdAt: '2024-09-01T10:00:00Z',
  publishedAt: '2024-09-01T10:00:00Z',
  deadline: null, // Storybook에서는 null로 설정
  currentDeadline: null, // Storybook에서는 null로 설정
  langs: ['ko'],
  views: 123,
  author: {
    name: 'GDSC GIST',
    uuid: '20200001',
  },
  tags: ['개발', '동아리', '모집', 'Google'],
  imageUrls: [],
  documentUrls: [],
  reactions: [
    { emoji: '🔥', count: 15, isReacted: false },
    { emoji: '✅', count: 8, isReacted: true },
    { emoji: '❤️', count: 12, isReacted: false },
    { emoji: '😭', count: 0, isReacted: false },
  ],
  groupId: null,
  isReminded: false,
};

const mockNoticeWithImage: Notice = {
  ...mockNotice,
  id: 2,
  title: '2024 지스트 대학 축제 - 가을밤 축제',
  content:
    '올해도 어김없이 찾아온 지스트 대학 축제! 다양한 공연과 부스, 맛있는 음식들이 여러분을 기다리고 있습니다. 친구들과 함께 즐거운 시간을 보내세요!',
  imageUrls: [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=2',
  ],
  tags: ['축제', '이벤트', '공연'],
  reactions: [
    { emoji: '🔥', count: 42, isReacted: true },
    { emoji: '✅', count: 25, isReacted: false },
    { emoji: '❤️', count: 67, isReacted: true },
    { emoji: '😭', count: 2, isReacted: false },
  ],
};

const mockNoticeWithGroup: Notice = {
  ...mockNotice,
  id: 3,
  title: '지스트 총학생회 정기총회 개최 안내',
  content:
    '2024년 2학기 정기총회를 개최합니다. 학생회비 사용 내역과 향후 계획에 대해 보고드리겠습니다. 많은 참석 부탁드립니다.',
  author: {
    name: '지스트 총학생회',
    uuid: '20200002',
  },
  groupId: null, // Storybook에서는 API 호출 피하기 위해 null로 설정
  tags: ['총학생회', '정기총회', '공지'],
  deadline: null,
  currentDeadline: null,
};

const mockNoticeWithLongContent: Notice = {
  ...mockNotice,
  id: 4,
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tellus vitae velit semper, eu maximus dui elementum',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tellus vitae velit semper, eu maximus dui elementum. Donec accumsan turpis eu orci pharetra, a vehicula risus aliquam. Etiam dignissim est dolor. Suspendisse rutrum laoreet augue. Suspendisse potenti. In hac habitasse platea dictumst. Donec a ex sed odio fringilla vulputate eu et eros. Integer pulvinar, velit ac tempus ultrices, orci massa vehicula libero, id aliquet turpis magna viverra diam. Praesent volutpat turpis ex, a ullamcorper odio pharetra at. Curabitur sollicitudin mollis arcu, ac consequat eros gravida nec. Aliquam euismod turpis in neque suscipit hendrerit. Integer magna urna, ultricies ut varius vel, suscipit sit amet justo. Nullam cursus justo et mattis sollicitudin. Nulla et finibus sem. Aliquam sit amet elit mi.',
  tags: ['긴내용', '테스트', 'UI'],
};

const args = {
  lng: 'ko' as Locale,
};

const Template: StoryFn<typeof Zabo> = (args) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Zabo {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...args,
  ...mockNotice,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...args,
  ...mockNoticeWithImage,
};

export const WithGroup = Template.bind({});
WithGroup.args = {
  ...args,
  ...mockNoticeWithGroup,
  // mockGroupInfo: {
  //   name: '지스트 총학생회',
  //   profileImageUrl: 'https://picsum.photos/36/36?random=group1',
  // },
};

export const LongContent = Template.bind({});
LongContent.args = {
  ...args,
  ...mockNoticeWithLongContent,
};
