import Image from "next/image";

export default function Logo({  height, width }: {height: number, width: number}) {
  return <Image src="/logo.png" height={height} width={width} alt="Logo" />;
}
