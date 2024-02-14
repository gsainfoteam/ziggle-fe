import MyPageInfo from './dummy-mypage-info';

const articles1 = [
  {
    title: '23학번 과잠 구매 희망자 조사',
    createdAt: '2023-08-03T11:57:18.740Z',
  },
  {
    title: "공연동아리 지대로 연극 'ART'",
    createdAt: '2023-08-03T11:57:18.740Z',
  },
  {
    title: '2023년도 WING 신규 부원 모집!',
    createdAt: '2023-08-03T11:57:18.740Z',
  },
  {
    title:
      '23년도 인포팀 신규 부원 모집 23년도 인포팀 신규 부원 모집 23년도 인포팀 신규 부원 모집 23년도 인포팀 신규 부원 모집 23년도 인포팀 신규 부원 모집 23년도 인포팀 신규 부원 모집',
    createdAt: '2023.02.13.',
  },
].map((article) => ({
  ...article,
  author: MyPageInfo.name,
  body: '',
  deadline: '',
  id: 0,
  imageUrls: [],
  tags: [],
  views: 0,
}));

const articles2 = [
  {
    title: '23학번 과잠 구매 희망자 조사',
    createdAt: '2023-08-03T11:57:18.740Z',
  },
].map((article) => ({
  ...article,
  author: MyPageInfo.name,
  body: '',
  deadline: '',
  id: 0,
  imageUrls: [],
  tags: [],
  views: 0,
}));

const dummyMypageArticles = {
  articles1,
  articles2,
};

export default dummyMypageArticles;
