import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import dummyMypageArticles from "src/mock/dummy-mypage-articles";
import MyPageInfo from "src/mock/dummy-mypage-info";
import MypageProfile from "src/pages/myPage/MypageProfile";
import MypageSeperate from "src/pages/myPage/MypageSeperate";
import MypageTable from "src/pages/myPage/MypageTable";

const MyPage = () => {
  return (
    <>
      <Area>
        <Content
          style={{
            width: "1000px",
            height: "1000px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", height: "1000px", alignItems: "center" }}
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

              <MypageSeperate />
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
                  articles={dummyMypageArticles.articles2}
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
        </Content>
      </Area>
    </>
  );
};

export default MyPage;
