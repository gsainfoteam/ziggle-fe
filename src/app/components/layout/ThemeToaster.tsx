'use client';

import { useTheme } from 'next-themes';
import { Toaster, ToasterProps } from 'sonner';

const ThemeToaster = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-left"
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast: '!bg-white !border-greyLight',
        },
      }}
    />
  );
};

export default ThemeToaster;
