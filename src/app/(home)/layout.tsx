import FloatingIconsBackground from '@/components/FloatingIconsBackground';
import Footer from '@/components/Footer';
import GradientBackground from '@/components/GradientBackground';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col justify-between gap-[50px] relative min-h-screen">
      <FloatingIconsBackground />
      {children}
      <Footer />
    </div>
  );
}
