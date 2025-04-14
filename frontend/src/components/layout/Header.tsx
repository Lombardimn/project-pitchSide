import { HeaderProps } from "@/interfaces/layout.interface";
import Image from "next/image";

export default function Header({ 
  title,
  subtitle,
  image,
  alt,
  className
 }: HeaderProps) {
  return(
    <header className={className}>
      <Image
        src={image || "/images/logo.png"}
        alt={alt || "Logo"}
        width={100}
        height={100}
        priority
        className="rounded-full"
      />
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl font-semibold -mt-2">{subtitle}</p>
    </header>
  )
}