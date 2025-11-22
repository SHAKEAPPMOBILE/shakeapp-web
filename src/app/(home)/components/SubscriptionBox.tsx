'use client';

import React, { useState } from 'react';
import GradientButton from '@/components/GradientButton';

export default function SubscriptionBox() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Call the API
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setIsSubscribed(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 w-full max-w-md mx-auto mt-4 h-[200px]">
        <span className="text-4xl mb-4">🎉</span>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thanks for subscribing!</h3>
        <p className="text-center text-gray-600">
          You're now in the loop for all things Shake.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 w-full max-w-md mx-auto mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">✉️</span>
        <h3 className="text-xl font-bold text-gray-800">Stay in the Loop!</h3>
      </div>

      <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
        Get early access and exclusive updates about Shake
      </p>

      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="w-full">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className={`w-full px-4 h-[54px] rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
        </div>
        <GradientButton
          type="submit"
          disabled={isLoading}
          className={`w-full h-[54px] rounded-xl text-base md:text-lg px-0 md:px-0 py-0 flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Subscribing...</span>
            </div>
          ) : (
            'Subscribe'
          )}
        </GradientButton>
      </form>
    </div>
  );
}
