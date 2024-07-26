import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {session?.user?.name}!</p>
    </div>
  );
}
