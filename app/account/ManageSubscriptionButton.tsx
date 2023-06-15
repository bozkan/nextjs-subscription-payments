'use client';

import Button from '@/components/ui/Button';
import { postData } from '@/utils/helpers';

import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  session: Session;
}

export default function ManageSubscriptionButton({ session }: Props) {
  const router = useRouter();
  const [stripeLoading, setStripeLoading] = useState<boolean>(false);

  const redirectToCustomerPortal = async () => {
    try {
      setStripeLoading(true);
      const { url } = await postData({
        url: '/api/create-portal-link'
      });
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
      <Button
        variant="slim"
        disabled={!session}
        onClick={redirectToCustomerPortal}
        loading={stripeLoading}
      >
        Open customer portal
      </Button>
    </div>
  );
}
