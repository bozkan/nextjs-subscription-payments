import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';
import LinkButton from '@/components/ui/LinkButton';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className={`relative z-50 flex justify-between ${s.root}`}>
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="flex items-center md:gap-x-12">
          <Link href="/" className={s.logo} aria-label="Logo">
            <Logo />
          </Link>
          <div className="hidden md:flex md:gap-x-6">
            {user ? (
              <>
                <LinkButton link='/account' value="Account"/>
                <LinkButton link='/dashboard' value="Dashboard"/>
              </>
            ) : (
              <LinkButton link='/pricing' value="Pricing"/>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-5 md:gap-x-8">
          {user ? (
            <SignOutButton />
          ) : (
            <>
              <LinkButton link='/signin' value="Sign in"/>
              <LinkButton link='/register' value="Get started today" clss={s.signup}/>
            </>
          )}
        </div>
      </nav>
    </div>   
  );
}
