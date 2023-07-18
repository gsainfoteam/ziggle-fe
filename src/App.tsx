import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import HomePage from "./pages/home/HomePage";
import MyPage from "./pages/myPage/myPage";
import NoticeWriting from "./pages/noticeWriting/NoticeWriting";
import PlaygroundPage from "./pages/playground/PlaygroundPage";
import SearchPage from "./pages/searchPage/searchPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/notice/writing" element={<NoticeWriting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
