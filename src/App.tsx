import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import DetailedNoticePage from "./pages/detailedNotice/DetailedNoticePage";
import HomePage from "./pages/home/HomePage";
import MyPage from "./pages/myPage/myPage";
import NoticeWriting from "./pages/noticeWriting/NoticeWriting";
import SearchPage from "./pages/searchPage/SearchPage";
import GlobalStyle from "./styles/globalStyles";
import Paths from "./types/paths";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Paths.home} element={<HomePage />} />
            <Route path="*" element={<Navigate to={Paths.home} replace />} />
            <Route path={Paths.search} element={<SearchPage />} />
            <Route path={Paths.myPage} element={<MyPage />} />
            <Route path={Paths.noticeWriting} element={<NoticeWriting />} />
            <Route path="/detailedNotice" element={<DetailedNoticePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
