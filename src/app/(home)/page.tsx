'use client';

import MainLinks from '@/app/(home)/components/MainLinks';
import SuccessModal from '@/components/SuccessModal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    const success = searchParams.get('success');
    const cityParam = searchParams.get('city');

    if (success === 'true' && cityParam) {
      setCity(cityParam);
      setShowSuccess(true);

      // Clean up URL after showing modal
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return (
    <main
      className="w-full mx-auto flex flex-col gap-[80px] mt-[80px]">
      <MainLinks />
      <img
        src="/CoverBlue.png"
        alt="Cover Blue"
        width="100%"/>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        city={city}
      />
    </main>
  );
}