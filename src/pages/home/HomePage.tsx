import useIsMobile from "src/hooks/useIsMobile";
import Paths, { NoticeSection } from "src/types/paths";

import Area from "../../atoms/containers/area/Area";
import Spacer from "../../atoms/spacer/Spacer";
import AcademicNotices from "./AcademicNotices";
import Banner from "./Banner";
import EventNotices from "./EventNotices";
import GeneralNotices from "./GeneralNotices";
import HotNotices from "./HotNotices";
import RecruitNotices from "./RecruitNotices";
import UrgentNotices from "./UrgentNotices";

export interface NoticeSectionProps {
  link?: string;
}

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Area>
        <Banner />
      </Area>

      <Spacer height={isMobile ? "0px" : "60px"} />

      <Area>
        <UrgentNotices link={Paths.section + NoticeSection.urgent} />
      </Area>

      <Spacer height={"60px"} />

      <Area>
        <HotNotices link={Paths.section + NoticeSection.hot} />

        <Spacer height={"60px"} />

        <EventNotices link={Paths.section + NoticeSection.event} />

        <Spacer height={"60px"} />

        <RecruitNotices link={Paths.section + NoticeSection.recruit} />

        <Spacer height={"60px"} />

        <GeneralNotices link={Paths.section + NoticeSection.general} />

        <Spacer height={"60px"} />

        <AcademicNotices />
      </Area>
    </>
  );
};

export default HomePage;
