import dynamic from 'next/dynamic';

const dynamicImportedWritePage = dynamic(() => import('./WritePage'), {
  ssr: false,
});

export default dynamicImportedWritePage;
