'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

// Country → City options mapping
const COUNTRY_CITIES: Record<string, { label: string; value: string }[]> = {
  'USA': [
    { label: 'New York City', value: 'new-york-city' },
    { label: 'Los Angeles', value: 'los-angeles' },
    { label: 'San Francisco', value: 'san-francisco' },
    { label: 'Miami', value: 'miami' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Austin', value: 'austin' },
    { label: 'Boston', value: 'boston' },
    { label: 'Seattle', value: 'seattle' },
    { label: 'Dallas', value: 'dallas' },
    { label: 'Washington D.C.', value: 'washington-dc' },
  ],
  'Canada': [
    { label: 'Toronto', value: 'toronto' },
    { label: 'Vancouver', value: 'vancouver' },
    { label: 'Montreal', value: 'montreal' },
  ],
  'Mexico': [
    { label: 'Mexico City', value: 'mexico-city' },
    { label: 'Guadalajara', value: 'guadalajara' },
  ],

  'Colombia': [
    { label: 'Bogotá', value: 'bogota' },
    { label: 'Medellín', value: 'medellin' },
    { label: 'Cartagena', value: 'cartagena' },
  ],
  'Ecuador': [{ label: 'Quito', value: 'quito' }],
  'Peru': [{ label: 'Lima', value: 'lima' }],
  'Chile': [
    { label: 'Santiago', value: 'santiago' },
    { label: 'Valparaíso', value: 'valparaiso' },
  ],
  'Argentina': [
    { label: 'Buenos Aires', value: 'buenos-aires' },
    { label: 'Córdoba', value: 'cordoba' },
  ],
  'Uruguay': [{ label: 'Montevideo', value: 'montevideo' }],
  'Brazil': [
    { label: 'São Paulo', value: 'sao-paulo' },
    { label: 'Rio de Janeiro', value: 'rio-de-janeiro' },
    { label: 'Brasília', value: 'brasilia' },
    { label: 'Salvador', value: 'salvador' },
  ],
  'Panama': [{ label: 'Panama City', value: 'panama-city' }],

  'United Kingdom': [
    { label: 'London', value: 'london' },
    { label: 'Manchester', value: 'manchester' },
  ],
  'Ireland': [{ label: 'Dublin', value: 'dublin' }],
  'France': [
    { label: 'Paris', value: 'paris' },
    { label: 'Lyon', value: 'lyon' },
  ],
  'Netherlands': [{ label: 'Amsterdam', value: 'amsterdam' }],
  'Belgium': [{ label: 'Brussels', value: 'brussels' }],
  'Switzerland': [
    { label: 'Zurich', value: 'zurich' },
    { label: 'Geneva', value: 'geneva' },
  ],
  'Germany': [
    { label: 'Berlin', value: 'berlin' },
    { label: 'Munich', value: 'munich' },
    { label: 'Hamburg', value: 'hamburg' },
  ],
  'Austria': [{ label: 'Vienna', value: 'vienna' }],
  'Sweden': [{ label: 'Stockholm', value: 'stockholm' }],
  'Denmark': [{ label: 'Copenhagen', value: 'copenhagen' }],
  'Norway': [{ label: 'Oslo', value: 'oslo' }],
  'Finland': [{ label: 'Helsinki', value: 'helsinki' }],
  'Iceland': [{ label: 'Reykjavik', value: 'reykjavik' }],

  'Spain': [
    { label: 'Madrid', value: 'madrid' },
    { label: 'Barcelona', value: 'barcelona' },
  ],
  'Portugal': [
    { label: 'Lisbon', value: 'lisbon' },
    { label: 'Porto', value: 'porto' },
  ],
  'Italy': [
    { label: 'Rome', value: 'rome' },
    { label: 'Milan', value: 'milan' },
    { label: 'Florence', value: 'florence' },
  ],
  'Greece': [{ label: 'Athens', value: 'athens' }],
  'Hungary': [{ label: 'Budapest', value: 'budapest' }],
  'Czech Republic': [{ label: 'Prague', value: 'prague' }],
  'Poland': [
    { label: 'Warsaw', value: 'warsaw' },
    { label: 'Krakow', value: 'krakow' },
  ],
  'Romania': [{ label: 'Bucharest', value: 'bucharest' }],
  'Serbia': [{ label: 'Belgrade', value: 'belgrade' }],
  'Croatia': [{ label: 'Dubrovnik', value: 'dubrovnik' }],
  'Turkey': [{ label: 'Istanbul', value: 'istanbul' }],

  'Israel': [
    { label: 'Tel Aviv', value: 'tel-aviv' },
    { label: 'Jerusalem', value: 'jerusalem' },
  ],
  'United Arab Emirates': [
    { label: 'Dubai', value: 'dubai' },
    { label: 'Abu Dhabi', value: 'abu-dhabi' },
  ],
  'Qatar': [{ label: 'Doha', value: 'doha' }],
  'Oman': [{ label: 'Muscat', value: 'muscat' }],
  'Egypt': [{ label: 'Cairo', value: 'cairo' }],
  'Morocco': [
    { label: 'Marrakech', value: 'marrakech' },
    { label: 'Casablanca', value: 'casablanca' },
  ],
  'Tunisia': [{ label: 'Tunis', value: 'tunis' }],

  'India': [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'New Delhi', value: 'new-delhi' },
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Chennai', value: 'chennai' },
  ],
  'Sri Lanka': [{ label: 'Colombo', value: 'colombo' }],
  'Bangladesh': [{ label: 'Dhaka', value: 'dhaka' }],
  'Thailand': [
    { label: 'Bangkok', value: 'bangkok' },
    { label: 'Chiang Mai', value: 'chiang-mai' },
  ],
  'Singapore': [{ label: 'Singapore', value: 'singapore' }],
  'Malaysia': [{ label: 'Kuala Lumpur', value: 'kuala-lumpur' }],
  'Vietnam': [
    { label: 'Hanoi', value: 'hanoi' },
    { label: 'Ho Chi Minh City', value: 'ho-chi-minh-city' },
  ],
  'Philippines': [{ label: 'Manila', value: 'manila' }],
  'Indonesia': [
    { label: 'Jakarta', value: 'jakarta' },
    { label: 'Bali (Denpasar)', value: 'bali-denpasar' },
  ],

  'Japan': [
    { label: 'Tokyo', value: 'tokyo' },
    { label: 'Osaka', value: 'osaka' },
    { label: 'Kyoto', value: 'kyoto' },
  ],
  'South Korea': [
    { label: 'Seoul', value: 'seoul' },
    { label: 'Busan', value: 'busan' },
  ],
  'Taiwan': [{ label: 'Taipei', value: 'taipei' }],
  'China': [
    { label: 'Hong Kong', value: 'hong-kong' },
    { label: 'Beijing', value: 'beijing' },
    { label: 'Shanghai', value: 'shanghai' },
  ],

  'Australia': [{ label: 'Sydney', value: 'sydney' }],
  'South Africa': [{ label: 'Cape Town', value: 'cape-town' }],
};


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    country: '',
    city: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const cityOptions = formData.country ? COUNTRY_CITIES[formData.country] ?? [] : [];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.contact,
          country: formData.country,
          city: formData.city,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
              >
                ×
              </button>

              {/* Header */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <Image
                  src="/icons/food/dish-3.svg"
                  height={48}
                  width={48}
                  alt="Dish icon"
                />
                <h2 className="text-3xl font-bold text-gray-800">Join the Club</h2>
                <p className="text-gray-600 text-center">
                  Fill details to get 3 month subscription 
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>


                {/* Country */}
<div>
  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
    Country
  </label>
  <select
    id="country"
    required
    value={formData.country}
    onChange={(e) => {
      const newCountry = e.target.value;
      setFormData((prev) => ({
        ...prev,
        country: newCountry,
        city: '', // reset city when country changes
      }));
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
  >
    <option value="">Select a country</option>
    {Object.keys(COUNTRY_CITIES).map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ))}
  </select>
</div>


              {/* City */}
<div>
  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
    City
  </label>
  <select
    id="city"
    required
    disabled={!formData.country}
    value={formData.city}
    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
  >
    <option value="">{formData.country ? 'Select a city' : 'Select a country first'}</option>
    {cityOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
</div>


                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex flex-row justify-center items-center px-8 py-4 gap-3 rounded-[80px] text-white text-xl font-semibold bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Join Now'} {'  ⚡ '}
                 {/* {!isLoading && (
                    <Image
                      src="/icons/food/dish-3.svg"
                      height={24}
                      width={24}
                      alt="Dish icon"
                    />
                  )} */}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
