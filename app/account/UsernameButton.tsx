'use client';

import Button from '@/components/ui/Button';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';

import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface Props {
  session: Session;
}

export default function UsernameButton({ session }: Props) {
  const router = useRouter();
  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };


  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
          <Button
            variant="slim"
            type="submit"
            form="nameForm"
            loading={true}
          >
            Update Name
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="nameForm" action={updateName}>
          <input
            type="text"
            name="name"
            className="w-1/2 p-3 rounded-md bg-zinc-800"
            defaultValue={userDetails?.full_name ?? ''}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
      </div>
    </Card>
  );
}
