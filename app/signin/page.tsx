import { getSession } from '@/app/supabase-server';
import AuthUI from '@/components/ui/Auth';

import { redirect } from 'next/navigation';
import Logo from '@/components/icons/Logo';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Logo/>
        </div>
        <AuthUI view="sign_in" />
      </div>
    </div>
  );
}
