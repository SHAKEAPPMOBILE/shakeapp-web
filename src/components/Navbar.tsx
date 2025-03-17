import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="px-9 py-5 flex">
      <Logo height={32} width={32}/>
    </nav>
  );
}