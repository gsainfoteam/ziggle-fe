import dayjs from "dayjs";
import TileBtn from "./TileBtn";

interface CalendarAnnualViewProps {
	value: dayjs.Dayjs;
	onChange: React.EventHandler<React.MouseEvent>;
}

// displays months in the year of selected date
// each months are displayed in 4~6 rows 3 col
const CalendarAnnualView = ({ value, onChange }: CalendarAnnualViewProps) => {
	let monthsBox: JSX.Element[] = [];
	let it = value.month(1);
	for (let i = 0; i < 4; i++) {
		let monthsRow: JSX.Element[] = [];
		for (let j = 0; j < 3; j++) {
			monthsRow.push(
				<TileBtn
					value={it}
					selected={value.isSame(it, "month")}
					now={dayjs().isSame(it, "month")}
					inactive={value.isSame(it, "year")}
					onChange={onChange}
					scope={"month"}
				/>
			);
			it = it.month(it.month() + 1);
		}
		monthsBox.push(<div>{...monthsRow}</div>);
	}

	return (
		<div className="flax max-w-full justify-stretch bg-transparent">
			{...monthsBox}
		</div>
	);
};

export default CalendarAnnualView;
