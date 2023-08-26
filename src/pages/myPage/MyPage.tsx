import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Area from "src/atoms/containers/area/Area";
import MypageProfile from "src/pages/myPage/MypageProfile";
import MypageSeperate from "src/pages/myPage/MypageSeperate";
import MypageTable from "src/pages/myPage/MypageTable";
import Paths, { NoticeSection } from "src/types/paths";
import { User } from "src/types/types";

interface MyPageProps {
  userInfo: User;
}

const SHOW_NOTICE_PAGE = 4;

const MyPage = ({ userInfo }: MyPageProps) => {
  const isSmall = useMediaQuery({ maxWidth: 1200 });
  const { data: myNotices } = useQuery(
    [queryKeys.getAllNotices, { my: "own", limit: SHOW_NOTICE_PAGE }],
    getAllNotices,
  );
  const { data: reminders } = useQuery(
    [queryKeys.getAllNotices, { my: "reminders", limit: SHOW_NOTICE_PAGE }],
    getAllNotices,
  );

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
              name={userInfo.user_name}
              id={userInfo.student_id}
              phone={userInfo.user_phone_number}
              email={userInfo.user_email_id}
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
                articles={myNotices?.list ?? []}
                link={Paths.section + NoticeSection.written}
              />
            </div>

            <div>
              <MypageTable
                title="리마인드 설정한 게시물 목록"
                articles={reminders?.list ?? []}
                link={Paths.section + NoticeSection.reminded}
              />
            </div>
          </div>
        </div>
      </Area>
    </>
  );
};

export default MyPage;
