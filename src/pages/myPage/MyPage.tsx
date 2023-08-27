import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { getUserInfo } from "src/apis/user/user-api";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import useIsMobile from "src/hooks/useIsMobile";
import MypageProfile from "src/pages/myPage/MypageProfile";
import MypageSeperate from "src/pages/myPage/MypageSeperate";
import MypageTable from "src/pages/myPage/MypageTable";

const MyPage = () => {
  const { data: userInfo } = useQuery([queryKeys.getUserInfo], getUserInfo);
  const isMobile = useIsMobile();
  const isSmall = useMediaQuery({ maxWidth: 1200 });
  const { data: myNotices } = useQuery(
    [queryKeys.getAllNotices, { my: "own" }],
    getAllNotices,
  );
  const { data: reminders } = useQuery(
    [queryKeys.getAllNotices, { my: "reminders" }],
    getAllNotices,
  );

  const Height = isSmall ? "1500px" : "1000px";

  return userInfo ? (
    <Area>
      <Content>
        <div
          style={{
            display: "flex",
            height: Height,
            alignItems: "center",
            flexDirection: isSmall ? "column" : "row",
            gap: "40px 0",
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
              name={userInfo.user_name}
              id={userInfo.student_id}
              phone={userInfo.user_phone_number}
              email={userInfo.user_email_id}
            />

            {!isSmall && <MypageSeperate />}
          </div>

          <div
            style={{
              width: isMobile ? "100%" : undefined,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: isMobile ? 0 : "50px",
                width: isMobile ? "100%" : undefined,
              }}
            >
              <MypageTable
                title="내가 게시한 공지 목록"
                articles={myNotices?.list ?? []}
              />
            </div>

            <Spacer height={isMobile ? "50px" : "0px"} />

            <div
              style={{
                width: isMobile ? "100%" : undefined,
              }}
            >
              <MypageTable
                title="리마인드 설정한 게시물 목록"
                articles={reminders?.list ?? []}
              />
            </div>
          </div>
        </div>
      </Content>
      <Spacer height="50px" />
      {/* Table이 Footer를 넘어가는 신기한 현상이 발생해서 임시조치 했습니다. */}
    </Area>
  ) : (
    <></>
  );
};

export default MyPage;
