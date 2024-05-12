// the buttons and title bar in the calendar.

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { ReactHTMLElement } from "react";
import NavArrow from "@/app/assets/icons/nav-arrow-right.svg";
import FastArrow from "@/app/assets/icons/fast-arrow-right.svg";

dayjs.extend(LocalizedFormat);

interface CalendarNavbarProps {
	value: dayjs.Dayjs;
	viewmode?: string;
	onChange: React.MouseEventHandler;
}

interface TitleStringProps {
	value: dayjs.Dayjs;
	viewmode?: string;
}

// generates current title of calendar e,g, "2018 October" or "2022"
const TitleString = ({ value, viewmode }: TitleStringProps): string => {
	const fmtTable = new Map<string, string>();
	fmtTable.set("monthly", "YYYY MMMM");
	fmtTable.set("annual", "YYYY");

	return dayjs(value).format(fmtTable.get(viewmode ? viewmode : "monthly"));
};

const CalendarNavbar = ({ value, viewmode, onChange }: CalendarNavbarProps) => {
	return (
		<div className="self-stretch p-2.5 justify-between items-center inline-flex">
			<div className="justify-start items-start gap-5 flex bg-transparent">
				<button className="w-6 h-6 relative" name="decrement-big">
					<FastArrow className="rotate-180" />
				</button>
				<button className="w-6 h-6 relative" name="decrement-small">
					<NavArrow className="rotate-180" />
				</button>
			</div>
			<div className="text-neutral-800 text-base font-bold font-['Pretendard Variable']">
				<TitleString value={value} viewmode={viewmode} />
			</div>
			<div className="justify-start items-start gap-5 flex bg-transparent">
				<button className="w-6 h-6 relative" name="increment-small">
					<NavArrow />
				</button>
				<button className="w-6 h-6 relative" name="increment-big">
					<FastArrow />
				</button>
			</div>
		</div>
	);
};

export default CalendarNavbar;
