'use client';

import MainLinks from '@/app/(home)/components/MainLinks';
import SuccessModal from '@/components/SuccessModal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { FadeIn } from '@/components/FadeIn';

function HomeContent() {
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
    <>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        city={city}
      />
    </>
  );
}

export default function Home() {
  return (
    <main
      className="w-full mx-auto flex flex-col gap-[80px] mt-[80px]">
      <MainLinks />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <FadeIn delay={0.4}>
        <img
          src="/CoverBlue.png"
          alt="Cover Blue"
          width="100%"
          style={{ width: '100%', height: 'auto' }}
        />
      </FadeIn>

      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </main>
  );
}