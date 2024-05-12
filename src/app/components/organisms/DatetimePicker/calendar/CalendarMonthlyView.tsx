import dayjs from "dayjs";
import TileBtn from "./TileBtn";

interface CalendarMonthlyViewProps {
	value: dayjs.Dayjs;
	onChange: React.EventHandler<React.MouseEvent>;
}

const CalendarMonthlyView = ({ value, onChange }: CalendarMonthlyViewProps) => {
	//first row : weekdays
	const weekdays = ["일", "월", "화", "수", "목", "금", "토"]; //placeholder. needs i18n
	let weekRow: JSX.Element[] = [];
	weekdays.forEach((v) => {
		weekRow.push(<div className="w-[40px] font-bold">{v}</div>);
	});

	//parsing each weeks
	//firstDay is the first date displayed in calendar (e.g. 4/28 for may 2024)
	let weeks: JSX.Element[] = [];
	let it = value.date(1 - value.date(1).day());
	while (true) {
		let week: JSX.Element[] = [];
		for (let i = 0; i < 7; i++) {
			week.push(
				<TileBtn
					value={it}
					selected={value.isSame(it, "day")}
					now={dayjs().isSame(it, "day")}
					inactive={value.isSame(it, "month")}
					onChange={onChange}
					scope={"date"}
				/>
			);
			it = it.date(it.date() + 1);
		}
		weeks.push(
			<div className="flex max-w-full h-[40px] bg-transparent">{...week}</div>
		);

		//escape after adding all weeks
		if (!it.isSame(value, "month")) break;
	}

	// generates array of table with 4~6 rows and 7 columns
	// each row is a flex box
	return (
		<div className="flax max-w-full justify-stretch bg-transparent">
			<div className="flex max-w-full justify-stretch h-[40px] bg-transparent">
				{...weekRow}
			</div>
			{...weeks}
		</div>
	);
};

export default CalendarMonthlyView;
