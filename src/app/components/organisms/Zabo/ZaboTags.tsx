import { Notice } from '@/api/notice/notice';
import { PropsWithLng } from '@/app/i18next';

import Tag from '../../molecules/Tag';

interface ZaboTagsProps {
  notice: Notice;
}

const ZaboTags = ({ notice: { tags }, lng }: PropsWithLng<ZaboTagsProps>) => {
  return (
    <div className={'mx-3 flex flex-wrap gap-[5px]'}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} lng={lng} />
      ))}
    </div>
  );
};

export default ZaboTags;
