import { Navigate, Route, Routes } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import useViewLog from "./hooks/useViewLog";
import Layout from "./layout/Layout";
import AllNoticesPage from "./pages/allNotices/AllNoticesPage";
import DetailedNoticePage from "./pages/detailedNotice/DetailedNoticePage";
import HomePage from "./pages/home/HomePage";
import MyPage from "./pages/myPage/MyPage";
import EventNoticesPage from "./pages/noticeSections/EventNoticesPage";
import GeneralNoticesPage from "./pages/noticeSections/GeneralNoticesPage";
import HotNoticesPage from "./pages/noticeSections/HotNoticesPage";
import RecruitNoticesPage from "./pages/noticeSections/RecruitNoticesPage";
import UrgentNoticesPage from "./pages/noticeSections/UrgentNoticesPage";
import NoticeWritingPage from "./pages/noticeWriting/NoticeWritingPage";
import SearchPage from "./pages/searchPage/SearchPage";
import GlobalStyle from "./styles/globalStyles";
import Paths, { NoticeSection } from "./types/paths";

const App = () => {
  const { userInfo } = useAuth();

  useViewLog();

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Navigate to={Paths.home} replace />} />

          <Route path={Paths.home} element={<HomePage />} />
          <Route
            path={Paths.section + NoticeSection.all}
            element={<AllNoticesPage />}
          />
          <Route path={Paths.search} element={<SearchPage />} />
          <Route
            path={Paths.noticeDetail + ":id"}
            element={<DetailedNoticePage />}
          />

          {/* 각 공지 섹션별 */}
          <Route path={Paths.section}>
            <Route path={NoticeSection.event} element={<EventNoticesPage />} />
            <Route path={NoticeSection.hot} element={<HotNoticesPage />} />
            <Route
              path={NoticeSection.urgent}
              element={<UrgentNoticesPage />}
            />
            <Route
              path={NoticeSection.recruit}
              element={<RecruitNoticesPage />}
            />
            <Route
              path={NoticeSection.general}
              element={<GeneralNoticesPage />}
            />
          </Route>

          {userInfo && ( // Page에 userInfo props로 넘기기? 이거 말곤 당장 생각이 안나요. 좋은 방법 있으면 바꿔주세요.
            <>
              <Route
                path={Paths.myPage}
                element={<MyPage userInfo={userInfo} />}
              />
              <Route
                path={Paths.noticeWriting}
                element={<NoticeWritingPage />}
              />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
