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
          variables: {
            default: {
              colors: {
                brand: '#2e2e2e',
                brandAccent: '#2e2e2e',
                defaultButtonBackground: '#2e2e2e',
              }
            }
          }
        }}
        view={view}
      />
    </div>
  );
}
