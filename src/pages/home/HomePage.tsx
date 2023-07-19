import Area from "../../atoms/containers/area/Area";
import Spacer from "../../atoms/spacer/Spacer";
import AcademicNotices from "./AcademicNotices";
import Banner from "./Banner";
import EventNotices from "./EventNotices";
import HotNotices from "./HotNotices";
import NormalNotices from "./NormalNotices";
import RecruitNotices from "./RecruitNotices";
import UrgentNotices from "./UrgentNotices";

const HomePage = () => {
  return (
    <>
      <Area>
        <Banner />
      </Area>

      <Spacer height={"60px"} />

      <Area>
        <UrgentNotices />
      </Area>

      <Spacer height={"60px"} />

      <Area>
        <HotNotices />

        <Spacer height={"60px"} />

        <EventNotices />

        <Spacer height={"60px"} />

        <RecruitNotices />

        <Spacer height={"60px"} />

        <NormalNotices />

        <Spacer height={"60px"} />

        <AcademicNotices />
      </Area>
    </>
  );
};

export default HomePage;
