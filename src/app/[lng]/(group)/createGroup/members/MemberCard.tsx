import Close from '@/assets/icons/close.svg';

interface MemberCardProps {
  name: string;
  email: string;
  studentId?: string;
  onCloseClick?: () => void;
}

const MemberCard = ({
  name,
  email,
  studentId,
  onCloseClick,
}: MemberCardProps) => {
  return (
    <li className="box-border flex w-full justify-between rounded-[5px] bg-greyLight py-[10px] pl-[15px] pr-[10px]">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="flex gap-[10px]">
          <div className="text-sm">{email}</div>
          {studentId && (
            <>
              <div className="h-[14px] w-[1px] border-greyBorder" />

              <div className="text-sm">{studentId}</div>
            </>
          )}
        </div>
      </div>

      <Close onClick={onCloseClick} className="w-6" />
    </li>
  );
};

export default MemberCard;
