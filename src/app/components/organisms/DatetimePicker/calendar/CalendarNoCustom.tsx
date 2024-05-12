// has same features, but this is a regular picker

import React, { useState } from "react";
import dayjs from "dayjs";

interface CalendarNoCustomProps {
	value?: dayjs.Dayjs;
	onChange: React.EventHandler<any>;
}

const CalendarNoCustom = ({ value, onChange }: CalendarNoCustomProps) => {
	return (
		<div className="border border-solid border-primary radius-[7px] bg-white">
			<input
				className="bg-transparent"
				type="datetime-local"
				name="datetime-noCustom"
				value={value ? dayjs(value).format("YYYY-MM-DDThh:mm:ss") : undefined}
				onChange={onChange}
			/>
		</div>
	);
};

export default CalendarNoCustom;
