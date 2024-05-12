// style selector
import dayjs, { UnitType } from "dayjs";

interface TileBtnProps {
	value: dayjs.Dayjs;
	scope: string;
	onChange: React.EventHandler<React.MouseEvent>;
	selected?: boolean;
	now?: boolean;
	inactive?: boolean;
}

const TileBtn = ({
	value,
	scope,
	onChange,
	selected,
	now,
	inactive,
}: TileBtnProps) => {
	const defaultStyle = "bg-transparent border-none ";
	const selectedStyle = "bg-primary border-none text-bold text-white";
	const inactiveStyle = "text-deselected";
	const nowStyle = "border-2 border-primary";

	//determines style by args, and returns a button
	return (
		<button
			className={`
            ${selected ? selectedStyle : defaultStyle} ${
				inactive ? inactiveStyle : ""
			} ${now ? nowStyle : ""} 
            w-[40px] text-center radius-[5px] hover:brightness-[90%]
            `}
			value={dayjs(value).format("YYYY-MM-DD")}
		>
			{value.get(scope as UnitType)}
		</button>
	);
};

export default TileBtn;
