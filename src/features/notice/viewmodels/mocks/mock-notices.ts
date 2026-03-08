

export const MOCK_NOTICES = {
  total: 4,
  list: [
    {
      id: 1,
      title:
        'AI 대학원 특별 세미나: 신경 기호 AI(Neuro-symbolic AI)의 최신 동향',
      group: {
        uuid: 'group-eecs-001',
        name: 'EECS 학부 학생회',
        profileImageUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=eecs',
      },
      author: {
        uuid: 'author-prof-001',
        name: '학사지원팀',
      },
      createdAt: '2026-03-05T10:00:00Z',
      tags: ['세미나', 'AI', 'EECS', '학술'],
      views: 142,
      langs: ['ko', 'en'],
      content:
        '<p>EECS 학부생 및 대학원생을 대상으로 신경 기호 AI(Neuro-symbolic AI) 및 기하학적 딥러닝(Geometric Deep Learning)을 주제로 학술 세미나를 개최합니다. 관심 있는 분들의 많은 참여 바랍니다.</p>',
      reactions: [
        { emoji: '💡', count: 12, isReacted: true },
        { emoji: '👏', count: 8, isReacted: false },
      ],
      isReminded: false,
      category: {},
      publishedAt: '2026-03-05T10:00:00Z',
      imageUrls: [],
      documentUrls: [],
    },
    {
      id: 2,
      title: '모터스포츠 동아리 신입 부원 모집 및 2026 F1 개막전 단체 관람',
      group: {
        uuid: 'group-club-002',
        name: '모터스포츠 동아리 Apex',
      },
      author: {
        uuid: 'author-student-002',
        name: '동아리 연합회',
      },
      createdAt: '2026-03-07T14:00:00Z',
      tags: ['동아리', 'F1', '심레이싱', '친목'],
      views: 88,
      langs: ['ko'],
      content:
        '맥스 베르스타펜의 질주를 함께 응원할 부원을 모집합니다! 학생회관 1층에서 Assetto Corsa Competizione 심레이싱 체험 부스도 운영하고 있으니 부담 없이 방문해 주세요.',
      reactions: [
        { emoji: '🏎️', count: 24, isReacted: true },
        { emoji: '🔥', count: 5, isReacted: false },
      ],
      isReminded: true,
      category: {},
      deadline: '2026-03-14T23:59:59Z',
      currentDeadline: '2026-03-14T23:59:59Z',
      publishedAt: '2026-03-07T14:00:00Z',
      imageUrls: [],
      documentUrls: [],
    },
    {
      id: 3,
      title: '2026년도 전문연구요원(석박사 통합/박사과정) 편입 설명회 안내',
      author: {
        uuid: 'author-staff-003',
        name: '학생지원팀',
      },
      createdAt: '2026-03-08T09:00:00Z',
      tags: ['전문연', '병역', '설명회', '진로'],
      views: 310,
      langs: ['ko'],
      content:
        '<p>2026년도 전문연구요원 편입을 희망하는 학생들을 위한 교내 설명회를 개최합니다. 복무 관리 규정 및 지원 절차에 대한 상세한 안내가 있을 예정입니다.</p>',
      reactions: [
        { emoji: '👀', count: 45, isReacted: false },
        { emoji: '📌', count: 18, isReacted: true },
      ],
      isReminded: false,
      category: {},
      deadline: '2026-03-20T18:00:00Z',
      currentDeadline: '2026-03-20T18:00:00Z',
      publishedAt: '2026-03-08T09:00:00Z',
      imageUrls: [],
      documentUrls: ['https://example.com/docs/prp-guidelines-2026.pdf'],
    },
    {
      id: 4,
      title: 'Ziggle 서비스 프론트엔드 팀원 추가 모집',
      group: {
        uuid: 'group-ziggle-004',
        name: 'Ziggle 개발팀',
      },
      author: {
        uuid: 'author-dev-004',
        name: '개발팀장',
      },
      createdAt: '2026-03-08T18:00:00Z',
      tags: ['리쿠르팅', '프론트엔드', '웹개발', '프로젝트'],
      views: 156,
      langs: ['ko', 'en'],
      content:
        '<p>교내 공지사항 플랫폼 Ziggle을 함께 고도화해 나갈 프론트엔드 개발자를 찾습니다. React, Vite, Zustand, TanStack Router 기술 스택을 사용 중이며, 관련 경험자를 우대합니다.</p>',
      reactions: [
        { emoji: '💻', count: 18, isReacted: true },
        { emoji: '🚀', count: 10, isReacted: false },
      ],
      isReminded: false,
      category: {},
      publishedAt: '2026-03-08T18:00:00Z',
      imageUrls: [],
      documentUrls: [],
    },
  ],
};
