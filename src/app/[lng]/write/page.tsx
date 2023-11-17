import dynamic from 'next/dynamic';

const dymamicWritePage = dynamic(() => import('./WritePage'), {
  ssr: false,
});

export default dymamicWritePage;
