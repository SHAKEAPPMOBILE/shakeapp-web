import Image from "next/image";

export default function Logo({...props}) {
  return <Image src="/Logo.png" height={props.height} width={props.width} alt="Logo" className={props.className}/>;
}
