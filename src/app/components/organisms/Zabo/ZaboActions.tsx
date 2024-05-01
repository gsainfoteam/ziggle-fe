import { Notice } from '@/api/notice/notice';
import Fire from '@/assets/fire-outlined.svg';
import Share from '@/assets/icons/share.svg';

interface ZaboActionsProps {
  notice: Notice;
}

const ZaboActions = ({ notice: { reactions } }: ZaboActionsProps) => {
  return (
    <div className={'mx-2 my-[10px] flex items-center justify-between'}>
      <div className={'flex items-center gap-1'}>
        <button className="stroke-text stroke-2">
          <Fire width={36} />
        </button>
        <p className={'font-semibold'}>
          {reactions.find((reaction) => reaction.emoji === '🔥')?.count || 0}
        </p>
      </div>

      <button>
        <Share width={28} className="stroke-text stroke-2" />
      </button>
    </div>
  );
};

export default ZaboActions;
