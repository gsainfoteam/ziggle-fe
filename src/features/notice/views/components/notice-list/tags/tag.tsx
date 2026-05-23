interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return (
    <div className="bg-secondary text-primary dark:bg-dark_secondary rounded-sm px-1.5 py-1 text-sm">
      #{name}
    </div>
  );
};
