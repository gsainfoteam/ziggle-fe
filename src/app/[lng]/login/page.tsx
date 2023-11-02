import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginPage = ({
  searchParams,
}: {
  searchParams: { code?: string; state?: string };
}) => {
  const cookieStore = cookies();
  if (Object.keys(searchParams).length == 0) {
    redirect('/api/login');
  }

  const savedState = cookieStore.get('login_state');
  if (savedState !== searchParams.state) {
    return <div>Invalid state</div>;
  }

  return null;
};

export default LoginPage;
