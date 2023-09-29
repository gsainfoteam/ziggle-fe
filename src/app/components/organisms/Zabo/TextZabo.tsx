import dayjs from 'dayjs';

interface TextZaboProps {
  title: string;
  content: string;
  date: dayjs.Dayjs;
  views: number;
  author: string;
}

const TextZabo = ({ title, content, date, views, author }: TextZaboProps) => {
  return (
    <div className="border rounded border-secondayText p-5 flex flex-col gap-2.5">
      <div className="font-bold text-3xl">{title}</div>
      <div className="font-medium text-lg">{content}</div>
      <div className="text-sm text-secondayText flex">
        <div className="font-medium">{date.format('L')}</div>
        <div className="font-bold">{views}</div>
      </div>
      <div className="font-bold">{author}</div>
    </div>
  );
};

export default TextZabo;
