'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
}

// Venue data mapped by city
const venues: Record<string, { name: string; address: string }> = {
  boston: { name: 'Sweetgreen', address: '659 Boylston Street, Back Bay' },
  dallas: { name: 'Sweetgreen', address: '3636 McKinney Avenue' },
  'los-angeles': { name: "The Butcher's Daughter", address: '1205 Abbot Kinney Boulevard, Venice' },
  'san-francisco': { name: 'Souvla', address: '511;517;519;525;529 Hayes Street, Western Addition' },
  innsbruck: { name: 'Ludwig (Das Burger Restaurant)', address: '3 Museumstraße, Innenstadt' },
  vienna: { name: 'Karma Food', address: '17 Schottenring, Innere Stadt' },
  basel: { name: 'La Manufacture', address: 'Elisabethenstrasse, Vorstädte' },
  geneva: { name: 'Birdie Food & Coffee', address: '40 Rue des Bains, Jonction' },
  zurich: { name: 'Beetnut', address: '16b Lagerstrasse, Kreis 4' },
  cork: { name: 'Café Paradiso', address: '16 Lancaster Quay' },
  dublin: { name: 'Brother Hubbard', address: '153 Capel Street' },
  edinburgh: { name: 'Hula Juice Bar and Gallery', address: '103,105 West Bow, Old Town' },
  hamburg: { name: 'dean&david', address: '40 Ballindamm, Altstadt' },
  lyon: { name: 'Le Kitchen', address: 'Rue Sébastien Gryphe, 7th Arrondissement' },
  paris: { name: 'Wild & The Moon', address: 'Rue Charlot, 3rd Arrondissement' },
  florence: { name: 'Shake Café', address: 'Via Camillo Cavour, Quartiere 1' },
  milan: { name: "That's Vapore", address: 'Piazza Gae Aulenti, Municipio 9' },
  rome: { name: 'Ginger', address: '43/44 Via Borgognona, Municipio Roma I' },
  barcelona: { name: 'Honest Greens', address: '3 Rambla de Catalunya, Eixample' },
  madrid: { name: 'Honest Greens', address: '89 Paseo de la Castellana, Tetuán' },
  lisbon: { name: 'Honest Greens', address: '52C Rua Rodrigues Sampaio, Santo António' },
};

export default function SuccessModal({ isOpen, onClose, city }: SuccessModalProps) {
  const venue = venues[city.toLowerCase()];

  useEffect(() => {
    if (isOpen) {
      // Confetti burst when modal opens
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#5eead4', '#a78bfa', '#f87171'], // teal, purple, red
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#5eead4', '#a78bfa', '#f87171'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

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

              {/* Success Content */}
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-20 h-20 flex items-center justify-center"
                >
                  <Image
                    src="/icons/food/tropical-drink.svg"
                    height={80}
                    width={80}
                    alt="Celebration"
                  />
                </motion.div>

                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Time to shake!
                  </h2>
                  <p className="text-gray-600">
                    Here are your venue details
                  </p>
                </div>

                {venue ? (
                  <div className="w-full bg-gradient-to-r from-teal-50 via-purple-50 to-red-50 rounded-2xl p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/icons/food/dish-3.svg"
                        height={40}
                        width={40}
                        alt="Venue icon"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {venue.address}
                    </p>
                    <p className="text-gray-500 text-xs mt-2 capitalize">
                      {city.replace('-', ' ')}
                    </p>
                  </div>
                ) : (
                  <div className="w-full bg-gray-50 rounded-2xl p-6 text-center">
                    <p className="text-gray-600">
                      Venue information not available for this city.
                    </p>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-full mt-2 px-8 py-4 rounded-[80px] text-white text-lg font-semibold bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 hover:shadow-lg transition-shadow"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
