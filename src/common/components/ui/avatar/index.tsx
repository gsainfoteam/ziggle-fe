import DefaultProfileIcon from '@/assets/icons/default-profile.svg?react';
import { cn } from '@/common/utils';

interface AvatarProps {
  name?: string;
  picture?: string | null;
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
}

export const Avatar = ({
  name,
  picture,
  className,
  imageClassName,
  labelClassName,
}: AvatarProps) => (
  <div className={cn('flex items-center gap-3', className)}>
    {picture ? (
      <img
        src={picture}
        alt={name}
        className={cn('shrink-0 rounded-full', imageClassName)}
      />
    ) : (
      <DefaultProfileIcon className={cn('shrink-0', imageClassName)} />
    )}
    {name && (
      <span
        className={cn(
          'text-dark_dark align-middle font-medium whitespace-nowrap',
          labelClassName,
        )}
      >
        {name}
      </span>
    )}
  </div>
);
