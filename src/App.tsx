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
import NoticeWritingPage from "./pages/noticeWriting/NoticeWritingPage";
import SearchPage from "./pages/searchPage/SearchPage";
import GlobalStyle from "./styles/globalStyles";
import Paths from "./types/paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="*" element={<Navigate to={Paths.home} replace />} />

      <Route path={Paths.home} element={<HomePage />} />
      <Route path={Paths.all} element={<AllNoticesPage />} />
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
