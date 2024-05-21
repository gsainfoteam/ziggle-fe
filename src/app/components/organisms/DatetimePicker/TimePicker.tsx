import './TimePicker.css';

interface TimePickerProps {
  time: string;
  setTime: (value: string) => void;
}

const TimePicker = ({ time, setTime }: TimePickerProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={onChange}
      className="relative flex items-center justify-center rounded-r-md bg-primary py-1 pr-2 font-semibold outline-none hover:cursor-pointer"
    />
  );
};

export default TimePicker;
