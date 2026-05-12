interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return (
    <div className="bg-secondary text-primary dark:bg-dark_secondary rounded-[5px] px-2.5 py-1.25 text-lg">
      #{name}
    </div>
  );
};
