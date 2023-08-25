'use client';

import { useSupabase } from '@/app/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';

interface Props {
  view: ViewType | undefined;
}

export default function AuthUI({view}: Props) {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        redirectTo={`${getURL()}/pricing`}
        magicLink={false}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: 9999,
            },
          },
          variables: {
            default: {
              colors: {
                brand: 'rgb(37, 99, 235)',
                brandAccent: 'rgb(59, 130, 246)',
              },
            },
          },
        }}
        view={view}
      />
    </div>
  );
}
