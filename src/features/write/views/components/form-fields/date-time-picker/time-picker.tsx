import './time-picker.css';

interface TimePickerProps {
  time: string;
  setTime: (value: string) => void;
}

export const TimePicker = ({ time, setTime }: TimePickerProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={onChange}
      className="bg-primary relative flex items-center justify-center rounded-r-md py-1 pr-2 pl-1 font-semibold outline-none hover:cursor-pointer"
    />
  );
};
