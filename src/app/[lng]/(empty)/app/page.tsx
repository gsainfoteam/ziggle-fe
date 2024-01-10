import { headers } from 'next/headers';

const AppOpenPage = () => {
  const h = headers();
  return <>{JSON.stringify(h)}</>;
};

export default AppOpenPage;
