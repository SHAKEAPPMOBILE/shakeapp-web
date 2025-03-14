import FloatingIconsBackground from '@/components/FloatingIconsBackground';
import GradientBackground from '@/components/GradientBackground';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative">
      <GradientBackground />
      <FloatingIconsBackground />
      {children}
    </div>
  );
}
