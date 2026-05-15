interface NoticeDetailTitleProps {
  children: string;
}

export const NoticeDetailTitle = ({ children }: NoticeDetailTitleProps) => (
  <div className="line-clamp-3 text-[25px] leading-7.5 font-semibold">
    {children}
  </div>
);
