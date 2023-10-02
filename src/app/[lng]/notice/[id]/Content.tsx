import DOMPurify from 'isomorphic-dompurify';

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps) => {
  return (
    <div
      className={[
        'font-normal leading-6',
        '[&_p]:text-base md:[&_p]:text-lg',
        '[&_h1]:text-2xl md:[&_h1]:text-4xl',
        '[&_h2]:text-xl md:[&_h2]:text-2xl',
        '[&_h3]:text-lg md:[&_h3]:text-xl',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default Content;
