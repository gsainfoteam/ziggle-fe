const MypageBox = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-greyLight p-4 dark:bg-dark_greyDark">
      {children}
    </div>
  );
};

export default MypageBox;
