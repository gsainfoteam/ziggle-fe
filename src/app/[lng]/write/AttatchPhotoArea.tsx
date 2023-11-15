import { useEffect, useRef } from 'react';

interface AttatchPhotoAreaProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const AttatchPhotoArea = ({ files, setFiles }: AttatchPhotoAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedfiles = Array.from(event.dataTransfer.files);

    setFiles([...files, ...droppedfiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
    event.target.value = '';
  };

  return (
    <>
      <input
        className="hidden"
        id={'file-input'}
        type={'file'}
        accept={'image/*'}
        multiple
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{
          display: 'none',
        }}
      />
      <label htmlFor="file-input" />

      <div
        className="flex items-center justify-center border-2 border-dashed border-secondayText"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {files.length > 0 ? (
          <div className="grid grid-col-3 gap-1.5 md:gap-3 p-1.5 md:p-2.5">
            {files.map((file, index) => (
              <></>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AttatchPhotoArea;
