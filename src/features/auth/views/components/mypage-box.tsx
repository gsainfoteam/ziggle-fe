export const MypageBox = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-greyLight dark:bg-dark_greyDark flex flex-col items-center gap-4 rounded-xl p-4">
      {children}
    </div>
  );
};
