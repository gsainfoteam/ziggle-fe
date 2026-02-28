interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return (
    <div className="bg-secondary text-primary dark:bg-dark_secondary rounded-[5px] px-[10px] py-[5px] text-lg">
      #{name}
    </div>
  );
};
