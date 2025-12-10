
import Image from "next/image";
import LogoMimi from "@/Images/Logo/Mimi.png"
import Link from "next/link";

export default function Header() {


  return (
    <header className="flex bg-black text-white justify-between text-2xl items-center px-10 py-8 phone:max-md:p-0 phone:max-md:flex-wrap">

      <Link href="/">
        <h2>Mimidex</h2>
        <Image src={LogoMimi} alt="mimi-logo" />
      </Link>

      <nav className="flex gap-4 text-white font-semibold">
        <Link href={`/`} className="hover:underline">Usuario</Link>
        <Link href={`/`} className="hover:underline">Time</Link>
        <Link href={`/`} className="hover:underline">Regiao</Link>
        <Link href={`/Itens`} className="hover:underline">Itens</Link>
        <Link href={`/`} className="hover:underline">Natures</Link>
      </nav>

    </header>
  );
}