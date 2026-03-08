

export const MOCK_NOTICE = [
  {
    id: 1,
    title: "Ziggle 서비스 v2.1 업데이트 및 서버 점검 안내",
    group: {
      uuid: "group-uuid-1234-5678",
      name: "Ziggle 개발팀",
      profileImageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=ziggle"
    },
    author: {
      uuid: "author-uuid-0001",
      name: "개발팀"
    },
    createdAt: "2026-03-08T09:00:00Z",
    tags: ["업데이트", "서버점검", "공지"],
    views: 342,
    langs: ["ko", "en"],
    content: "<p>안녕하세요. Ziggle 개발팀입니다.</p><p>안정적인 서비스 제공을 위해 아래와 같이 서버 점검 및 v2.1 업데이트가 진행될 예정입니다. 이용에 참고 부탁드립니다.</p>",
    reactions: [
      { emoji: "👍", count: 15, isReacted: true },
      { emoji: "🔥", count: 4, isReacted: false }
    ],
    isReminded: false,
    category: {}, 
    publishedAt: "2026-03-08T09:00:00Z",
    imageUrls: [],
    documentUrls: [],
    additionalContents: []
  },
  {
    id: 2,
    title: "2026년 봄학기 AI 연구 세미나: 신경 기호 AI(Neuro-symbolic AI)의 이해",
    group: {
      uuid: "group-uuid-8888-9999",
      name: "AI 대학원 학생회"
    },
    author: {
      uuid: "author-uuid-0002",
      name: "세미나준비위원회"
    },
    createdAt: "2026-03-05T14:30:00Z",
    tags: ["세미나", "AI", "연구", "학술"],
    views: 128,
    langs: ["ko"],
    content: "<p>이번 주 금요일, 최근 각광받고 있는 신경 기호 AI 및 기하학적 딥러닝(Geometric Deep Learning)을 주제로 학술 세미나를 진행합니다. 관심 있는 학부생 및 대학원생 여러분의 많은 참여 바랍니다.</p>",
    reactions: [
      { emoji: "💡", count: 22, isReacted: false },
      { emoji: "👀", count: 8, isReacted: true }
    ],
    isReminded: true,
    category: {},
    deadline: "2026-03-12T23:59:59Z",
    currentDeadline: "2026-03-12T23:59:59Z",
    publishedAt: "2026-03-05T15:00:00Z",
    imageUrls: ["https://example.com/images/ai-seminar-poster.jpg"],
    documentUrls: ["https://example.com/docs/seminar-abstract.pdf"],
    additionalContents: [
      {
        id: 101,
        lang: "ko",
        deadline: "2026-03-12T23:59:59Z",
        content: "세미나 장소가 EECS A동 101호에서 201호로 변경되었으니 착오 없으시기 바랍니다.",
        createdAt: "2026-03-07T10:00:00Z"
      }
    ]
  },
  {
    id: 3,
    title: "제 1회 교내 심레이싱(Sim Racing) 챔피언십 참가자 모집",
    // group이 없는 개인 주최 행사 케이스
    author: {
      uuid: "author-uuid-0003",
      name: "모터스포츠 동아리"
    },
    createdAt: "2026-03-01T10:00:00Z",
    tags: ["대회", "동아리", "e스포츠", "레이싱"],
    views: 215,
    langs: ["ko", "en"],
    content: "<p>Assetto Corsa Competizione를 이용한 교내 심레이싱 토너먼트를 개최합니다! F1이나 모터스포츠에 관심 있는 분들이라면 초보자도 환영합니다. 우승자에게는 소정의 상품이 지급됩니다.</p>",
    reactions: [
      { emoji: "🏎️", count: 35, isReacted: true },
      { emoji: "🏆", count: 12, isReacted: false }
    ],
    isReminded: false,
    category: {},
    deadline: "2026-03-15T23:59:59Z",
    currentDeadline: "2026-03-15T23:59:59Z",
    publishedAt: "2026-03-01T10:00:00Z",
    imageUrls: ["https://example.com/images/racing-tournament.png"],
    documentUrls: [],
    additionalContents: []
  }
];