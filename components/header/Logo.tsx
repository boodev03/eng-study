import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={50}
        height={50}
        className="size-[50px]"
      />
    </Link>
  );
}
