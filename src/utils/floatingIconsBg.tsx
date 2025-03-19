export const getRandomPosition = () => ({
  x: `${Math.random() * 100}vw`,
  y: `${Math.random() * 100}vh`,
});


export const getRandomMovement = (src: string) => {
  if (src === '/icons/activities/hiker.svg') {
    return {
      x: ['10vw', '60vw'], 
      y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
    };
  }

  return {
    x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
    y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
  };
};

export const getRandomRotation = (): number => Math.random() * 30 - 10; 