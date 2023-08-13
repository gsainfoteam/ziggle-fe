import { useMediaQuery } from "react-responsive";
import Area from "src/atoms/containers/area/Area";
import dummyMypageArticles from "src/mock/dummy-mypage-articles";
import MyPageInfo from "src/mock/dummy-mypage-info";
import MypageProfile from "src/pages/myPage/MypageProfile";
import MypageSeperate from "src/pages/myPage/MypageSeperate";
import MypageTable from "src/pages/myPage/MypageTable";
import { User } from "src/types/types";

interface MyPageProps {
  userInfo: User;
}

const MyPage = ({ userInfo }: MyPageProps) => {
  const isSmall = useMediaQuery({ maxWidth: 1200 });
  const Height = isSmall ? "1500px" : "1000px";
  return (
    <>
      <Area>
        <div
          style={{
            display: "flex",
            height: Height,
            alignItems: "center",
            flexDirection: isSmall ? "column" : "row",
          }}
        >
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              margin: "10px",
            }}
          >
            <MypageProfile
              name={MyPageInfo.name}
              id={MyPageInfo.id}
              phone={MyPageInfo.phone}
              email={MyPageInfo.email}
            />

            {!isSmall && <MypageSeperate />}
          </div>

          <div
            style={{
              flex: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "50px" }}>
              <MypageTable
                title="내가 게시한 공지 목록"
                articles={dummyMypageArticles.articles1}
              />
            </div>

            <div>
              <MypageTable
                title="리마인드 설정한 게시물 목록"
                articles={dummyMypageArticles.articles3}
              />
            </div>
          </div>
        </div>
      </Area>
    </>
  );
};

export default MyPage;
