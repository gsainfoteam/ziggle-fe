export default function CautionModal({
  isOpen,
  unmount,
}: {
  isOpen: boolean;
  unmount: () => void;
}) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 dark:bg-gray-100/50"
      onClick={unmount}
    >
      <div
        className="flex h-[500px] w-[520px] flex-col justify-between  rounded-xl bg-white p-[25px] "
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}
