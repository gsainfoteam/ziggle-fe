import { Navigate, Route, Routes } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import Layout from "./layout/Layout";
import DetailedNoticePage from "./pages/detailedNotice/DetailedNoticePage";
import HomePage from "./pages/home/HomePage";
import MyPage from "./pages/myPage/MyPage";
import NoticeWritingPage from "./pages/noticeWriting/NoticeWritingPage";
import SearchPage from "./pages/searchPage/SearchPage";
import GlobalStyle from "./styles/globalStyles";
import Paths from "./types/paths";

const App = () => {
  const { userInfo } = useAuth({
    redirectUrl: Paths.home,
  });

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Navigate to={Paths.home} replace />} />

          <Route path={Paths.home} element={<HomePage />} />
          <Route path={Paths.search} element={<SearchPage />} />
          <Route
            path={Paths.noticeDetail + ":id"}
            element={<DetailedNoticePage />}
          />

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
