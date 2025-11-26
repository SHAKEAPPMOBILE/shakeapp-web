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
      <div className="relative w-full">
        <FadeIn delay={0.4} className="relative">
          <img
            src="/CoverBlue.png"
            alt="Cover Blue"
            width="100%"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </FadeIn>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <FadeIn delay={0.6}>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-white drop-shadow-lg px-4">
              Serendipity starts here. <br className="md:hidden" /> Shake up your social life.
            </h2>
          </FadeIn>
        </div>
      </div>

      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </main>
  );
}