'use client';

import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lexend } from 'next/font/google';
import styles from './Pricing.module.css';
import { FaCheck } from 'react-icons/fa';

const lexend = Lexend({
  weight: '500',
  subsets: ['latin']
})

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;

  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function Pricing({
  user,
  products,
  subscription
}: Props) {
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/register');
    }

    if (price.product_id === subscription?.prices?.products?.id) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center place-items-center">
          <h1 className={`font-display text-3xl tracking-tight text-slate-900 sm:text-4xl sm:text-center ${lexend.className}`}>
            Pricing Plans
          </h1>
          <p className="mt-4 text-lg tracking-tight text-slate-700 sm:text-center">
            Straightforward pricing, suited to all.
          </p>
          <div className="mt-6 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:mx-0">
            {products[0].prices?.map((price) => {
              const priceString =
                price.unit_amount &&
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currency!,
                  minimumFractionDigits: 0
                }).format(price.unit_amount / 100);

              return (
                <section key={price.interval} className="flex flex-col rounded-3xl px-6 sm:px-8 order-first bg-blue-600 py-8 lg:order-none">
                  <h3 className="mt-1 ml-1 font-display text-lg text-white">/ {price.interval}</h3>
                  <p className="mt-5 text-base text-white">
                    {price.description}
                  </p>
                  <p className={`order-first font-display text-5xl font-light tracking-tight text-white ${lexend.className}`}>
                  {priceString}
                  </p>
                  <ul
                    role="list"
                    className="order-last mt-8 flex flex-col gap-y-3 text-sm text-white"
                  >
                    <li className="flex">
                      <FaCheck />
                      <span className="ml-4">Send 25 quotes and invoices</span>
                    </li>
                    <li className="flex">
                      <FaCheck />
                      <span className="ml-4">Connect up to 5 bank accounts</span>
                    </li>
                  </ul>
                  <Button
                      variant="slim"
                      type="button"
                      loading={priceIdLoading === price.id}
                      onClick={() => handleCheckout(price)}
                      className={styles.signup}
                    >
                      {products[0].name ===
                      subscription?.prices?.products?.name
                        ? 'Manage'
                        : 'Subscribe'}
                    </Button>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}