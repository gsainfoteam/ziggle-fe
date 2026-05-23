interface NoticeCardImageBadgeProps {
  imageUrls: string[];
  title: string;
}

export const NoticeCardImageCarousel = ({
  imageUrls,
  title,
}: NoticeCardImageBadgeProps) => {
  if (imageUrls.length === 0) return null;

  return (
    <div className="relative shrink-0">
      <img
        src={imageUrls[0]}
        alt={title}
        className="max-h-48 w-auto max-w-40 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
      />
      {imageUrls.length > 1 && (
        <span className="bg-dark_dark/60 absolute top-1.5 right-1.5 rounded-full px-1.5 py-0.5 text-xs font-semibold text-white">
          +{imageUrls.length - 1}
        </span>
      )}
    </div>
  );
};
