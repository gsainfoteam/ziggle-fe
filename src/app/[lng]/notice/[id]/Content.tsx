import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps) => {
  const dompurify = DOMPurify(new JSDOM('<!DOCTYPE html>').window);
  const sanitizedHtml = dompurify.sanitize(content);
  return (
    <div
      className={[
        'font-normal leading-6',
        '[&_p]:text-base md:[&_p]:text-lg',
        '[&_h1]:text-2xl md:[&_h1]:text-4xl',
        '[&_h2]:text-xl md:[&_h2]:text-2xl',
        '[&_h3]:text-lg md:[&_h3]:text-xl',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default Content;
