import DOMPurify from 'isomorphic-dompurify';

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps) => {
  return (
    <div
      className={[
        'font-normal leading-[1.4]',
        '[&_p]:my-4 [&_p]:text-lg',
        '[&_h1]:text-3xl',
        '[&_h2]:text-2xl',
        '[&_h3]:text-xl',
        '[&_a]:text-secondaryText [&_a]:underline',
        '[&_strong]:font-semibold',
        'break-all',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default Content;
