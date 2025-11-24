import Xmark_white from '@/assets/icons/xmark_white.svg';

export default function ConfirmModal({
  isOpen,
  unmount,
}: {
  isOpen: boolean;
  unmount: () => void;
}) {
  if (isOpen)
    return (
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
        onClick={unmount}
      >
        <div
          className="flex h-[500px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button onClick={unmount}>
              <Xmark_white />
            </button>
          </div>
          <p className="mb-3 text-xl font-semibold md:text-2xl">
            정말로 거절하시겠습니까?
          </p>
        </div>
      </div>
    );
  else return;
}
