import FloatingIconsBackground from '@/components/FloatingIconsBackground';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col justify-between gap-[50px] relative min-h-screen">
      <FloatingIconsBackground />
      {children}
    </div>
  );
}
