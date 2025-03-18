import Image from "next/image";

export default function Logo({  height, width }: {height: number, width: number}) {
  return <Image src="/Logo.png" height={height} width={width} alt="Logo" />;
}
