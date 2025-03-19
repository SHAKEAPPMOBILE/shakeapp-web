import MainLinks from '@/app/(home)/components/MainLinks';

export default function Home() {
  return (
    <main 
      className="w-full mx-auto flex flex-col gap-[80px] mt-[80px]">
      <MainLinks />
      <img 
        src="/CoverBlue.png" 
        alt="Cover Blue"
        width="100%"/>
    </main>
  );
}