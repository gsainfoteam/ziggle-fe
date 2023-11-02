import ArrowRightOutlinedIcon from '@/assets/icons/arrow-right-outlined.svg';

const HorizontalScrollButton = ({ children }: React.PropsWithChildren) => {
  return <div className="flex gap-3">{children}</div>;
};

const Button = ({
  direction,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'left' | 'right';
}) => {
  return (
    <button
      {...props}
      className="transition-transform active:scale-90 disabled:active:scale-100"
    >
      <ArrowRightOutlinedIcon
        className={
          'w-8 h-8 md:w-9 md:h-9' +
          (direction === 'left' ? ' rotate-180' : '') +
          (props.disabled ? '' : ' stroke-primary')
        }
      />
    </button>
  );
};

const Left = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button {...props} direction="left" />
);

const Right = ({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button {...props} direction="right" />
);

HorizontalScrollButton.Left = Left;
HorizontalScrollButton.Right = Right;

export default HorizontalScrollButton;
