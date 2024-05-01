import Image from 'next/image';

interface ImageStackProps {
  width?: number;
  srcs: string[];
  alt: string;
}

const ImageStack = ({ width, srcs, alt }: ImageStackProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {srcs.map((src, i) => (
        <div key={src} className="relative">
          <Image
            src={src}
            alt={alt}
            width={width ?? 400}
            height={300}
            className="shrink-0 basis-48 rounded-[10px] border-2 border-greyBorder object-cover md:basis-80"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageStack;
