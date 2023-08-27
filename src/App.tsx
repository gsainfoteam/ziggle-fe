import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import AllNoticesPage from "./pages/allNotices/AllNoticesPage";
import DetailedNoticePage from "./pages/detailedNotice/DetailedNoticePage";
import HomePage from "./pages/home/HomePage";
import MyPage from "./pages/myPage/MyPage";
import EventNoticesPage from "./pages/noticeSections/EventNoticesPage";
import GeneralNoticesPage from "./pages/noticeSections/GeneralNoticesPage";
import HotNoticesPage from "./pages/noticeSections/HotNoticesPage";
import RecruitNoticesPage from "./pages/noticeSections/RecruitNoticesPage";
import RemindedNoticesPage from "./pages/noticeSections/RemindedNoticesPage";
import UrgentNoticesPage from "./pages/noticeSections/UrgentNoticesPage";
import WrittenNoticesPage from "./pages/noticeSections/WrittenNoticesPage";
import NoticeWritingPage from "./pages/noticeWriting/NoticeWritingPage";
import SearchPage from "./pages/searchPage/SearchPage";
import GlobalStyle from "./styles/globalStyles";
import Paths, { NoticeSection } from "./types/paths";

const router = createBrowserRouter(
  createRoutesFromElements(
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
        <Route path={NoticeSection.urgent} element={<UrgentNoticesPage />} />
        <Route path={NoticeSection.recruit} element={<RecruitNoticesPage />} />
        <Route path={NoticeSection.general} element={<GeneralNoticesPage />} />
        <Route path={NoticeSection.all} element={<AllNoticesPage />} />

        <Route
          path={NoticeSection.reminded}
          element={<RemindedNoticesPage />}
        />
        <Route path={NoticeSection.written} element={<WrittenNoticesPage />} />
      </Route>

      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.search} element={<SearchPage />} />
      <Route
        path={Paths.noticeDetail + ":id"}
        element={<DetailedNoticePage />}
      />

      <Route path={Paths.myPage} element={<MyPage />} />
      <Route path={Paths.noticeWriting} element={<NoticeWritingPage />} />
    </Route>,
  ),
);

const App = () => {
  return (
    <>
      <GlobalStyle />

      <RouterProvider router={router} />
    </>
  );
};

export default App;
