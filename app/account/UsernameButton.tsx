'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useState } from 'react';
import { updateFullName } from '@/utils/supabase-admin';

interface Props {
  fullName: string;
  uuid: string | undefined;
}

export default function UsernameButton({ fullName, uuid }: Props) {

  const namePlaceholder = '64 characters maximum';
  const [warning, setWarning] = useState(namePlaceholder);

  const showUpdated = () => {
    setWarning('Updated ✅');
    setTimeout(() => {
      setWarning(namePlaceholder);
    }, 3000);
  }

  const updateName = async (event: any) => {
    event.preventDefault();
    showUpdated();
    const { name } = event.target.elements;

    if (uuid) {
      await updateFullName(name.value, uuid );
    }
  };

  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">{warning}</p>
          <Button
            variant="slim"
            type="submit"
            form="nameForm"
  
          >
            Update Name
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="nameForm" onSubmit={updateName}>
          <input
            type="text"
            name="name"
            className="w-1/2 p-3 rounded-md bg-zinc-800"
            defaultValue={fullName ?? ''}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
      </div>
    </Card>
  );
}
