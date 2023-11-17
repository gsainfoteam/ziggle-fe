import dynamic from 'next/dynamic';

const dynamicWritePage = dynamic(() => import('./WritePage'), { ssr: false });

export default dynamicWritePage;
